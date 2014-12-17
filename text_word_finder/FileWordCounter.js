var fs = require('fs');
var wordCounts = {};
var result = '';

function setResult(){

	for(var index in wordCounts){
		result += (index+':' + wordCounts[index]) + '\n';
	}
	return result;
}

function countWordsInText(text){
	var words = text
				.toString()
				.toLowerCase()
				.split(/\W+/)
				.sort();
	for(var index in words){
		var word = words[index];
		if(word) {
			wordCounts[word] = (wordCounts[word]) ? wordCounts[word] + 1 : 1;
		}
	}
}

function _countWords(filePath, callback) {
	result = '';
	fs.readFile(filePath,function(err,text) {
		if(err) throw err;
		countWordsInText(text);
		setResult();
		callback(result);
	});
} 

exports.count = _countWords;
