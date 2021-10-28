<script>
    Cookies.withAttributes({path: '/', secure: <?php echo IS_WIN ? 'false' : 'true'; ?>});

    changeLanguage = function (lang) {
        Cookies.set('<?php echo SESSION_COOKIE; ?>_lang', lang, {path: '/'});
        location.reload(true);
    };

    <?php
    $browser_language = isset($_SERVER['BROWSER_LANGUAGE']) && $_SERVER['BROWSER_LANGUAGE'];
    if($browser_language) { ?>
    // browser lang which system detected on this request
    Cookies.set('<?php echo SESSION_COOKIE; ?>_browser_language', '<?php echo $_SERVER['BROWSER_LANGUAGE']; ?>', {path: '/'});
    <?php } ?>
    // website lang which system is using on this request
    Cookies.set('<?php echo SESSION_COOKIE; ?>_lang', '<?php echo CURRENT_LANG; ?>', {path: '/'});
    var Lang = {};
    Lang.nickname_sample = "<?php echo Lang::read('nickname_sample'); ?>";
    Lang.booking_title_sample = "<?php echo Lang::read('booking_title_sample'); ?>";
    Lang.booking_detail_sample = "<?php echo Lang::read('booking_detail_sample'); ?>";
    Lang.invalid_json = "<?php echo Lang::read('invalid_json'); ?>";
    Lang.upload_success = "<?php echo Lang::read('upload_success'); ?>";
    Lang.invalid_file = "<?php echo Lang::read('invalid_file'); ?>";
    Lang.saving = "<?php echo Lang::read('saving'); ?>";
    Lang.saved = "<?php echo Lang::read('saved'); ?>";
    Lang.delete_resource_title = "<?php echo Lang::read('delete_resource_title'); ?>";
    Lang.delete_booking_title = "<?php echo Lang::read('delete_booking_title'); ?>";
    Lang.delete_button = "<?php echo Lang::read('delete_button'); ?>";
    Lang.cancel_button = "<?php echo Lang::read('cancel_button'); ?>";
</script>