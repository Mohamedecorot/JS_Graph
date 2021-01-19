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

var httpRequest = getHttpRequest();
httpRequest.onreadystatechange = function () {
    if (httpRequest.readyState === 4) {
        document.getElementById('result').innerHTML = httpRequest.responseText;
    }
}
httpRequest.open('GET', '/demo.php?city=marseille', true);
httpRequest.send();