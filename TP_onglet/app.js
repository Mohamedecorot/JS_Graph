(function () {
    var afficherOnglet = function (a, animations) {
        if (animations === undefined) {
            animations = true;
        }
        var li = a.parentNode;
        var div = a.parentNode.parentNode.parentNode;

        var activeTab = div.querySelector('.tab-content.active'); //contenu actif
        var aAfficher = div.querySelector(a.getAttribute('href')); //contenu a afficher

        if (li.classList.contains('active')) {
            return false;
        }
        // On retire la classe active de l'onglet actif
        div.querySelector('.tabs .active').classList.remove('active');

        // On ajoute la classe active à l'onglet actuel
        li.classList.add('active');

        // On retire la class active sur le contenu actif
        //div.querySelector('.tab-content.active').classList.remove('active');

        // On ajoute la class active sur le contenu correspondant à notre clic
        //div.querySelector(a.getAttribute('href')).classList.add('active');

        if (animations) {
            activeTab.classList.add('fade');
            activeTab.classList.remove('in');
            var transitionend = function () {
                this.classList.remove('fade');
                this.classList.remove('active');
                aAfficher.classList.add('active');
                aAfficher.classList.add('fade');
                aAfficher.offsetWidth;
                aAfficher.classList.add('in');
                activeTab.removeEventListener('transitionend', transitionend)
                activeTab.removeEventListener('webkitTransitionEnd', transitionend)
                activeTab.removeEventListener('oTransitionEnd', transitionend)
            }
            activeTab.addEventListener('transitionend', transitionend)
            activeTab.addEventListener('webkitTransitionEnd', transitionend)
            activeTab.addEventListener('oTransitionEnd', transitionend)
        } else {
            aAfficher.classList.add('active');
            activeTab.classList.remove('active');
        }
    }


    var tabs = document.querySelectorAll('.tabs a');
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].addEventListener('click', function (e) {
            afficherOnglet(this);
        })

        var hashChange = function (e) {
            var hash = window.location.hash;
            var a = document.querySelector('a[href="' + hash + '"]');
            if (a !== null && !a.parentNode.classList.contains('active')) {
                afficherOnglet(a, e !==undefined);
            }
        }

        window.addEventListener('hashChange', hashChange);
        hashChange();
    }
})()