'use strict';
module.exports=function Stack() {
    let items = [];
    //添加一个(或几个)新元素到栈顶
    this.push = function(element){
        items.push(element);
    };
    //移除栈顶的元素，同时返回被移除的元素
    this.pop = function(){
        return items.pop();
    };
    //返回栈顶的元素，不对栈做任何修改(这个方法不会移除栈顶的元素，仅仅返回它)
    this.peek = function(){
        return items[items.length-1];
    };
    //如果栈里没有任何元素就返回true，否则返回false
    this.isEmpty = function(){
        return items.length == 0;
    };
    //返回栈里的所有元素
    this.size = function(){
        return items.length;
    };
    //移除栈里的所有元素
    this.clear = function(){
        items = [];
    };
    //输出栈里面的数据
    this.print = function(){
        console.log(items.toString());
    };
    this.toString = function(){
        return items.toString();
    };
}
// let stack=new Stack();
// stack.push("One");
// stack.push("two");
// stack.print();  //One,two
// stack.pop();
// stack.print(); //One