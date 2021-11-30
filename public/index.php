<?php
// init configuration
define('IS_WIN', 'WIN' === strtoupper(substr(PHP_OS, 0, 3)));
// linux manually, windows auto
define('STATIC_VERSION', IS_WIN ? date('Y-m-d H:i:s') : file_get_contents(dirname(__FILE__) . '/static_version'));

// bootstrapping
include '../bootstrap.php';