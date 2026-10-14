<?php
/**
 * Hortulus web – mail (plain text, UTF-8): through SMTP when mail-settings.php names a
 * server (STARTTLS on 587 or SSL on 465, AUTH LOGIN), otherwise through PHP mail().
 *
 * Every attempt lands in Beheer → Verstuurde mails; a failure also lands in
 * Beheer → Logboek with the reason and the conversation with the mail server
 * (the password is never written down).
 */

declare(strict_types=1);

require_once __DIR__ . '/core.php';

/**
 * The sender is always the mailbox the SMTP server signs in with (emery@emery.be): one.com
 * refuses any other From ("not owned by user"). Replies still go to hortulus@emery.be.
 */
const HORTULUS_MAIL_FROM = 'emery@emery.be';

function mail_from(): string
{
    return HORTULUS_MAIL_FROM;
}

function mail_from_name(): string
{
    return defined('SMTP_FROM_NAME') && SMTP_FROM_NAME !== '' ? SMTP_FROM_NAME : MAIL_FROM_NAME;
}

/** Replies go here (default the admin address): SMTP_REPLY_TO in mail-settings.php overrides it. */
function mail_reply_to(): string
{
    return defined('SMTP_REPLY_TO') && SMTP_REPLY_TO !== '' ? SMTP_REPLY_TO : ADMIN_EMAIL;
}

/** The label of the button for a link in a mail, by where the link goes. */
function mail_button_label(string $link): string
{
    $labels = [
        'nl' => ['verify.php' => 'E-mailadres bevestigen', 'reset.php' => 'Nieuw wachtwoord kiezen', 'activate.php' => 'Account activeren', 'login.php' => 'Aanmelden bij Hortulus', '/admin/' => 'Naar Beheer', 'view.php' => 'Tuin bekijken', '' => 'Openen in Hortulus'],
        'fr' => ['verify.php' => 'Confirmer mon adresse', 'reset.php' => 'Choisir un nouveau mot de passe', 'activate.php' => 'Activer le compte', 'login.php' => 'Se connecter à Hortulus', '/admin/' => 'Vers la gestion', 'view.php' => 'Voir le jardin', '' => 'Ouvrir dans Hortulus'],
        'en' => ['verify.php' => 'Confirm my e-mail address', 'reset.php' => 'Choose a new password', 'activate.php' => 'Activate the account', 'login.php' => 'Sign in to Hortulus', '/admin/' => 'Go to Admin', 'view.php' => 'View the garden', '' => 'Open in Hortulus'],
    ];
    $set = $labels[function_exists('lang') ? lang() : 'nl'] ?? $labels['nl'];
    foreach ($set as $needle => $label) {
        if ($needle !== '' && str_contains($link, $needle)) {
            return $label;
        }
    }
    return $set[''];
}

/**
 * The mail as HTML in the look of the website: the green band with the name, a white
 * card, links on a line of their own become buttons.  The plain text stays the
 * source (and the text/plain part of the mail).
 */
