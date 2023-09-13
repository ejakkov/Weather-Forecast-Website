function requestResult(){
    const Http = new XMLHttpRequest();
    const url='http://www.7timer.info/bin/api.pl?lon=113.17&lat=23.09&product=astro&output=json';
    Http.open("GET", url);
    Http.send();

    Http.onreadystatechange = (e) => {
    console.log(Http.responseText)
    const a = Http.responseText;
    return a;
    }
    
}

console.log(requestResult());
console.log('aa');