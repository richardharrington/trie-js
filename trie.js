var splitWord = function(word, emptyCb, nonEmptyCb) {
    if (word.length === 0) {
        return emptyCb();
    }
    else {
        return nonEmptyCb(word[0], word.substring(1));
    }
}

function Trie(){
    // will be set with properties "val" and/or "children"
}
	
Trie.prototype = {

    getNode: function(word) {
        var self = this;
        return splitWord(word, function() {
            return self;
        }, function(firstLetter, restOfWord) {
            return self.children[firstLetter] && self.children[firstLetter].getNode(restOfWord);

    set: function(word, val) {
        if (typeof word === "object") {
            for (var key in word) {
                this.set(key, word[key]);
            }
        }
        else {
            var self = this;
            splitWord(word, function() {
                self.val = val;
            }, function(firstLetter, restOfWord) {
                self.children = self.children || {};
                self.children[firstLetter] = self.children[firstLetter] || new Trie();
                self.children[firstLetter].set(restOfWord, val);
            });
        }
    },

    get: function(word) {
        var node = this.getNode(word);
        return node && node.val;
    },
    
	getSuffixes: function() {
        var mainList = [];
        var list;
        var i, len;
        for (var letterKey in this.children) {
           list = this.children[letterKey].getSuffixes();
           for (i = 0, len = list.length; i < len; i++) {
               list[i] = letterKey + list[i];
           }
           mainList = mainList.concat(list);
        }
        return mainList;
    },

	getWordsFromPrefix: function(prefix){
		var subTree = this.getNode(prefix);
		var suffixes = subTree.getSuffixes();
		var words = [];
		for (var i = 0, len = suffixes.length; i < len; i++) { 
			words.push(prefix + suffixes[i]);
		}
		return words;
	},

	getSortedWordsFromPrefix: function(prefix){
		return this.getWordsFromPrefix(prefix).sort();
	}
};

var myTrie = new Trie();
var words = ["", "a", "at","ads","adva","but","at","but","but"];
myTrie.insertWords(words);

// a = ["a", 2];
// b = ["b", 0];
// c = ["c", 1];
// d = ["d", 5];
// e = ["e", 9];

// var list = [a,b,c,d,e];
// console.log(list.sort(function(a,b) {return a[1] - b[1]}));

console.log(myTrie.getSortedWordsFromPrefix(""));

