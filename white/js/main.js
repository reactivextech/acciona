(function($) {
    'use strict';

	//owl carousel
	$('.price-two-active').owlCarousel({ 
        responsive: {
            0: {
                items: 1
            },
            480: {
                items: 1
            },
            576: {
                items: 2
            },
            768: {
                items: 3
            },
            992: {
                items: 4
            }
        }
    });

    //for mobile menu
    $( '.toggle-inner' ).on( 'click', function (e) {
        e.preventDefault();
        var mask = '<div class="mask-overlay">';

        $( 'body' ).toggleClass( 'active' );
        $(mask).hide().appendTo( 'body' ).fadeIn( 'fast' );
        $( '.mask-overlay, .close-menu, .close-menu-2' ).on( 'click', function() {
            $( 'body' ).removeClass( 'active' );
            $( '.mask-overlay' ).remove();
        });
    });
    
    var Accordion = function (el, multiple) {
        this.el = el || {};

        this.multiple = multiple || false;

        var dropdownlink = this.el.find('.dropdownlink');
        dropdownlink.on('click', {
                el: this.el,
                multiple: this.multiple
            },
            this.dropdown);
    };
    
    Accordion.prototype.dropdown = function (e) {
        e.preventDefault();
        var $el = e.data.el,
             $this = $(this),

            $next = $this.next();

        $next.slideToggle();
        $this.parent().toggleClass('open');

        if (!e.data.multiple) {
            //show only one menu at the same time
            $el.find('.submenuItems').not($next).slideUp().parent().removeClass('open');
        }
    }
    var accordion = new Accordion($('.accordion-menu'), false);

    //sticky menu
    $(".header_area").sticky({topSpacing:0});

    //smooth scroll
    $('.mainmenu ul li a, .accordion-menu li a').on('click', function(event) {
        var $anchor = $($(this).attr('href')).offset().top - 80;
        $('body, html').animate({scrollTop : $anchor}, 600);
        return false;
        event.preventDefault();
    });
    
    //smooth scroll
    // $('.navbar-nav li a').on('click', function(event) {
    //     var $anchor = $($(this).attr('href')).offset().top - 80;
    //     $('body, html').animate({scrollTop : $anchor}, 600);
    //     return false;
    //     event.preventDefault();
    // });

    //particle
    if(document.getElementById('particles-js')){
        particlesJS("particles-js", {
          "particles": {
            "number": {
              "value": 40,
              "density": {
                "enable": true,
                "value_area": 1000
              }
            },
            "color": {
              "value": "#1b4f85"
            },
            "shape": {
              "type": "circle",
              "stroke": {
                "width": 0,
                "color": "#2468ae"
              },
              "polygon": {
                "nb_sides": 5
              },
              "image": {
                "src": "img/github.svg",
                "width": 100,
                "height": 100
              }
            },
            "opacity": {
              "value": 0.5,
              "random": false,
              "anim": {
                "enable": false,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
              }
            },
            "size": {
              "value": 6,
              "random": true,
              "anim": {
                "enable": false,
                "speed": 40,
                "size_min": 0.1,
                "sync": false
              }
            },
            "line_linked": {
              "enable": true,
              "distance": 150,
              "color": "#ffffff",
              "opacity": 0.2,
              "width": 1
            },
            "move": {
              "enable": true,
              "speed": 5,
              "direction": "none",
              "random": false,
              "straight": false,
              "out_mode": "out",
              "bounce": false,
              "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
              }
            }
          },
          "interactivity": {
            "detect_on": "canvas",
            "events": {
              "onhover": {
                "enable": true,
                "mode": "grab"
              },
              "onclick": {
                "enable": true,
                "mode": "push"
              },
              "resize": true
            },
            "modes": {
              "grab": {
                "distance": 150,
                "line_linked": {
                  "opacity": 1
                }
              },
              "bubble": {
                "distance": 400,
                "size": 40,
                "duration": 2,
                "opacity": 8,
                "speed": 3
              },
              "repulse": {
                "distance": 200,
                "duration": 0.4
              },
              "push": {
                "particles_nb": 4
              },
              "remove": {
                "particles_nb": 2
              }
            }
          },
          "retina_detect": true
        });
    };
    
    //marquee
	$('.marquee').marquee({
        duration: 25000,
        gap: 0,
        duplicated: true,
        pauseOnHover: true,
        startVisible: true,
        loop: true,
    });
    
    //countdown
    $('.countdown').each(function (index, value){
		var count_year = $(this).attr( "data-count-year" );
		var count_month = $(this).attr( "data-count-month" );
		var count_day = $(this).attr( "data-count-day" );
		var count_date = count_year + '/' + count_month + '/' + count_day;
		$(this).countdown(count_date, function(event) {
			$(this).html(
				event.strftime('<span class="CountdownContent">%D :<span class="CountdownLabel">Days</span></span><span class="CountdownSeparator"></span><span class="CountdownContent">%H : <span class="CountdownLabel">Hours</span></span><span class="CountdownSeparator"></span><span class="CountdownContent">%M : <span class="CountdownLabel">Minutes</span></span><span class="CountdownSeparator"></span><span class="CountdownContent">%S <span class="CountdownLabel">Seconds</span></span>')
				);
		});
	});

	//Initialize wow
	new WOW().init();
	
}(jQuery));