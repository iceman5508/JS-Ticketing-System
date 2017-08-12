/**
 * Created by Isaac Parker on 5/20/2017.
 * A simple NodeJS server
 */

//add in required modules for server
const http = require('http');
var url = require('url');
var path = require('path');
var filesystem = require('fs');

//possible file types
//note that this can easily be extended
var file_types = {
    "html" : "text/html",
    "jpg" : "image/jpeg",
    "jpeg" : "image/jpeg",
    "png" : "image/png",
    "js" : "text/javascript",
    "css" : "text/css"
};

//create server
http.createServer(function (req, res) {
    var uri = url.parse(req.url).pathname;
    var filename = path.join(process.cwd(), decodeURI(uri));
    console.log('Loading ' + uri);

    var status;
    //get url to server
    try {
        status = filesystem.lstatSync(filename);
    } catch(e){
        res
    .
    writeHead(404, {'Content-type': 'text/plain'});
    res.write('404 Note Found\n');
    res.end();
    return;


}
    //check if file or directory
    if (status.isFile()) {
        var type = file_types[path.extname(filename).split(".").reverse()[0]];
        res.writeHead(200, {'Content-type': type});

        var stream = filesystem.createReadStream(filename);
        stream.pipe(res);
    }
    else if (status.isDirectory()){
        res.writeHead(302, {'location' : 'index.html'});
        res.end();
    }else
    {
        res.writeHead(500, {'Content-type' : 'text/plain'});
        res.write('500 Internal Error');
        res.end();
    }
}).listen(1989); //provided port can be change from 1989 to custom