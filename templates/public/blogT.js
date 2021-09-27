function test() {
    var tabsNewAnim = $('#navbarSupportedContent');
    var selectorNewAnim = $('#navbarSupportedContent').find('li').length;
    var activeItemNewAnim = tabsNewAnim.find('.active');
    var activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
    var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
    var itemPosNewAnimTop = activeItemNewAnim.position();
    var itemPosNewAnimLeft = activeItemNewAnim.position();
    $(".hori-selector").css({
        "top": itemPosNewAnimTop.top + "px",
        "left": itemPosNewAnimLeft.left + "px",
        "height": activeWidthNewAnimHeight + "px",
        "width": activeWidthNewAnimWidth + "px"
    });
    $("#navbarSupportedContent").on("click", "li", function(e) {
        $('#navbarSupportedContent ul li').removeClass("active");
        $(this).addClass('active');
        var activeWidthNewAnimHeight = $(this).innerHeight();
        var activeWidthNewAnimWidth = $(this).innerWidth();
        var itemPosNewAnimTop = $(this).position();
        var itemPosNewAnimLeft = $(this).position();
        $(".hori-selector").css({
            "top": itemPosNewAnimTop.top + "px",
            "left": itemPosNewAnimLeft.left + "px",
            "height": activeWidthNewAnimHeight + "px",
            "width": activeWidthNewAnimWidth + "px"
        });
    });
}
$(document).ready(function() {
    setTimeout(function() { test(); });
});
$(window).on('resize', function() {
    setTimeout(function() { test(); }, 500);
});
$(".navbar-toggler").click(function() {
    setTimeout(function() { test(); });
});

// var typed = new Typed('.box', {
//     strings: [
//         "CREATIVE DEVELOPER",
//         "Web Developer",
//         "Python Developer",
//         "JS Developer",
//         "JAVA Developer",
//         "Designer",
//         "Photographer"
//     ],
//     typeSpeed: 40,
//     backspaceSpeed: 20,
//     backspaceDelay: 80,
//     repeatDelay: 10,
//     repeat: true,
//     autoStart: true,
//     startDelay: 10,
//     loop: true,
// });
// var loader;

// function loadNow(opacity) {
//     if (opacity <= 0) {
//         displayContent();
//     } else {
//         loader.style.opacity = opacity;
//         window.setTimeout(function() {
//             loadNow(opacity - 0.10);
//         }, 300);
//     }
// }
// var count1 = 0;

// function displayContent() {
//     document.getElementsByClassName('content')[0].style.display = 'block';
//     document.getElementsByClassName('type')[0].style.display = 'block';
//     document.getElementsByClassName('content1')[1].style.display = 'block';
//     document.getElementsByClassName('content1')[2].style.display = 'block';
//     document.getElementsByClassName('content1')[3].style.display = 'block';
//     document.getElementsByClassName('content1')[4].style.display = 'block';
//     document.getElementsByClassName('arrow')[0].style.display = 'block';
//     loader.style.display = 'none';
//     gsap.from('.content', {
//         x: -60,
//         y: -60,
//         ease: "bounce",
//         duration: 2,
//         delay: .1,
//         rotation: "45_ccw"
//     })
//     gsap.from('.content1', {
//         y: 50,
//         duration: 2,
//         scale: 1
//     })
//     gsap.from('.type', {
//         x: 200,
//         duration: 2,
//         scale: 1,

//     })
//     gsap.from('.arrow', {
//         y: -20,
//         duration: 2,
//         scale: 1,

//     })
//     count1 = 1;
// }

// document.addEventListener("DOMContentLoaded", function() {
//     loader = document.getElementById('loader');
//     loadNow(1);

