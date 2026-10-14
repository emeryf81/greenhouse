<?php
declare(strict_types=1);
require __DIR__ . '/bootstrap.php';
boot();
require_post();
logout_user();
redirect('login.php');
