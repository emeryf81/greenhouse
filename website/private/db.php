<?php
/**
 * Hortulus web – databaseverbinding (PDO, MariaDB).
 *
 * Gebruik: db() geeft één gedeelde verbinding; tbl('users') geeft de
 * tabelnaam met het voorvoegsel (hortulus_users).
 */

declare(strict_types=1);

require_once __DIR__ . '/settings.php';

function db(): PDO
{
    static $pdo = null;
    if ($pdo instanceof PDO) {
        return $pdo;
    }
    $dsn = sprintf('mysql:host=%s;port=%s;dbname=%s;charset=utf8mb4', DB_HOST, DB_PORT, DB_NAME);
    $pdo = new PDO($dsn, DB_USER, DB_PASS, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
        PDO::ATTR_STRINGIFY_FETCHES => false,
        // PHP 8.4+ names the constant Pdo\Mysql::ATTR_INIT_COMMAND (the old one is deprecated in 8.5)
        (defined('Pdo\Mysql::ATTR_INIT_COMMAND') ? constant('Pdo\Mysql::ATTR_INIT_COMMAND') : constant('PDO::MYSQL_ATTR_INIT_COMMAND')) => "SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci, time_zone = '+00:00'",
    ]);
    return $pdo;
}

/** Table name with the configured prefix; only [a-z_] names are accepted. */
function tbl(string $name): string
{
    if (!preg_match('/^[a-z_]+$/', $name)) {
        throw new InvalidArgumentException('Bad table name');
    }
    return '`' . DB_PREFIX . $name . '`';
}

/** Run a statement with parameters and return it. */
function q(string $sql, array $params = []): PDOStatement
{
    $stmt = db()->prepare($sql);
    $stmt->execute($params);
    return $stmt;
}
