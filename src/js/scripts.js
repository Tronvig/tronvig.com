(function ($, window, document, undefined) {

  'use strict';

  $(function () {

    // Rellax - Parallax animations
    var rellax = new Rellax('.rellax');

    // On page load remove preload class from body
    $(window).on('load', function() {
      $('body').removeClass('preload');
    });

    // Hide .header on scroll down and show header on scroll up
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var headerHeight = $('header').outerHeight();

    function hasScrolled() {
        var st = $(window).scrollTop();

        // Make sure they scroll more than delta
        if(Math.abs(lastScrollTop - st) <= delta) {
            return;
        }

        // If they scrolled down and are past the header, add class .header-up.
        // This is necessary so you never see what is "behind" the header.
        if (st > lastScrollTop && st > headerHeight){
            // Scroll Down
            $('header').removeClass('header--down').addClass('header--up');
        } else {
            // Scroll Up
            if(st + $(window).height() < $(document).height()) {
                $('header').removeClass('header--up').addClass('header--down');
            }
        }

        lastScrollTop = st;
    }

    $(window).scroll(function(){
        didScroll = true;
    });

    setInterval(function() {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 250);

    // Control input label position on focus
    $('label input').on('focus',function(){
        var inputVal = $(this).val();
        if (inputVal.length < 1) {
          $(this).parent().toggleClass('on');
        }
    });

    // Mobile Nav
    // Hamburger menu for mobile derived from: https://codepen.io/alexnewman/pen/ByePod
    var isHamburgerActive = false;

    // Show the mobile nav
    function hideMobileNav() {
      // animate the nav exit
      $('.mobile-nav').removeClass('animate-inFromRight');
      $('.mobile-nav').addClass('animate-outToLeft');
      $('.mobile-nav').removeClass('active');

      // delay hiding the nav
      $('.icon__hamburger').removeClass('active');
      setTimeout(function () {
          $('body').removeClass('menu-open');
      }, 1200);

    }

    // Hide the mobile nav
    function showMobileNav() {

        $('.icon__hamburger').addClass('active');
        $('body').toggleClass('menu-open');
        $('.mobile-nav').toggleClass('active');
        $('.mobile-nav').removeClass('animate-outToLeft');
        $('.mobile-nav').addClass('animate-inFromRight');

        // List of nav items in the mobile nav - switch to dynamic list in future
        var classes = [
          'nav__item--1',
          'nav__item--2',
          'nav__item--3',
          'nav__item--4',
          'nav__item--5',
          'nav__item--6',
          'nav__item--7',
          'nav__item--8',
          'nav__item--9'
          ];

        $('.nav__level .nav__item').each(function(index, element){
            $(element).addClass(classes[index]);
        });

    }

    $('.icon__hamburger').on('click', function() {
      if (isHamburgerActive) {
        hideMobileNav();
      } else {
        showMobileNav();
      }

      isHamburgerActive = !isHamburgerActive;
    });

  });

})(jQuery, window, document);
