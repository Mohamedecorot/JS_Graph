(function(){

    var scrollY = function () {
        var supportPageOffset = window.pageXOffset !== undefined;
        var isCSS1Compat = ((document.compatMode || "") === "CSS1Compat");

        return supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;
    }

    var elements = document.querySelectorAll('[data-sticky]');
    for (var i = 0; i < elements.length; i++) {
        (function(element) {
                // Variables
                //var element = document.querySelector('.menu');
                var rect = element.getBoundingClientRect();
                var offset = parseInt(element.getAttribute('data-offset') || 0, 10);
                if (element.getAttribute('data-constraint')){
                    var constraint = document.document.querySelector(element.getAttribute('data-constraint'));
                } else {
                    var constraint = document.body;
                }
                var constraintRect = constraint.getBoundingClientRect();
                var constraintBottom = constraintRect.top + scrollY() + constraintRect.height - offset - rect.height;
                var top = rect .top + scrollY();
                var fake = document.createElement('div');
                fake.style.width = rect.width + "px";
                fake.style.height = rect.height + "px";

                // Fonctions

                var onScroll = function () {
                    if (scrollY() > constraintBottom) {
                        element.style.position = 'absolute';
                        element.style.bottom = '0';
                        element.style.top = 'auto';
                    } else if (scrollY() > top - offset) {
                        element.classList.add('fixed');
                        element.style.position = 'fixed';
                        element.style.top = offset + "px";
                        element.style.bottom = 'auto';
                        element.style.width = rect.width + "px";
                        element.parentNode.insertBefore(fake, element);
                    } else if (scrollY() < top - offset) {
                        element.classList.remove('fixed');
                        element.parentNode.removeChild(fake);
                    }
                }

                var onResize = function () {
                    element.style.width = "auto";
                    element.classList.remove('fixed');
                    fake.style.display = "none";
                    rect = element.getBoundingClientRect();
                    top = rect .top + scrollY();
                    fake.style.width = rect.width + "px";
                    fake.style.height = rect.height + "px";
                    fake.style.display = "block";
                    onscroll();
                }


                // Listener
                window.addEventListener('scroll', onScroll);
                window.addEventListener('resize', onResize);
                    })(elements[i])
                }

})()