'use strict';
const LinkedList= require('./LinkedList');
module.exports=function HashTable() {
    var table = [];
    /**
     * 辅助处理分离链接的类
     */
    var ValuePair = function(key, value){
        this.key = key;
        this.value = value;
        this.toString = function() {
            return '[' + this.key + ' - ' + this.value + ']';
        }
    };
    /**
     * 散列函数
     */
    var loseloseHashCode = function (key) {
        var hash = 0;
        for (var i = 0; i < key.length; i++) {
            hash += key.charCodeAt(i);
        }
        return hash % 37;
    };
    var djb2HashCode = function (key) {
        var hash = 5381;
        for (var i = 0; i < key.length; i++) {
            hash = hash * 33 + key.charCodeAt(i);
        }
        return hash % 1013;
    };
    var hashCode = function (key) {
        return loseloseHashCode(key);
    };
    /**
     * 向散列表增加一个新的项(也能更新散列表)
     */
    this.put = function(key, value){
        var position = hashCode(key);
        console.log(position + ' - ' + key);
        if (table[position] == undefined) {
            table[position] = new LinkedList();
        }
        table[position].append(new ValuePair(key, value));
    };
    /**
     * 返回根据键值检索到的特定值
     */
    this.get = function(key) {
        var position = hashCode(key);
        if (table[position] !== undefined  && !table[position].isEmpty()){
            //iterate linked list to find key/value
            var current = table[position].getHead();
            do {
                if (current.element.key === key){
                    return current.element.value;
                }
                current = current.next;
            } while(current);
        }
        return undefined;
    };
    /**
     * 根据键值从散列表中移除
     */
    this.remove = function(key){
        var position = hashCode(key);
        if (table[position] !== undefined){
            //iterate linked list to find key/value
            var current = table[position].getHead();
            do {
                if (current.element.key === key){
                    table[position].remove(current.element);
                    if (table[position].isEmpty()){
                        table[position] = undefined;
                    }
                    return true;
                }
                current = current.next;
            } while(current);
        }
        return false;
    };
    /**
     * 打印散列的数据
     */
    this.print = function () {
        for (var i = 0; i < table.length; ++i) {
            if (table[i] !== undefined) {
                console.log(i + ": " + table[i]);
            }
        }
    };
}
// let hastTable=new HashTable();
// hastTable.put('one', 'oneStr');
// hastTable.put('two', 'twoStr');
// hastTable.put('three', 'threeStr');
// hastTable.print();