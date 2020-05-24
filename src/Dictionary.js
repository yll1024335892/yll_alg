'use strict';
module.exports=function Dictionary(){
    var items = {};
    /**
     * 向字典中添加新元素
     */
    this.set = function(key, value){
        items[key] = value; 
    };
    /**
     * 通过使用键值来从字典中移除键值对应的数据值
     */
    this.delete = function(key){
        if (this.has(key)){
            delete items[key];
            return true;
        }
        return false;
    };
    /**
     * 如果某个键值存在于这个字典中,则返回true,反之返回false
     */
    this.has = function(key){
        return items.hasOwnProperty(key);
        //return value in items;
    };
    /**
     * 通过键值查找特定的数值并返回
     */
    this.get = function(key) {
        return this.has(key) ? items[key] : undefined;
    };
    /**
     * 将这个字典中的所有元素全部删除
     */
    this.clear = function(){
        items = {};
    };
    /**
     * 返回字典所包含元素的数量。与数组的length属性类似
     */
    this.size = function(){
        return Object.keys(items).length;
    };
    /**
     * 将字典所包含的所有键名以数组形式返回
     */
    this.keys = function(){
        return Object.keys(items);
    };
    /**
     * 将字典所包含的所有数值以数组形式返回
     */
    this.values = function(){
        var values = [];
        for (var k in items) {
            if (this.has(k)) {
                values.push(items[k]);
            }
        }
        return values;
    };
    this.each = function(fn) {
        for (var k in items) {
            if (this.has(k)) {
                fn(k, items[k]);
            }
        }
    };
    /**
     * 获取整个字典
     */
    this.getItems = function(){
        return items;
    }
}