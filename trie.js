function Trie(){
	this.children = {};
	this.count = 0;
	this.letter;
}
	
Trie.prototype = {
	insert: function(word, letter) {
		//console.log(word);
		//console.log("inserting");
		if (letter === undefined){
			letter = "";
		}
		this.letter = letter;
		if (word.length === 0){
			this.count++;
			return;
		}
		var firstLetter = word[0];
		var restOfWord = word.substring(1);
		if (this.children[firstLetter] == undefined) {
			this.children[firstLetter] = new Trie();
		}
		this.children[firstLetter].insert(restOfWord, firstLetter);
	},
	getCount: function(word) {
		var c = this.getNode(word);
		if (c === undefined) {
			return 0;
		}
		return this.getNode(word).count;
	},
	getSuffix: function() {
		var list = [];
		for (var key in this.children) {
			list = list.concat(this.children[key].getSuffix());
		}
		for (var i in list) {
			list[i][0] = this.letter + list[i][0];
		}
		if (this.count > 0) {
			list.push([this.letter, this.count]);
		}
		return list;
	},
	getNode: function(word){
		if (word.length === 0) {
			return this;
		}
		var firstLetter = word[0];
		var restOfWord = word.substring(1);
		if (this.children[firstLetter] === undefined){
			return undefined;
		} else {
			return this.children[firstLetter].getNode(restOfWord);
		}
	},
	getWordsFromPrefix: function(prefix){
		var subTree = this.getNode(prefix);
		var endings = subTree.getSuffix();
		var words = [];
					// console.log(endings)
		for (i in endings) {
			words.push([prefix.substring(0,prefix.length-1) + endings[i][0], endings[i][1]]);
		}
		return words;
	},
	getSortedWordsFromPrefix: function(prefix){
		var words = this.getWordsFromPrefix(prefix);
		return words.sort(function(a,b) {return b[1] - a[1]});
	}
}

var myTrie = new Trie();
var words = ["", "a", "at","ads","adva","but","at","but","but"];
for (var i in words) {
	myTrie.insert(words[i]);
}

// a = ["a", 2];
// b = ["b", 0];
// c = ["c", 1];
// d = ["d", 5];
// e = ["e", 9];

// var list = [a,b,c,d,e];
// console.log(list.sort(function(a,b) {return a[1] - b[1]}));

console.log(myTrie.getSortedWordsFromPrefix(""));