function mail_html(string $subject, string $text): string
{
    $green = '#2f6b4f';
    $paragraphs = preg_split('/\n{2,}/', trim(str_replace(["\r\n", "\r"], "\n", $text))) ?: [];
    $html = '';
    foreach ($paragraphs as $para) {
        $lines = explode("\n", $para);
        $out = [];
        foreach ($lines as $line) {
            $line = trim($line);
            if (preg_match('~^https?://\S+$~', $line)) {
                $url = htmlspecialchars($line, ENT_QUOTES);
                $out[] = '</p><table role="presentation" cellspacing="0" cellpadding="0" style="margin:18px 0"><tr><td style="border-radius:10px;background:' . $green . '">'
                    . '<a href="' . $url . '" style="display:inline-block;padding:12px 22px;color:#ffffff;text-decoration:none;font-weight:600;font-size:16px;border-radius:10px">'
                    . htmlspecialchars(mail_button_label($line)) . '</a></td></tr></table>'
                    . '<p style="margin:0 0 14px;font-size:12px;color:#66756d;word-break:break-all">' . $url . '</p><p style="margin:0 0 14px">';
                continue;
            }
            $esc = htmlspecialchars($line);
            $esc = preg_replace('~(https?://[^\s<]+)~', '<a href="$1" style="color:#3f8a66">$1</a>', $esc) ?? $esc;
            $out[] = $esc;
        }
        $html .= '<p style="margin:0 0 14px">' . implode('<br>', $out) . '</p>';
    }
    $html = str_replace('<p style="margin:0 0 14px"></p>', '', $html);
    $site = defined('APP_URL') ? APP_URL : '';
    $tagline = htmlspecialchars(mail_from_name());
    return '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>' . htmlspecialchars($subject) . '</title></head>'
        . '<body style="margin:0;padding:0;background:#f6f4ee">'
        . '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f6f4ee"><tr><td align="center" style="padding:24px 12px">'
        . '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px">'
        . '<tr><td style="background:' . $green . ';background:linear-gradient(135deg,#3f8a66,' . $green . ');border-radius:16px 16px 0 0;padding:20px 26px">'
        . '<div style="font:700 22px/1.2 system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#ffffff">&#127793; Hortulus</div>'
        . '<div style="font:13px/1.4 system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#d7ebdf;margin-top:4px">' . $tagline . '</div></td></tr>'
        . '<tr><td style="background:#ffffff;border:1px solid #dfe6e1;border-top:0;border-radius:0 0 16px 16px;padding:26px;font:15px/1.6 system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#1d2a24">'
        . '<h1 style="font-size:19px;line-height:1.3;margin:0 0 16px;color:#1d2a24">' . htmlspecialchars($subject) . '</h1>' . $html . '</td></tr>'
        . '<tr><td style="padding:14px 8px;text-align:center;font:12px/1.5 system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#66756d">'
        . ($site !== '' ? '<a href="' . htmlspecialchars($site) . '" style="color:#3f8a66;text-decoration:none">' . htmlspecialchars(preg_replace('~^https?://~', '', $site) ?? $site) . '</a> · ' : '')
        . 'Hortulus – moestuin en serre</td></tr>'
        . '</table></td></tr></table></body></html>';
}

/** How mail leaves this site, for Beheer. */
function mail_route(): string
{
    return defined('SMTP_HOST') && SMTP_HOST !== ''
        ? 'SMTP ' . SMTP_HOST . ':' . (defined('SMTP_PORT') ? (int) SMTP_PORT : 587) . ' (' . (defined('SMTP_SECURE') ? SMTP_SECURE : 'tls') . ')'
            . (defined('SMTP_USER') && SMTP_USER !== '' ? ' als ' . SMTP_USER : '')
        : 'PHP mail()';
}

/**
 * Send one mail.  $result (optional) receives ['ok' => bool, 'error' => ?string, 'log' => string]
 * so Beheer can show a test mail's outcome at once.
 */
