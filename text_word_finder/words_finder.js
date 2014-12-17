var formidable = require('formidable'),
	http = require('http'),
	sys = require('sys'),
	wordCounter = require('./FileWordCounter');

http.createServer(function(req, res) {
if (req.url == '/upload' && req.method.toLowerCase() == 'post') {
	// parse a file upload
	var form = new formidable.IncomingForm();

	form.parse(req, function(error, fields, files) {
		res.writeHead(200, {'content-type': 'text/plain'});
		res.write('Following words are present in this file \n\n');
		wordCounter.count(files.upload.path, function(result) {
			res.write(result);
			res.end();
		});
	});
	return;
}
// show a file upload form
res.writeHead(200, {'content-type': 'text/html'});

res.end(
'<form action="/upload" enctype="multipart/form-data" '+
	'method="post">'+
	'<input type="text" name="title"><br>'+
	'<input type="file" name="upload" multiple="multiple"><br>'+
	'<input type="submit" value="Upload">'+
	'</form>'
);

}).listen(8888);