// });
// let lastScrollTop = 0;
// let navbar = document.getElementsByTagName('nav')[0];
// var count = 0;
// window.addEventListener("scroll", function(event) {
//     var scroll_y = this.scrollY;
//     var scroll_x = this.scrollX;
//     if (scroll_y >= 310 && window.innerWidth > 690) {
//         document.getElementsByClassName('content')[0].style.display = 'none';
//         document.getElementsByClassName('type')[0].style.display = 'none';
//         document.getElementsByClassName('content1')[1].style.display = 'none';
//         document.getElementsByClassName('content1')[2].style.display = 'none';
//         document.getElementsByClassName('content1')[3].style.display = 'none';
//         document.getElementsByClassName('content1')[4].style.display = 'none';
//         document.getElementsByClassName('arrow')[0].style.display = 'none';

//         document.getElementsByClassName('email_line')[0].style.display = 'flex';
//         document.getElementsByClassName('contact_logo')[0].style.display = 'flex';
//         count = 1;

//     } else if (scroll_y <= 310 && count === 1) {
//         document.getElementsByClassName('content')[0].style.display = 'block';
//         document.getElementsByClassName('type')[0].style.display = 'block';
//         document.getElementsByClassName('content1')[1].style.display = 'block';
//         document.getElementsByClassName('content1')[2].style.display = 'block';
//         document.getElementsByClassName('content1')[3].style.display = 'block';
//         document.getElementsByClassName('content1')[4].style.display = 'block';
//         document.getElementsByClassName('email_line')[0].style.display = 'none';
//         document.getElementsByClassName('contact_logo')[0].style.display = 'none';
//         console.log("phir bi may chala")
//     }
//     if (scroll_y !== 0) {
//         document.getElementsByClassName('arrow')[0].style.display = 'none';
//     } else if (scroll_y === 0 && count1 === 1) {
//         document.getElementsByClassName('arrow')[0].style.display = 'block';
//     }

//     // navbar code
//     let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
//     // console.log(scrollTop > lastScrollTop);
//     if (scrollTop > lastScrollTop) {
//         navbar.style.top = "-80px";
//     } else {
//         navbar.style.position = "fixed";
//         navbar.style.width = "100%";
//         navbar.style.zIndex = "1";
//         navbar.style.opacity = "0.9";
//         navbar.style.top = "0px";
//         navbar.style.transition = "0.5s";
//         // console.log("may bi chala")

//     }
//     lastScrollTop = scrollTop;
//     if (scrollY === 0) {
//         navbar.style.opacity = "1";
//     }
// });
// // scrollY = 0;
// if (true) {
//     navbar.style.position = "fixed";
//     navbar.style.width = "100%";
//     navbar.style.zIndex = "1";
//     navbar.style.opacity = "1";
//     navbar.style.top = "0px";
//     navbar.style.transition = "0.5s";
//     document.getElementsByClassName('content')[0].style.display = 'none';
//     document.getElementsByClassName('type')[0].style.display = 'none';
//     document.getElementsByClassName('content1')[1].style.display = 'none';
//     document.getElementsByClassName('content1')[2].style.display = 'none';
//     document.getElementsByClassName('content1')[3].style.display = 'none';
//     document.getElementsByClassName('content1')[4].style.display = 'none';
//     document.getElementsByClassName('arrow')[0].style.display = 'none';

//     console.log("may chala")
// }


// //  Show More or Show Less Code
// $(".col1").slice(0, 4).show()
// $(".btn").on("click", function() {
//     $(".col1:hidden").slice(0, 3).slideDown()
//     if ($(".col1:hidden").length == 0) {
//         // $(".btn").fadeOut('slow')
//         document.getElementsByClassName("btn")[0].style.display = "none";
//         document.getElementsByClassName("btn1")[0].style.display = "block";
//     }
// })

// function less() {
//     $(".col1").slice(0, 2).hide()

// }
// $(".btn1").on("click", function() {
//     // $(".col1:hidden").slice(0, 1).slideDown()
//     // if ($(".col1:hidden").length !== 0) {
//     // $(".btn1").fadeOut('slow')
//     document.getElementsByClassName("btn1")[0].style.display = "none";
//     document.getElementsByClassName("btn")[0].style.display = "block";
//     // }
// })
// AOS.init({
//     duration: 1000,
//     once: true,
// });