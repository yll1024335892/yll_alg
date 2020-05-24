'use strict';
/**
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
 */
module.exports=function Set() {
    let items = {};
    //向集合添加一个新的项
    this.add = function(value){
        if (!this.has(value)){
            items[value] = value;
            return true;
        }
        return false;
    };
    //从集合移除一个值
    this.delete = function(value){
        if (this.has(value)){
            delete items[value];
            return true;
        }
        return false;
    };
    //如果值在集合中，返回true,否则返回false
    this.has = function(value){
        return items.hasOwnProperty(value);
    };
    //移除集合中所有项
    this.clear = function(){
        items = {};
    };
    //es5以上的内建函数返回集合中有多少项
    this.size = function(){
        return Object.keys(items).length;
    };
    //在任何浏览器都可以返回集合中有多少项
    this.sizeLegacy = function(){
        let count = 0;
        for(let key in items) {
            if(items.hasOwnProperty(key))
                ++count;
        }
        return count;
    };
    //获取items对象的所有属性,在IE9+, FF4+, Chrome5+, Opera12+, Safari5+上运行
    this.values = function(){
        let values = [];
        for (let i=0, keys=Object.keys(items); i<keys.length; i++) {
            values.push(items[keys[i]]);
        }
        return values;
    };
    //获取items对象的所有属性,在所有浏览器上运行
    this.valuesLegacy = function(){
        let values = [];
        for(let key in items) {
            if(items.hasOwnProperty(key)) {
                values.push(items[key]);
            }
        }
        return values;
    };
    /**
     * 获取整个集合
     */
    this.getItems = function(){
      return items;
    };
    /**
     * 并集 setA.union(setB)
     */
    this.union = function(otherSet){
        let unionSet = new Set(); 
        let values = this.values(); 
        for (let i=0; i<values.length; i++){
            unionSet.add(values[i]);
        }
        values = otherSet.values(); 
        for (let i=0; i<values.length; i++){
            unionSet.add(values[i]);
        }
        return unionSet;
    };
    /**
     * 交集
     */
    this.intersection = function(otherSet){
        let intersectionSet = new Set(); 
        let values = this.values();
        for (let i=0; i<values.length; i++){ 
            if (otherSet.has(values[i])){    
                intersectionSet.add(values[i]); 
            }
        }
        return intersectionSet;
    };
    /**
     * 差集
     */
    this.difference = function(otherSet){
        let differenceSet = new Set(); 
        let values = this.values();
        for (let i=0; i<values.length; i++){ 
            if (!otherSet.has(values[i])){    
                differenceSet.add(values[i]); 
            }
        }
        return differenceSet;
    };
    /**
     * 判断是否是子集
     */
    this.subset = function(otherSet){
        if (this.size() > otherSet.size()){ 
            return false;
        } else {
            let values = this.values();
            for (let i=0; i<values.length; i++){ 
                if (!otherSet.has(values[i])){    
                    return false; 
                }
            }
            return true;
        }
    };
}
// let setA=new Set();
// setA.add("one");
// setA.add("1");
// console.log(setA.getItems());