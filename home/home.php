<!DOCTYPE html>
<html lang="en-US" style="" class=" js flexbox flexboxlegacy canvas canvastext webgl no-touch geolocation postmessage websqldatabase indexeddb hashchange history draganddrop websockets rgba hsla multiplebgs backgroundsize borderimage borderradius boxshadow textshadow opacity cssanimations csscolumns cssgradients cssreflections csstransforms csstransforms3d csstransitions fontface generatedcontent video audio localstorage sessionstorage webworkers no-applicationcache svg inlinesvg smil svgclippaths">
<head>
<?php include '../share/share-ga.php'; ?>
<link href="favicon.ico" type="image/x-icon" rel="icon"/>
<link href="favicon.ico" type="image/x-icon" rel="shortcut icon"/>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title><?php echo Lang::read('resmonapp'); ?></title>
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="home/styles/main.css?<?php echo system_config('static_version'); ?>">
<?php include '../share/share-css.php'; ?>
</head>
<body class="home-page light-header animsition" style="animation-duration: 1500ms; opacity: 1;">
<!-- ========== HEADER ========== -->
<header class="header main-header header-style-2"> 

<!-- Slider main container -->
<div class="swiper-container"> 
<!-- Additional required wrapper -->
<div class="swiper-wrapper" id="swiper"> 
<!-- Slides -->
<div class="swiper-slide" data-autoplay="false" data-slide-img="home/images/office1.jpg" style="background-image: url(home/images/office1.jpg);">
<div class="slide-text">
<div class="outer">
<div class="inner">
<h1 class="white-color">Resource Monitor Application</h1>  
<a href="javascript:void(0)" target="_blank" class="btn se-btn-ers-blue btn-rounded " onclick="in_application()"><?php echo Lang::read('start_button'); ?></a>
<div class="videoplyaWrarp"> <img src="home/images/macbook.png" draggable="false" alt="Mac" class="img-responsive">
<div class="video-background"></div>
<video id="vid2" muted="" loop="" autoplay="" type="video/mp4">
<source src="home/videos/intro.mp4?1.2" type="video/mp4">
</video>

</div>
<div class="videoPlayer11">
</div>
</div>
<!-- end inner --> 
</div>
<!-- end outer --> 
</div>
<!-- end slide-text --> 
</div>
<!-- end swiper-slide --> 

<!-- swiper pagination -->
<div class="swiper-pagination"></div>
<!-- swiper navigation buttons -->
<div class="swiper-button-prev"></div>
<div class="swiper-button-next"></div>
</div>
<!-- div enclosed --> 
</div>
<!-- end swiper-container --> 
</header>
<!-- ========== FEATURES ========== -->
<section class="se-section features-section">
<div class="container">
<div class="row">
<div class="col-md-3 col-sm-6 se-feature"> <i class="icon ion-ios-analytics-outline"></i>
<h5><?php echo Lang::read('visual_view'); ?></h5>
<p style="text-align:justify"> <?php echo Lang::read('visual_detail'); ?></p>
</div>
<!-- end se-feature -->

<div class="col-md-3 col-sm-6 se-feature"> <i class="icon ion-ios-paper-outline"></i>
<h5><?php echo Lang::read('reality_experience'); ?></h5>
<p style="text-align:justify"><?php echo Lang::read('reality_detail'); ?></p>
</div>
<!-- end se-feature -->

<div class="col-md-3 col-sm-6 se-feature"> <i class="icon ion-ios-lightbulb-outline"></i>
<h5><?php echo Lang::read('extreme_security'); ?></h5>
<p style="text-align:justify"><?php echo Lang::read('security_detail'); ?></p>
</div>
<!-- end se-feature -->

<div class="col-md-3 col-sm-6 se-feature"> <i class="icon ion-ios-speedometer-outline"></i>
<h5><?php echo Lang::read('cost_free'); ?></h5>
<p style="text-align:justify"><?php echo Lang::read('free_detail'); ?></p>
</div>
<!-- end se-feature --> 

</div>
<!-- end row --> 
</div>
<!-- end container --> 
</section>

<footer class="light-footer">

<div class="container-fluid">
<div class="row footer-bottom">
<div class="col-md-6 text-center copyright">
<?php echo Lang::read('copyright'); ?> © 2021 
<a href="https://www.facebook.com/canhchimvandam" target="_blank">Nguyễn Văn Vinh</a>
<a href="mailto:huygdv19@gmail.com" target="_blank">Đặng Văn Huy</a>
<a href="https://noithatbibo.com" target="_blank">Nội Thất BIBO</a>
</div>
<div class="col-md-2"></div>
<div class="col-md-4 text-center extra-info">
<a target="_blank" href="https://www.facebook.com/resmonapp">Facebook</a>
<a target="_blank" href="https://www.youtube.com/c/resmonapp">Youtube</a>
<?php include '../share/share-lang.php'; ?>
</div>
</div> <!-- end footer-bottom -->
</div>
</footer>
<script src="lib/js.cookie.min.js"></script>
<?php include '../share/share-js.php'; ?>
<?php include 'home-js.php'; ?>
</body>
</html>