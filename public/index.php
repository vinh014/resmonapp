<?php
// init configuration
define('IS_WIN', 'WIN' === strtoupper(substr(PHP_OS, 0, 3)));
const STATIC_VERSION = '6.26.19'; // linux manually, windows auto

// bootstrapping
include '../bootstrap.php';