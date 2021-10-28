<script>
    function in_application() {
        Cookies.set('in_application', '1', {expires: <?php echo system_config('in_app_timeout'); ?> * 1 / 24 / 60, path: '/'});
    }
    in_application();
    setInterval(function () {
        in_application();
    }, 1000 * 58); // 58 seconds
</script>