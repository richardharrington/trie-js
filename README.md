# trie-js
=========

A key-value store using the trie data structure, and a word-frequency counter based on it.

    var myTrie = new Trie();
    myTrie.setValue("ate", 7);
    myTrie.setValues({but: 4, atelier: 67, "apple juice": 90});
    myTrie.inspect()
    
    // { ate: 7,
    // atelier: 67,
    // 'apple juice': 90,
    // but: 4 }
    
    myTrie.getKeysFromPrefix("at");
    
    // [ 'ate', 'atelier' ]
    
    var wc = new myWordCountStore();
    wc.insertWord("harry");
    wc.insertWords(["harry", "george"]);
    wc.getWordCounts();
    
    // { harry: 2, george: 1 }
