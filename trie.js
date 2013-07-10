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
            var children = self.children;
            return children && children[firstLetter] && children[firstLetter].getNode(restOfWord);
        });
    },

    setNode: function(word, cb) {
        var self = this;
        splitWord(word, function() {
            if (cb) {
                cb(self);
            }
        }, function(firstLetter, restOfWord) {
            self.children = self.children || {};
            self.children[firstLetter] = self.children[firstLetter] || new Trie();
            self.children[firstLetter].setNode(restOfWord, cb);
        });
    },

    setNodes: function(words, cb) {
        words.forEach(function(word) {
            this.setNode(word, cb);
        });
    },

    getValue: function(word) {
        var node = this.getNode(word);
        return node && node.val;
    },
    
    setValue: function(word, val) {
        this.setNode(word, function(node) {
            node.val = val;
        });
    },
    
    setValues: function(obj) {
        for (var key in obj) {
            this.setValue(key, obj[key]);
        }
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

	getSortedWordsFromPrefix: function(prefix){
		return this.getWordsFromPrefix(prefix).sort();
	},

    inspect: function(){
        var obj = {};
        var keys = this.getSortedWordsFromPrefix("");
        var key;
        for (var i = 0, len = keys.length; i < len; i++) {
            key = keys[i];
            obj[key] = this.get(key);
        }
        return obj;
    }
};

module.exports = Trie;
