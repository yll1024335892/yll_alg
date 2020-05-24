'use strict';
module.exports=function Queue() {
    let items = [];
    //向队列尾部添加一个(或多个)新的项
    this.enqueue = function(element){
        items.push(element);
    };
    //移除队列的第一个(即排在队列最前面的)项,并返回被移除的元素
    this.dequeue = function(){
        return items.shift();
    };
    //返回队列中第一个元素-最先被添加
    this.front = function(){
        return items[0];
    };
    //队列中不包含任何元素，返回true,否则返回false
    this.isEmpty = function(){
        return items.length == 0;
    };
    //清除队列中的数据
    this.clear = function(){
        items = [];
    };
    //返回队列包含的元素个数,与数组的length属性类似
    this.size = function(){
        return items.length;
    };
    //输出队列中所有元素
    this.print = function(){
        console.log(items.toString());
    };
}