function send_mail(string $to, string $subject, string $body, ?string $replyTo = null, ?array &$result = null): bool
{
    $result = ['ok' => false, 'error' => null, 'log' => ''];
    if (!filter_var($to, FILTER_VALIDATE_EMAIL)) {
        $result['error'] = 'ongeldig adres: ' . $to;
        app_log('mail', 'error', 'Mail niet verstuurd: ' . $result['error']);
        return false;
    }
    // No header injection: one line only.
    $subject = trim(preg_replace('/[\r\n]+/', ' ', $subject) ?? '');
    $fromName = '=?UTF-8?B?' . base64_encode(mail_from_name()) . '?=';
    $boundary = 'hortulus-' . bin2hex(random_bytes(8));
    $headers = [
        'From: ' . $fromName . ' <' . mail_from() . '>',
        'MIME-Version: 1.0',
        'Content-Type: multipart/alternative; boundary="' . $boundary . '"',
        'X-Mailer: Hortulus',
        'Auto-Submitted: auto-generated',
    ];
    $reply = $replyTo !== null && filter_var($replyTo, FILTER_VALIDATE_EMAIL) ? $replyTo : mail_reply_to();
    if (filter_var($reply, FILTER_VALIDATE_EMAIL)) {
        $headers[] = 'Reply-To: ' . $reply;
    }
    // text/plain for old clients, text/html in the look of the site (quoted-printable keeps lines short)
    $body = "This is a multi-part message in MIME format.\n\n"
        . "--$boundary\nContent-Type: text/plain; charset=UTF-8\nContent-Transfer-Encoding: quoted-printable\n\n"
        . str_replace("\r\n", "\n", quoted_printable_encode(str_replace("\n", "\r\n", $body))) . "\n\n"
        . "--$boundary\nContent-Type: text/html; charset=UTF-8\nContent-Transfer-Encoding: quoted-printable\n\n"
        . str_replace("\r\n", "\n", quoted_printable_encode(mail_html($subject, $body))) . "\n\n"
        . "--$boundary--\n";
    $encoded = '=?UTF-8?B?' . base64_encode($subject) . '?=';
    $ok = false;
    $error = null;
    $log = '';
    try {
        if (defined('SMTP_HOST') && SMTP_HOST !== '') {
            [$ok, $error, $log] = smtp_send($to, $encoded, $body, $headers);
            if (!$ok && defined('SMTP_FALLBACK_MAIL') && SMTP_FALLBACK_MAIL) {
                [$fallbackOk, $fallbackError] = php_mail($to, $encoded, $body, $headers);
                $log .= "\n--- terugval op PHP mail(): " . ($fallbackOk ? 'aanvaard door de server' : $fallbackError) . "\n";
                if ($fallbackOk) {
                    $ok = true;
                    app_log('mail', 'warn', "SMTP mislukt ($error), via PHP mail() toch verstuurd naar $to", $log);
                    $error = null;
                }
            }
        } else {
            [$ok, $error] = php_mail($to, $encoded, $body, $headers);
            $log = 'PHP mail() ' . ($ok ? 'aanvaard' : 'geweigerd') . ($error ? ": $error" : '');
        }
    } catch (Throwable $err) {
        $error = 'interne fout: ' . $err->getMessage();
    }
    if (!$ok) {
        app_log('mail', 'error', "Mail naar $to mislukt: $error", "Onderwerp: $subject\nRoute: " . mail_route() . "\nAfzender: " . mail_from() . "\n\n$log");
    }
    try {
        q('INSERT INTO ' . tbl('mail_log') . ' (to_addr, subject, ok, error, detail, created_at) VALUES (?, ?, ?, ?, ?, ?)',
            [$to, mb_substr($subject, 0, 190), $ok ? 1 : 0, $error === null ? null : mb_substr($error, 0, 500), $log ?: null, now_utc()]);
    } catch (Throwable) {
        try { // a database from before the error columns
            q('INSERT INTO ' . tbl('mail_log') . ' (to_addr, subject, ok, created_at) VALUES (?, ?, ?, ?)', [$to, mb_substr($subject, 0, 190), $ok ? 1 : 0, now_utc()]);
        } catch (Throwable) {
        }
    }
    $result = ['ok' => $ok, 'error' => $error, 'log' => $log];
    return $ok;
}

/** @return array{0: bool, 1: ?string} */
function php_mail(string $to, string $encodedSubject, string $body, array $headers): array
{
    if (!function_exists('mail')) {
        return [false, 'PHP mail() is uitgeschakeld op deze server'];
    }
    error_clear_last();
    $ok = @mail($to, $encodedSubject, str_replace("\n", "\r\n", $body), implode("\r\n", $headers), '-f' . mail_from());
    $last = error_get_last();
    return [$ok, $ok ? null : ($last['message'] ?? 'PHP mail() gaf false terug (geen sendmail of geweigerd door de host)')];
}

