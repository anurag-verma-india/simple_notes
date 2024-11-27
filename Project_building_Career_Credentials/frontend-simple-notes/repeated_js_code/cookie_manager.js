// https://plainjs.com/javascript/utilities/set-cookie-get-cookie-and-delete-cookie-5/
// https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#define_where_cookies_are_sent

export function getCookie(name) {
    var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
}


export function setCookie(name, value, days) {
    var d = new Date;
    d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
    document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
}

export function deleteCookie(name) { setCookie(name, '', -1); }


export function deleteAllCookies() {
    var cookies = document.cookie.split("; ");
    for (var c = 0; c < cookies.length; c++) {
        var d = window.location.hostname.split(".");
        while (d.length > 0) {
            var cookieBase = encodeURIComponent(cookies[c].split(";")[0].split("=")[0]) + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; domain=' + d.join('.') + ' ;path=';
            var p = location.pathname.split('/');
            document.cookie = cookieBase + '/';
            while (p.length > 0) {
                document.cookie = cookieBase + p.join('/');
                p.pop();
            };
            d.shift();
        }
    }
}

export function setTheseCookies(keyValuePair) {
    for (const [key, value] of Object.entries(keyValuePair)) {
        console.log(`${key}: ${value}`)
        deleteCookie(key)
        setCookie(key, value, 365)
    }
}
