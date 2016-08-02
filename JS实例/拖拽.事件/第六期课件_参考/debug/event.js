/**
 * Created by dongjiucheng on 2015/12/5.
 */
function on(ele, type, fn) {
    if (ele.addEventListener) {
        ele.addEventListener(type, fn, false);
    }else{
        if (!ele["aEvent" + type]) {
            ele["aEvent" + type] = [];
            ele.attachEvent("on" + type, function () {
                run.call(ele);
            })
        }
        var a = ele["aEvent" + type];
        for (var i = 0; i < a.length; i++) {
            if (a[i] == fn) return;
        }
        a.push(fn);
    }
}
function run() {
    var e = window.event;
    if (!e.target) {
        e.target = e.srcElement;
        e.preventDefault = function () {
            e.returnValue = false;
        };
        e.stopPropagation = function () {
            e.cancelBubble = true;
        };
        e.pageX = (document.documentElement.scrollLeft || document.body.scrollLeft) + e.clientX;
        e.pageY = (document.documentElement.scrollTop || document.body.scrollTop) + e.clientY;
    }
    var a = this["aEvent" + e.type];
    for (var i = 0; i < a.length; i++) {
        if (typeof a[i] == "function") {
            a[i].call(this, e);
        } else {
            a.splice(i, 1);
            i--;
        }
    }
}
function off(ele, type, fn) {
    if (ele.removeEventListener) {
        ele.removeEventListener(type, fn, false);
    }else{
        var a = ele["aEvent" + type];
        for (var i = 0; i < a.length; i++) {
            if (a[i] == fn) {
                a[i] = null;
                return;
            }
        }
    }
}
