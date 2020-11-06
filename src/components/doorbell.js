// import Doorbell from'./doorbell.js';
// Doorbell();
export function Doorbell(){
    const id = "12047"
    const appKey = "L74cmNlLDgRJ5zBmrD2PGHHn1JkYLM3j1IGSLacqHeRerCyySy154ln5RgUyCMod"
    window.doorbellOptions = {
        "id": id,
        "appKey": appKey
    };
    (function(w, d, t) {
        var hasLoaded = false;
        function l() { if (hasLoaded) { return; } hasLoaded = true; window.doorbellOptions.windowLoaded = true; var g = d.createElement(t);g.id = 'doorbellScript';g.type = 'text/javascript';g.async = true;g.src = 'https://embed.doorbell.io/button/'+window.doorbellOptions['id']+'?t='+(new Date().getTime());(d.getElementsByTagName('head')[0]||d.getElementsByTagName('body')[0]).appendChild(g); }
        if (w.attachEvent) { w.attachEvent('onload', l); } else if (w.addEventListener) { w.addEventListener('load', l, false); } else { l(); }
        if (d.readyState == 'complete') { l(); }
    }(window, document, 'script'));
}
export default Doorbell;