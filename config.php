<?php
function system_config($key)
{
    $config = array(
        'static_version' => STATIC_VERSION,
        'in_app_timeout' => IS_WIN ? 1 : 10, // minutes
        // http://www.metamodpro.com/browser-language-codes
        // https://www.w3schools.com/tags/ref_language_codes.asp
        // format: lang, lang => long languages
        'support_lang_display' => array('vi' => 'Tiếng Việt', 'en' => 'English'),
        'support_lang' => array('vi', 'en'), // 'ja', 'ko', 'th', 'cn' => array('zh-cn', 'zh-hans'), 'zh' => array('zh-sg', 'zh-tw', 'zh-hant')
        'default_lang' => 'vi', // CHOSEN when client lang is not supported, LOADED when chosen lang has not the message
        'query_lang' => 'hl', // query human language
    );
    return isset($config[$key]) ? $config[$key] : null;
}