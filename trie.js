function Trie(){
  this.name = "trie";
	this.children = {};
	this.count = 0;
}
	


Trie.prototype = {
	insert: function(word) {
		//console.log(word);
		//console.log("inserting");
		if (word.length === 0){
			this.count++;
			return;
		}
		var firstLetter = word[0];
		var restOfWord = word.substring(1);
		if (this.children[firstLetter] == undefined) {
			this.children[firstLetter] = new Trie();
		}
		this.children[firstLetter].insert(restOfWord);
	},
	lookupCount: function(word) {
		if (word.length === 0){
			return this.count
		}
		var firstLetter = word[0];
		var restOfWord = word.substring(1);
		if (this.children[firstLetter] == undefined){
			return 0;
		}
		return this.children[firstLetter].lookupCount(restOfWord);
	}
}
}

var myTrie = new Trie();
myTrie.insert("apple");
myTrie.insert("apple");
myTrie.insert("apple");
myTrie.insert("apli");

console.log(myTrie.lookupCount("apple"));
console.log(myTrie.lookupCount("apli"));
console.log(myTrie.lookupCount("appl"));
