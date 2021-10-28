<?php

class Lang
{
    private static $_data = null;

    public static function read($key)
    {
        if (!static::$_data) {
            static::_loadData();
        }

        if (!isset(static::$_data[$key])) {
            return $key;
        }
        return static::$_data[$key];
    }

    protected static function _loadData()
    {
        // load active messages
        $active = array();
        $path = dirname(__FILE__) . '/lang/' . CURRENT_LANG . '.php';
        if (file_exists($path)) {
            $active = require $path;
        }
        static::$_data = (array)$active;
    }
}