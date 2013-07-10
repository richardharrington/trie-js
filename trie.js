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

    walk: function(cb, prefix) {
        // not meant to be called with 2 arguments
        // except recursively
        if (arguments.length < 2) {
            prefix = "";
        }
        cb(prefix, this.val);
        for (var letterKey in this.children) {
            this.children[letterKey].walk(cb, prefix + letterKey);
        }
    },

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

    getKeyValuePairsFromPrefix: function(prefix) {
        var subTrie = this.getNode(prefix);
        var results = {};
        subTrie.walk(function(word, val) {
            if (val !== undefined) {
                results[prefix + word] = val;
            }
        });
        return results;
    },

    getKeysFromPrefix: function(prefix) {
        var results = [];
        for (var key in this.getKeyValuePairsFromPrefix(prefix)) {
            results.push(key);
        }
        return results;
    },
        
	getSortedKeysFromPrefix: function(prefix){
		return this.getKeysFromPrefix(prefix).sort();
	},

    inspect: function(){
        return this.getKeyValuePairsFromPrefix("");
    }
};

module.exports = Trie;
