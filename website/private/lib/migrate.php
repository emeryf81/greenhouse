<?php
/**
 * Hortulus web – database updates without reinstalling.
 *
 * A new version that needs a change in the database adds a numbered step to
 * migrations() and raises SCHEMA_VERSION.  The first page visit after the
 * upload applies the missing steps once (under a database lock) and records
 * the new version in hortulus_settings.  Accounts, gardens, photos and PDFs
 * stay where they are: steps only add tables, columns or indexes.
 *
 * The garden documents themselves (the plan, the journal ...) are upgraded by
 * the garden app when it loads them, as in Home Assistant.
 */

declare(strict_types=1);

const SCHEMA_VERSION = 4;

/** @return array<int, list<string>> version => SQL statements ({P} = table prefix) */
function migrations(): array
{
    return [
        // 1: the tables of install.php (private/sql/schema.sql)
        2 => [
            // sessions in the database (shared hosting removes session files after ~24 minutes)
            'CREATE TABLE IF NOT EXISTS {P}sessions (
               id CHAR(64) NOT NULL PRIMARY KEY,
               data MEDIUMBLOB NOT NULL,
               expires_at INT UNSIGNED NOT NULL,
               KEY ix_expires (expires_at)
             ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci',
        ],
        3 => [
            // the log in Beheer → Logboek: mail, PHP errors, Home Assistant, database
            'CREATE TABLE IF NOT EXISTS {P}log (
               id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
               created_at DATETIME NOT NULL,
               level VARCHAR(8) NOT NULL,
               channel VARCHAR(16) NOT NULL,
               message VARCHAR(500) NOT NULL,
               detail MEDIUMTEXT NULL,
               user_id BIGINT UNSIGNED NULL,
               ip VARCHAR(45) NULL,
               KEY ix_created (created_at),
               KEY ix_channel (channel, level)
             ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci',
            // why a mail failed, and what the mail server said
            'ALTER TABLE {P}mail_log ADD COLUMN error VARCHAR(500) NULL',
            'ALTER TABLE {P}mail_log ADD COLUMN detail MEDIUMTEXT NULL',
        ],
        4 => [
            // showing a garden to others (link, public, administrator) and its icon
            "ALTER TABLE {P}gardens ADD COLUMN share_mode VARCHAR(8) NOT NULL DEFAULT 'off'",
            'ALTER TABLE {P}gardens ADD COLUMN share_token CHAR(32) NULL',
            'ALTER TABLE {P}gardens ADD COLUMN share_sections VARCHAR(255) NULL',
            'ALTER TABLE {P}gardens ADD COLUMN share_admin TINYINT(1) NOT NULL DEFAULT 0',
            'ALTER TABLE {P}gardens ADD COLUMN share_icon VARCHAR(16) NULL',
            'ALTER TABLE {P}gardens ADD COLUMN share_note VARCHAR(280) NULL',
            'ALTER TABLE {P}gardens ADD COLUMN shared_at DATETIME NULL',
            'ALTER TABLE {P}gardens ADD UNIQUE KEY ux_share_token (share_token)',
            'ALTER TABLE {P}gardens ADD KEY ix_share_mode (share_mode, updated_at)',
            // the request a log line belongs to (the error code a user sees)
            'ALTER TABLE {P}log ADD COLUMN req VARCHAR(16) NULL',
            'ALTER TABLE {P}log ADD KEY ix_req (req)',
        ],
    ];
}

/** Apply the steps this database is missing.  Cheap when up to date: one small query. */
function ensure_schema(): void
{
    static $checked = false;
    if ($checked) {
        return;
    }
    $checked = true;
    try {
        $current = (int) (q('SELECT value FROM ' . tbl('settings') . ' WHERE name = ?', ['schema_version'])->fetchColumn() ?: 0);
    } catch (PDOException) {
        return; // not installed yet: install.php creates everything
    }
    if ($current === 0 || $current >= SCHEMA_VERSION) {
        return;
    }
    $lock = DB_PREFIX . 'schema';
    if ((int) q('SELECT GET_LOCK(?, 15)', [$lock])->fetchColumn() !== 1) {
        return; // another request is updating; this one carries on with the old version
    }
    try {
        $current = (int) (q('SELECT value FROM ' . tbl('settings') . ' WHERE name = ?', ['schema_version'])->fetchColumn() ?: 0);
        foreach (migrations() as $version => $statements) {
            if ($version <= $current) {
                continue;
            }
            foreach ($statements as $sql) {
                try {
                    db()->exec(str_replace('{P}', DB_PREFIX, $sql));
                } catch (PDOException $err) {
                    // a column or index that is already there (1060/1061) is fine
                    if (!in_array((int) ($err->errorInfo[1] ?? 0), [1060, 1061], true)) {
                        throw $err;
                    }
                }
            }
            set_setting('schema_version', (string) $version);
            error_log('[hortulus] database updated to schema ' . $version);
        }
    } finally {
        q('SELECT RELEASE_LOCK(?)', [$lock]);
    }
}
