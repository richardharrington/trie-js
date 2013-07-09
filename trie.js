function Trie(){
	this.children = {};
	this.count = 0;
    this.letter = "";
}
	
var getFirstLetter = function(word, emptyCallback, nonEmptyCallback) {
    if (word.length === 0) {
        return emptyCallback();
    }
    return nonEmptyCallback(word[0], word.substring(1));
};

Trie.prototype = {
    insertWord: function(word, letter) {
        if (letter !== undefined) {
            this.letter = letter;
        }
        var self = this;
        getFirstLetter(word,
                function(){
                    self.count++;
                },
                function(firstLetter, restOfWord) {
                    self.children[firstLetter] = self.children[firstLetter] || new Trie();
                    self.children[firstLetter].insertWord(restOfWord, firstLetter);
                });
	},
    insertWords: function(words) {
        for (var i = 0, len = words.length; i < len; i++) {
            this.insertWord(words[i]);
        }
    },
	getNode: function(word){
        var self = this;
        return getFirstLetter(word,
                function() {
                    return self;
                },
                function(firstLetter, restOfWord) {
                    if (self.children[firstLetter] !== undefined) {
                        return this.children[firstLetter].getNode(restOfWord);
                    }
                });
	},
	getSuffix: function() {
		var list = [];
		for (var key in this.children) {
			list = list.concat(this.children[key].getSuffix());
		}
		for (var i = 0, len = list.length; i < len; i++) {
			list[i][0] = this.letter + list[i][0];
		}
		if (this.count > 0) {
			list.push([this.letter, this.count]);
		}
		return list;
	},
	getWordsFromPrefix: function(prefix){
		var subTree = this.getNode(prefix);
		var endings = subTree.getSuffix();
		var words = [];
		for (i in endings) {
			words.push([prefix.substring(0,prefix.length-1) + endings[i][0], endings[i][1]]);
		}
		return words;
	},
	getSortedWordsFromPrefix: function(prefix){
		var words = this.getWordsFromPrefix(prefix);
		return words.sort(function(a,b) {return b[1] - a[1]});
	},
	getCount: function(word) {
		var c = this.getNode(word);
		if (c === undefined) {
			return 0;
		}
		return this.getNode(word).count;
	}

};
//module.exports = Trie;

