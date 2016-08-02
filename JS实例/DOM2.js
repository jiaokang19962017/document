var DOM={};
DOM.getElesByClass=function (str,context){
    context=context||document;
    var regTrim=/^ +| +$/g;
    str=str.replace(regTrim,"");
    var aClass=str.split(/ +/);
    var eles=context.getElementsByTagName("*");
    for(var i=0;i<aClass.length;i++){
        var reg=new RegExp("(^| )"+aClass[i]+"( |$)");
        var a=[];
        for(var j=0;j<eles.length;j++){
            var ele=eles[j];
            if(reg.test(ele.className)){
                a.push(ele);
            }
        }
        eles=a;

    }
    return eles;
}


DOM.getIndex=function (ele){
    var index=0;
    var p=ele.previousSibling;
    while(p){
        if(p.nodeType===1){
            index++;
        }
        p=p.previousSibling;
    }
    return index;
}

DOM.addClass=function(ele,strClass){
    var reg=new RegExp("(^| )"+strClass+"( |$)");
    if(!reg.test(ele.className))
        ele.className+=" "+strClass;

}

DOM.siblings=function siblings(ele){
    var a=[];
    var p=ele.previousSibling;
    while(p){
        if(p.nodeType==1){
            a.push(p);
        }
        p=p.previousSibling;
    }
    a.reverse();
    var next =ele.nextSibling;
    while(next){
        if(next.nodeType==1){
            a.push(next);
        }
        next=next.nextSibling;
    }
    return a;

}

DOM.removeClass=function(ele,strClass){
    var reg=new RegExp("(^| )"+strClass+"( |$)","g");
    var tempStr=ele.className.replace(/ /g,"   ");
    ele.className=tempStr.replace(reg," ");
}


DOM.children=function(parent,str){
    var a=[];
    var childNodes=parent.childNodes;

    if(typeof str=="string"){
        str=str.toUpperCase();
        for(var i=0;i<childNodes.length;i++){
            child=childNodes[i];
            if(child.tagName===str){
                a.push(child);
            }
        }
    }else if(str===undefined){
        for(var i=0;i<childNodes.length;i++){
            var child=childNodes[i];
            if(child.nodeType===1){
                a.push(child);
            }
        }
    }else{
        throw new Error("ss ");
    }
    return a;

}

DOM.next=function next(ele){
    if(typeof ele.nextElementSibling=="object"){
        return ele.nextElementSibling;
    }else{
        var next=ele.nextSibling;
        while(next){
            if(next.nodeType==1){

                return next;
            }
            next=next.nextSibling;
        }
        return null;
    }
}