/** Mail to the admin address: someone confirmed their e-mail and waits for activation. */
function mail_admin_new_user(array $user, string $activateLink): bool
{
    $body = "Nieuwe accountaanvraag voor Hortulus\n\n"
        . "Naam: {$user['name']}\nE-mail: {$user['email']}\nTaal: {$user['lang']}\nAangevraagd: {$user['created_at']} (UTC)\n\n"
        . "Activeren (je meldt je eerst aan als beheerder):\n$activateLink\n\n"
        . "Alle aanvragen: " . APP_URL . "/admin/\n";
    return send_mail(ADMIN_EMAIL, 'Hortulus: nieuwe aanvraag van ' . $user['name'], $body);
}

/** A plain-language reason for an SMTP reply, so the log says what to fix. */
function smtp_hint(int $code, string $reply, string $stage): string
{
    $r = strtolower($reply);
    if ($stage === 'auth' || $code === 535 || $code === 534) {
        return 'aanmelden bij de mailserver geweigerd: controleer SMTP_USER en SMTP_PASS in private/mail-settings.php';
    }
    if ($stage === 'from' || str_contains($r, 'sender') || str_contains($r, 'not owned') || str_contains($r, 'not allowed')) {
        return 'afzender geweigerd: ' . mail_from() . ' moet het aangemelde mailadres zijn of er een alias van (SMTP_FROM)';
    }
    if ($stage === 'rcpt') {
        return 'ontvanger geweigerd door de mailserver';
    }
    if ($stage === 'data' && ($code === 550 || $code === 554)) {
        return 'bericht geweigerd (spamfilter of verzendlimiet)';
    }
    if ($code === 421 || $code === 450 || $code === 451 || $code === 452) {
        return 'mailserver tijdelijk niet beschikbaar of limiet bereikt, later opnieuw';
    }
    return 'mailserver antwoordde ' . $code;
}

/**
 * A minimal SMTP client: EHLO, STARTTLS (port 587) or implicit TLS (465), AUTH LOGIN,
 * one message.
 *
 * @return array{0: bool, 1: ?string, 2: string} ok, reason, transcript (no password)
 */
