const Node = require('./node');

class LinkedList {
    constructor() {
        this._head = null;
        this._tail = null;
        this.length = 0;
    }

    append(data) {
        let newNode = new Node(data);
                
        if (this.length) {
            this._tail.next = newNode;
            newNode.prev = this._tail;            
        } else {
            this._head = newNode;
        }

        this._tail = newNode;

        this.length++;

        return this;
    }

    head() {
        if (this.length) {
            return this._head.data;
        }

        return null;
    }

    tail() {
        if (this.length) {
            return this._tail.data;
        }

        return null;
    }

    at(index) {
        if (index > -1) {
            let current = this._head;
            let i = 0;

            while ((current) && (i < index)) {
                current = current.next;
                i++;          
            }
        
            if (current) {
                return current.data;
            }
        } 

        throw new RangeError("Index out of bounds");
    }

    insertAt(index, data) {
        if ((index < 0) || (index > this.length)) {
            throw new RangeError("Index out of bounds");
        }

        let newNode = new Node(data);

        if (this._head === null) {
            this._head = newNode;
            this._tail = newNode;
        } else {
            let insertBeforeNode = this._head;
            let prevNode = null;            
            let i = 0;

            while ((insertBeforeNode) && (i < index)) {
                prevNode = insertBeforeNode;
                insertBeforeNode = insertBeforeNode.next;
                i++;          
            }

            if (insertBeforeNode === null) {
                this._tail = newNode;
                newNode.prev = prevNode;
                prevNode.next = newNode;
            } else {
                newNode.prev = insertBeforeNode.prev;
                newNode.next = insertBeforeNode;
                insertBeforeNode.prev = newNode;
                prevNode.next = newNode;

            }
        }

        this.length++;

        return this;
    }

    isEmpty() {
        return (this.length) ? false : true;
    }

    clear() {
        this._head = null;
        this._tail = null;        
        this.length = 0;

	return this;
    }

    deleteAt(index) {
        if ((index < 0) || (index > this.length - 1)) {
            throw new RangeError("Index out of bounds");
        }

        if (index === 0) {
            this._head = this._head.next;

            if (this._head === null) {
                this._tail = null;
            } else {
                this._head.prev = null;
            }
        } else if (index === this.length - 1) {
            this._tail = this._tail.prev;
            this._tail.next = null;
        } else {
            let current = this._head;
            let i = 0;

            while ((current) && (i < index)) {
                current = current.next;
                i++;
            }

            current.prev.next = current.next;
            current.next.prev = current.prev;
        }

        this.length--;

        return this;
    }

    reverse() {
        if (this.length > 1) {
            let previous = null;
            let current = this._head;

            while (current) {
                previous = current.prev;
                current.prev = current.next;
                current.next = previous;

                current = current.prev;
            }

            previous = this._tail;
            this._tail = this._head;
            this._head = previous;
        }

        return this;
    }

    indexOf(data) {
        let current = this._head;
        let index = 0;

        while ((current) && (current.data !== data)) {
            current = current.next;
            index++;
        }

        return ((current === null) || (current.data !== data)) ? -1 : index;
    }
}

module.exports = LinkedList;
