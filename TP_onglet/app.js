(function () {
    var afficherOnglet = function (a) {
        var li = a.parentNode;
        var div = a.parentNode.parentNode.parentNode;

        if (li.classList.contains('active')) {
            return false;
        }
        // On retire la classe active de l'onglet actif
        div.querySelector('.tabs .active').classList.remove('active');

        // On ajoute la classe active à l'onglet actuel
        li.classList.add('active');

        // On retire la class active sur le contenu actif
        div.querySelector('.tab-content.active').classList.remove('active');

        // On ajoute la class active sur le contenu correspondant à notre clic
        div.querySelector(a.getAttribute('href')).classList.add('active');
    }


    var tabs = document.querySelectorAll('.tabs a');
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].addEventListener('click', function (e) {
            afficherOnglet(this);
        })

        var hash = window.location.hash;
        var a = document.querySelector('a[href="' + hash + '"]');
        if (a !== null && !a.parentNode.classList.contains('active')) {
            afficherOnglet(a);
        }
    }
})()