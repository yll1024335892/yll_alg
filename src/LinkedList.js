'use strict';
module.exports=function LinkedList() {
    //node节点
    let Node = function(element){
        this.element = element;  //需要添加的数据
        this.next = null; //指向下一个节点项的指针
    };
    let length = 0; //存储列表项的数量
    let head = null; //第一个节点的英勇
    //向列表尾部添加一个新项
    this.append = function(element){
        let node = new Node(element); //创建节点
        let current;
        if (head === null){ //列表中第一个节点
            head = node;
        } else {
            current = head;
            //循环列表，直到找到最后一项
            while(current.next){
                current = current.next;
            }
           //找到最后一项，将其next赋为node，建立链接
            current.next = node;
        }
        length++; //更新列表长度
    };
    //向列表的特定位置插入一个新的项
    this.insert = function(position, element){
        //检查越界值
        if (position >= 0 && position <= length){
            let node = new Node(element),
                current = head,
                previous,
                index = 0;
            if (position === 0){ //在第一个位置添加
                node.next = current;
                head = node;
            } else {
                while (index++ < position){
                    previous = current;
                    current = current.next;
                }
                node.next = current;
                previous.next = node;
            }
            length++; //更新链表长度
            return true;
        } else {
            return false;
        }
    };
    //从列表的特定位置移除一项
    this.removeAt = function(position){
        //检查越界值
        if (position > -1 && position < length){//检查是不是有效位置
            let current = head;
            let previous;
            let index = 0;
            //移除第一项
            if (position === 0){
                head = current.next;
            } else {
                while (index++ < position){
                    previous = current;
                    current = current.next;
                }
                //将previous与current的下一项链接起来，跳过current，从而移除它
                previous.next = current.next;
            }
            length--;
            return current.element;
        } else {
            return null;
        }
    };
    //从列表中移除一项
    this.remove = function(element){
        let index = this.indexOf(element);
        return this.removeAt(index);
    };
    //返回元素在列表中的索引。如果列表中没有该元素则返回-1
    this.indexOf = function(element){
        let current = head,
            index = 0;
        while (current) {
            if (element === current.element) {
                return index;
            }
            index++;
            current = current.next;
        }
        return -1;
    };
    //如不链表中不包含任何元素，返回true，如果链表长度大于0则返回false
    this.isEmpty = function() {
        return length === 0;
    };
    //返回链表包含的元素个数
    this.size = function() {
        return length;
    };
    //获取头节点
    this.getHead = function(){
        return head;
    };
    //只输出元素的值
    this.toString = function(){
        let current = head,
            string = '';
        while (current) {
            string += current.element + (current.next ? ', ' : '');
            current = current.next;
        }
        return string;
    };
    this.print = function(){
        console.log(this.toString());
    };
}
