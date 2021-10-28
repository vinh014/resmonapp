<?php
// for set cookie and load lang files
function detectLang($sessionCookie)
{
    // http://www.metamodpro.com/browser-language-codes
    // https://www.w3schools.com/tags/ref_language_codes.asp
    $supportLangs = array();
    $long2lang = array();
    foreach (system_config('support_lang') as $key => $value) {
        if (is_numeric($key)) {
            $supportLangs[] = $value; // value is lang
        } else {
            $supportLangs[] = $key; // key is lang
            foreach ((array)$value as $long) {
                $long2lang[$long] = $key;
            }
        }
    }
    // CHOSEN when client lang is not supported
    $defaultLang = system_config('default_lang');

    // browser lang on this request
    $isLong = '-' == substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 2, 1);
    $_SERVER['BROWSER_LANGUAGE'] = $isLong ? substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 5) : substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2);
    $_SERVER['BROWSER_LANGUAGE'] = strtolower($_SERVER['BROWSER_LANGUAGE']);
    // short version
    $browserLang = substr($_SERVER['BROWSER_LANGUAGE'], 0, 2);
    // if it's long language
    if (2 < strlen($_SERVER['BROWSER_LANGUAGE'])) {
        preg_match('/^([a-zA-Z]+(-[a-zA-Z]+))/', $_SERVER['BROWSER_LANGUAGE'], $matches);
        if (isset($matches[0]) && isset($long2lang[$matches[0]])) {
            $browserLang = $long2lang[$matches[0]];
        }
    }

    $change = false;
    if (isset($_COOKIE[$sessionCookie . '_browser_language'])) {
        // browser lang on last request vs this request
        $change = $_COOKIE[$sessionCookie . '_browser_language'] != $_SERVER['BROWSER_LANGUAGE'];
    }
    switch (true) {
        // browser language is just set by query param
        case !empty($_GET[system_config('query_lang')]):
            $humanLang = trim($_GET[system_config('query_lang')]);
            $lang = in_array($humanLang, $supportLangs) ? $humanLang : $defaultLang;
            break;
        // browser language is just changed on mobile device or browser on this request
        case $change:
            $lang = in_array($browserLang, $supportLangs) ? $browserLang : $defaultLang;
            break;
        // user choose other language. Use javascript function: changeLanguage
        case isset($_COOKIE[$sessionCookie . '_lang']):
            $lang = in_array($_COOKIE[$sessionCookie . '_lang'], $supportLangs) ? $_COOKIE[$sessionCookie . '_lang'] : $defaultLang;
            break;
        // use browser language if accepted
        case in_array($browserLang, $supportLangs):
            $lang = $browserLang;
            break;
        // use default language
        default:
            $lang = $defaultLang;
            break;
    }
    return $lang;
}