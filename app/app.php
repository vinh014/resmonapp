<!doctype html>
<html lang="en">
<head>
    <?php include '../share/share-ga.php'; ?>
    <link href="favicon.ico" type="image/x-icon" rel="icon"/>
    <link href="favicon.ico" type="image/x-icon" rel="shortcut icon"/>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?php echo Lang::read('resmonapp'); ?></title>
    <link rel="stylesheet" href="lib/reset.css">
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
    <link rel="stylesheet" href="app/css/style.css?<?php echo system_config('static_version'); ?>">
    <?php include '../share/share-css.php'; ?>
</head>
<body class="app-page">
<div class="info-container disable-select">
    <div class="sub-info-container">
        <span class="notify-detail"></span>
        <div class="separator">&nbsp;</div>
        <div class="status-container">
            <div class="status-item status-0"><span class='ui-icon ui-icon-play'></span><?php echo Lang::read('status_new'); ?></div>
            <div class="status-item status-1"><span class='ui-icon ui-icon-play'></span><?php echo Lang::read('status_doing'); ?></div>
            <div class="status-item status-2"><span class='ui-icon ui-icon-play'></span><?php echo Lang::read('status_testing'); ?></div>
            <div class="status-item status-3"><span class='ui-icon ui-icon-play'></span><?php echo Lang::read('status_done'); ?></div>
        </div>
        <div class="separator">&nbsp;</div>
        <div class="priority-container">
            <div class="priority-item priority-0"><span class='ui-icon ui-icon-lightbulb'></span><?php echo Lang::read('priority_normal'); ?></div>
            <div class="priority-item priority-1"><span class='ui-icon ui-icon-lightbulb'></span><?php echo Lang::read('priority_high'); ?></div>
        </div>
        <div class="separator">&nbsp;</div>
        <span class='ui-icon ui-icon-minusthick ui-cursor' title="<?php echo Lang::read('collapse_all'); ?>"></span>
        <div class="separator">&nbsp;</div>
        <span class='none-icon add-resource-action ui-cursor' title="<?php echo Lang::read('add_resource'); ?>"><?php echo Lang::read('add_resource'); ?></span>
        <div class="separator">&nbsp;</div>
        <span class='none-icon download-action ui-cursor' title="<?php echo Lang::read('export'); ?>"><?php echo Lang::read('export'); ?></span>
        <span class='none-icon upload-action ui-cursor' title="<?php echo Lang::read('import'); ?>"><?php echo Lang::read('import'); ?></span>
        <input type="file" accept=".json,.txt" style="display: none">
        <div class="separator">&nbsp;</div>
        <?php include '../share/share-lang.php'; ?>
    </div>
</div>
<div class="main-container">
    <div class="sub-container">
        <!-- resource and booking infos -->
    </div>
</div>
<div class="center-container">
    <button class="ui-button ui-widget ui-corner-all add-resource-action" style="display: none"><?php echo Lang::read('add_resource'); ?></button>
</div>
<?php include 'app-dialog.php'; ?>
<noscript id="booking-sample" style="display: none">
    <?php
    $_bookingStatus = '{bookingStatus}';
    $_bookingPriority = '{bookingPriority}';
    $_bookingTitle = '{bookingTitle}';
    $_bookingDetail = '{bookingDetail}';
    include 'app-booking.php';
    ?>
</noscript>
<noscript id="resource-sample" style="display: none">
    <?php
    $_nickname = '{nickname}';
    include 'app-resource.php';
    ?>
</noscript>
<div class="footer-info">
    <hr>
    <?php echo Lang::read('copyright'); ?> © 2021
    <a href="https://www.facebook.com/canhchimvandam" target="_blank">Nguyễn Văn Vinh</a>
    <a href="mailto:huygdv19@gmail.com" target="_blank">Đặng Văn Huy</a>
    <a href="https://noithatbibo.com" target="_blank" class="bibo-info">Nội Thất BIBO</a>
</div>
<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
<script src="lib/BindController.js"></script>
<script src="lib/js.cookie.min.js"></script>
<?php include '../share/share-js.php'; ?>
<?php include 'app-js.php'; ?>
<script src="app/js/script.js?<?php echo system_config('static_version'); ?>"></script>
<script src="app/js/scriptReady.js?<?php echo system_config('static_version'); ?>"></script>
</body>
</html>