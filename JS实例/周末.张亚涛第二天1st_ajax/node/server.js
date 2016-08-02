var http = require('http');
var url = require('url');
var path = require('path');
var server = http.createServer(function (request, response) {
    var urlObj = url.parse(request.url, true);

    // referer是表示该请求的来源
    //console.log(request.headers.referer);
    // http://localhost:8080?val=func
    //console.log(urlObj.query);//=> { callback: 'func' ,a:1,b:2}
    var val = urlObj.query.callback;// 获取url中的参数callback 也就是func
    var json = JSON.stringify({name: '123', content: 'china'});
    response.end(val + '(' + json + ')'); // func(/*json data*/)
});
server.listen(8080, function () {
    console.log('start');
});
