'use strict';
module.exports=function CircularLinkedList() {
    let Node = function(element){
        this.element = element;
        this.next = null;
    };
    let length = 0;
    let head = null;
    this.append = function(element){
        let node = new Node(element),
            current;
        if (head === null){ 
            head = node;
        } else {
            current = head;
            while(current.next !== head){ 
                current = current.next;
            }
            current.next = node;
        }
        node.next = head;
        length++; 
    };
    this.insert = function(position, element){
        if (position >= 0 && position <= length){
            let node = new Node(element),
                current = head,
                previous,
                index = 0;
            if (position === 0){ 
                if(!head){ 
                    head = node;
                    node.next = head;
                }else{
                    node.next = current;
                    while(current.next !== head){ 
                        current = current.next;
                    }
                    head = node;
                    current.next = head;
                }
            } else {
                while (index++ < position){
                    previous = current;
                    current = current.next;
                }
                node.next = current;
                previous.next = node;
            }
            length++; 
            return true;
        } else {
            return false;
        }
    };
    this.removeAt = function(position){
        if (position > -1 && position < length){
            let current = head,
                previous,
                index = 0;
            if (position === 0){
                while(current.next !== head){ 
                    current = current.next;
                }
                head = head.next;
                current.next = head;
            } else { 
                while (index++ < position){
                    previous = current;
                    current = current.next;
                }
                previous.next = current.next;
            }
            length--;
            return current.element;
        } else {
            return null;
        }
    };
    this.remove = function(element){
        let index = this.indexOf(element);
        return this.removeAt(index);
    };
    this.indexOf = function(element){
        let current = head,
            index = -1;
        if (element == current.element){
            return 0;
        }
        index++;
        while(current.next !== head){
            if (element == current.element){
                return index;
            }
            current = current.next;
            index++;
        }
        if (element == current.element){
            return index;
        }
        return -1;
    };
    this.isEmpty = function() {
        return length === 0;
    };
    this.size = function() {
        return length;
    };
    this.getHead = function(){
        return head;
    };
    this.toString = function(){
        let current = head,
            s = current.element;
        while(current.next !== head){
            current = current.next;
            s += ', ' + current.element;
        }
        return s.toString();
    };
    this.print = function(){
        console.log(this.toString());
    };
}
