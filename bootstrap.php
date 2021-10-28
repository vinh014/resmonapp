<?php
// constant
const SESSION_COOKIE = 'resmonapp'; // same to session name

include 'config.php';
include 'helper.php';

// detect language
define('CURRENT_LANG', detectLang(SESSION_COOKIE));

// load language files
include 'lang.php';

// load handler base on app type
if (!isset($_COOKIE['in_application'])) {
    include 'home/home.php';
    return;
}
include 'app/app.php';