<script>
    document.getElementById('vid2').play();

    function in_application() {
        Cookies.set('in_application', '1', {expires: <?php echo system_config('in_app_timeout'); ?> * 1 / 24 / 60, path: '/'});
        location.reload(true);
    }
</script>