function smtp_send(string $to, string $encodedSubject, string $body, array $headers): array
{
    $port = defined('SMTP_PORT') ? (int) SMTP_PORT : 587;
    $secure = defined('SMTP_SECURE') ? SMTP_SECURE : ($port === 465 ? 'ssl' : 'tls');
    $host = ($secure === 'ssl' ? 'ssl://' : 'tcp://') . SMTP_HOST . ':' . $port;
    $log = 'Verbinden met ' . $host . "\n";
    $ctx = stream_context_create(['ssl' => ['peer_name' => SMTP_HOST, 'verify_peer' => true, 'verify_peer_name' => true]]);
    $fp = @stream_socket_client($host, $errno, $errstr, 15, STREAM_CLIENT_CONNECT, $ctx);
    if (!$fp) {
        $why = $errstr ?: 'geen verbinding';
        $hint = str_contains(strtolower($why), 'getaddrinfo') || str_contains(strtolower($why), 'name')
            ? 'servernaam onbekend (SMTP_HOST)'
            : 'geen verbinding met de mailserver (poort ' . $port . ' geblokkeerd door de host, of verkeerde poort)';
        return [false, "$hint: $why ($errno)", $log . "!! $why ($errno)\n"];
    }
    stream_set_timeout($fp, 20);
    $read = static function () use ($fp, &$log): array {
        $text = '';
        while (($line = fgets($fp, 1024)) !== false) {
            $text .= $line;
            if (strlen($line) < 4 || $line[3] === ' ') {
                break;
            }
        }
        if ($text === '') {
            $meta = stream_get_meta_data($fp);
            $log .= '<< (geen antwoord' . (!empty($meta['timed_out']) ? ': time-out' : '') . ")\n";
            return [0, ''];
        }
        $log .= preg_replace('/^/m', '<< ', rtrim($text)) . "\n";
        return [(int) substr($text, 0, 3), $text];
    };
    $fail = null;
    $cmd = static function (string $line, array $expect, string $stage, ?string $shown = null) use ($fp, $read, &$log, &$fail): bool {
        fwrite($fp, $line . "\r\n");
        $log .= '>> ' . ($shown ?? $line) . "\n";
        [$code, $text] = $read();
        if (!in_array($code, $expect, true)) {
            $fail = smtp_hint($code, $text, $stage) . ' — ' . trim(preg_replace('/\s+/', ' ', $text) ?: 'geen antwoord');
            return false;
        }
        return true;
    };
    $helo = parse_url(defined('APP_URL') ? APP_URL : '', PHP_URL_HOST) ?: 'localhost';
    try {
        [$code, $greeting] = $read();
        if ($code !== 220) {
            return [false, 'mailserver groet niet zoals verwacht: ' . trim($greeting ?: 'geen antwoord'), $log];
        }
        if (!$cmd("EHLO $helo", [250], 'ehlo')) {
            return [false, $fail, $log];
        }
        if ($secure === 'tls') {
            if (!$cmd('STARTTLS', [220], 'tls')) {
                return [false, $fail, $log];
            }
            $method = STREAM_CRYPTO_METHOD_TLS_CLIENT;
            if (defined('STREAM_CRYPTO_METHOD_TLSv1_2_CLIENT')) {
                $method |= STREAM_CRYPTO_METHOD_TLSv1_2_CLIENT;
            }
            if (defined('STREAM_CRYPTO_METHOD_TLSv1_3_CLIENT')) {
                $method |= STREAM_CRYPTO_METHOD_TLSv1_3_CLIENT;
            }
            error_clear_last();
            if (!@stream_socket_enable_crypto($fp, true, $method)) {
                $why = error_get_last()['message'] ?? 'onbekend';
                $log .= "!! TLS: $why\n";
                return [false, 'beveiligde verbinding (TLS) mislukt: ' . $why, $log];
            }
            $log .= "-- TLS actief\n";
            if (!$cmd("EHLO $helo", [250], 'ehlo')) {
                return [false, $fail, $log];
            }
        }
        if (defined('SMTP_USER') && SMTP_USER !== '') {
            if (!$cmd('AUTH LOGIN', [334], 'auth')
                || !$cmd(base64_encode(SMTP_USER), [334], 'auth', '(gebruikersnaam ' . SMTP_USER . ')')
                || !$cmd(base64_encode((string) SMTP_PASS), [235], 'auth', '(wachtwoord verborgen)')) {
                return [false, $fail, $log];
            }
        }
        if (!$cmd('MAIL FROM:<' . mail_from() . '>', [250], 'from') || !$cmd("RCPT TO:<$to>", [250, 251], 'rcpt') || !$cmd('DATA', [354], 'data')) {
            return [false, $fail, $log];
        }
        $domain = substr(strrchr(mail_from(), '@') ?: '@localhost', 1);
        $head = array_merge($headers, [
            "To: <$to>",
            "Subject: $encodedSubject",
            'Date: ' . date(DATE_RFC2822),
            'Message-ID: <' . bin2hex(random_bytes(12)) . "@$domain>",
        ]);
        $text = str_replace(["\r\n", "\r"], "\n", $body);
        $text = preg_replace('/^\./m', '..', $text) ?? $text; // dot-stuffing
        $data = implode("\r\n", $head) . "\r\n\r\n" . str_replace("\n", "\r\n", $text) . "\r\n.";
        if (!$cmd($data, [250], 'data', '(bericht, ' . strlen($data) . ' bytes)')) {
            return [false, $fail, $log];
        }
        $cmd('QUIT', [221], 'quit');
        return [true, null, $log];
    } finally {
        fclose($fp);
    }
}
