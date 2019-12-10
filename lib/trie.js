class Node {
    constructor(){
        this.children = {};
        this.isTerminal = false;
    }   
}

class Trie {
    constructor() {
        this.root = new Node ();
    }

    insertRecur( word, root = this.root ) {
        let letter = word[0];

        if ( !( letter in root.children )){
            root.children[letter] = new Node();
        }

        if ( word.length === 1) {
            root.children[letter].isTerminal = true;
        } else {
            this.insertRecur(word.slice(1), root.children[letter]);
        }
    }

    searchIter( word ) {
        let node = this.root;

        for ( let i = 0 ; i < word.length ; i++ ) {
            let letter = word[i];

            if ( !( letter in node.children)) {
                return false;
            }

            node = node.children[letter];
        }

        return node.isTerminal;
    }

    wordsWithPrefix( prefix, root = this.root ) {
        if ( prefix.length === 0 ) {
            let allWords = [];

            if ( root.isTerminal ) allWords.push( '' );

            for ( let letter in root.children ) {
                let child = root.children[letter];

                let suffxies = this.wordsWithPrefix( '', child );
                let words = suffxies.map( word => letter + word);
                allWords.push(...words);
            }

            return allWords;
        } else {
            let firstLet = prefix[0];
            let child = root.children[firstLet];

            if ( child === undefined ) {
                return [];
            } else {
                let suffxies = this.wordsWithPrefix( prefix.slice(1), root.children[firstLet] );
                return suffxies.map( suffix => firstLet + suffix );
            }
        }
    }

    searchRecur(word, root = this.root) {
        if (word.length === 0) {
            if (root.isTerminal) {
                return true;
            } else {
                return false;
            }
        }

        let letter = word[0];
        if (letter in root.children) {
            return this.searchRecur(word.slice(1), root.children[letter]);
        } else {
            return false;
        }
    }

    insertIter(word) {
        let node = this.root;

        for (let i = 0; i < word.length; i++) {
            let letter = word[i];

            if (!(letter in node.children)) {
                node.children[letter] = new Node();
            }

            node = node.children[letter];
        }

        node.isTerminal = true;
    }
}

module.exports = {
    Node,
    Trie
};