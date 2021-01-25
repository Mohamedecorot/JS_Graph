var getHttpRequest = function () {
    // https://developer.mozilla.org/fr/docs/AJAX/Premiers_pas

var httpRequest = false;

if (window.XMLHttpRequest) { //Mozilla, Safari
    httpRequest = new XMLHttpRequest();
    if (httpRequest.overrideMimeType) {
        httpRequest.overrideMimeType('text/xml');

    }
}
else if (window.ActiveXObject) { // IE
    try {
        httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
    }
    catch (e) {
        try {
            httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
        }
        catch (e) {}
    }
}

if (!httpRequest) {
    alert('Abandon :( Impossible de créer une instance XMLHTTP');
    return false;
}

return httpRequest;
}

var links = document.querySelectorAll('.meteo');
var result = document.getElementById('result');
for(var i = 0; i < links.length; i++) {
    var link = links[i];
    link.addEventListener('click', function (e) {
        e.preventDefault();
        result.innerHTML = 'Chargement...';
        var httpRequest = getHttpRequest();
        httpRequest.onreadystatechange = function () {
            if (httpRequest.readyState === 4) {
                result.innerHTML = '';
                if (httpRequest.status === 200 ) {
                    // var result = JSON.parse(httpRequest.responseText);
                    // var ul = document.createElement('ul');
                    // result.appendChild(ul);
                    // for (var i = 0; i < result.length; i++) {
                    //     var li = document.createElement('li');
                    //     li.innerHTML =result[i].name;
                    //     ul.appendChild(li);
                    //}
                result.innerHTML = httpRequest.responseText;

                } else {
                    alert('Impossible de contacter le serveur');
                }

            }
        }
        //httpRequest.open('GET', 'http://jsonplaceholder.typicode.com/users', true);

    //     httpRequest.open('POST', '/demo.php', true);
    //     httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    //     httpRequest.send("city=marseille&nom=mohamed");

    var data = new FormData();
    data.append('city', 'aze&aze=azeae');
    data.append('name', 'marie');
    httpRequest.send(data);
    })
}

