/**
 * Created by sks on 2016/6/14.
 */
var http=require("http");
var url=require("url");
var fs = require('fs');
var querystring = require('querystring');
http.createServer(function(request,response){
   // console.log(request);
    var urlObj=url.parse(request.url,true);
    console.log(urlObj.pathname);
    if(urlObj.pathname=='/'){
        fs.readFile('demo5.html', function(err, data) { //读取当前目录下面的demo5.html模块
            console.log("AA");
            response.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'}); //写响应码和响应头，指定内容类型
            response.end(data); //把文件内容写入响应返回给客户端(
            console.log(data);
        });
    }else
    if(urlObj.pathname=='/jquery.dataTables.css'){
        fs.readFile('./jquery.dataTables.css', function(err, data) { //读取当前目录下面的index.html模块
            response.writeHead(200, {'Content-Type': 'text/css;charset=utf-8'}); //写响应码和响应头，指定内容类型
            response.end(data); //把文件内容写入响应返回给客户端
        });
    }else
    if(urlObj.pathname=='/jquery-1.9.1.js'){
        fs.readFile('../jquery-1.9.1.js', function(err, data) { //读取当前目录下面的index.html模块
            response.writeHead(200, {'Content-Type': 'text/javascript;charset=utf-8'}); //写响应码和响应头，指定内容类型
            response.end(data); //把文件内容写入响应返回给客户端
        });
    }else
    if(urlObj.pathname=='/jquery.dataTables.js'){
        fs.readFile('../jquery.dataTables.js', function(err, data) { //读取当前目录下面的index.html模块
            response.writeHead(200, {'Content-Type': 'text/javascript;charset=utf-8'}); //写响应码和响应头，指定内容类型
            response.end(data); //把文件内容写入响应返回给客户端
        });
    }else
    if(urlObj.pathname=='/index'){

           //console.log(urlObj.query);//get

        //post
        var content = "";
        request.on('data', function (chunk) {//监听客户端的数据
            content += chunk;
        });
        request.on('end', function () {//接收完毕
            response.writeHead(200, {"Content-Type": "application/json;charset=utf-8"});
            response.write(JSON.stringify(querystring.parse(content)));
            console.log("A:",querystring.parse(content));
            response.end();
        });
    }else
    if(urlObj.pathname=='/5.text'){
        fs.readFile('5', function(err, data) { //读取当前目录下面的index.html模块
            console.log(err);
            console.log(data);
            response.writeHead(200, {'Content-Type': 'text/plain;charset=utf-8'}); //写响应码和响应头，指定内容类型
            console.log("5:",JSON.parse(data));
            response.end(JSON.stringify(JSON.parse(data))); //把文件内容写入响应返回给客户端
            console.log(data);

        });
    }else
    {
            response.writeHead(404, {'Content-Type': 'text/plain;charset=utf-8'});
            response.end("404"); //把文件内容写入响应返回给客户端

    }

}).listen(8888,function(){
    console.log("OK");
})
