(function(){

    var scrollY = function () {
        var supportPageOffset = window.pageXOffset !== undefined;
        var isCSS1Compat = ((document.compatMode || "") === "CSS1Compat");

        return supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;
    }

    var element = document.querySelector('.menu');
    var rect = element.getBoundingClientRect();
    var top = rect .top + scrollY();
    var fake = document.createElement('div');
    fake.style.width = rect.width + "px";
    fake.style.height = rect.height + "px";

    var onScroll = function () {
        var hasScrollClass = element.classList.contains('fixed');
        if (scrollY() > top && !hasScrollClass) {
            element.classList.add('fixed');
            element.style.width = rect.width + "px";
            element.parentNode.insertBefore(fake, element);
        } else if (scrollY() < top && hasScrollClass) {
            element.classList.remove('fixed');
            element.parentNode.removeChild(fake, element);
        }
    }
    window.addEventListener('scroll', onScroll);
})()