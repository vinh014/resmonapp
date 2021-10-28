<?php if (IS_WIN) return; ?>
<?php if ($_SERVER['SERVER_NAME'] != 'resmonapp.com') return;; ?>

<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-111682782-3"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'UA-111682782-3');
</script>