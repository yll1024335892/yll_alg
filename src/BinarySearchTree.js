'use strict';
module.exports=function BinarySearchTree() {
    /**
     * 定义节点类
     * @param {*} key 
     */
    var Node = function(key){
        this.key = key;
        this.left = null;
        this.right = null;
    };
    var root = null; //定义根节点
    /**
     * 向数种插入一个新的键
     */
    this.insert = function(key){
        var newNode = new Node(key); //创建新节点
        if (root === null){ //特殊根节点
            root = newNode;
        } else {
            insertNode(root,newNode);
        }
    };
    /**
     * 将节点插入非根节点的其他位置
     * @param {*} node 
     * @param {*} newNode 
     */
    var insertNode = function(node, newNode){
        if (newNode.key < node.key){
            if (node.left === null){
                node.left = newNode;
            } else {
                insertNode(node.left, newNode);
            }
        } else {
            if (node.right === null){
                node.right = newNode;
            } else {
                insertNode(node.right, newNode);
            }
        }
    };
    /**
     * 获取根节点
     */
    this.getRoot = function(){
        return root;
    };
    /**
     * 在数中查找一个键(key)，如果节点存在返回true,否则返回false
     */
    this.search = function(key){
        return searchNode(root, key);
    };
    var searchNode = function(node, key){
        if (node === null){
            return false;
        }
        if (key < node.key){
            return searchNode(node.left, key);
        } else if (key > node.key){
            return searchNode(node.right, key);
        } else { //element is equal to node.item
            return true;
        }
    };
    /**
     * 通过中序遍历方式遍历所有节点
     */
    this.inOrderTraverse = function(callback){
        inOrderTraverseNode(root, callback);
    };
    var inOrderTraverseNode = function (node, callback) {
        if (node !== null) {
            inOrderTraverseNode(node.left, callback);
            callback(node.key);
            inOrderTraverseNode(node.right, callback);
        }
    };
    /**
     * 通过先序遍历方式遍历所有节点
     */
    this.preOrderTraverse = function(callback){
        preOrderTraverseNode(root, callback);
    };
    var preOrderTraverseNode = function (node, callback) {
        if (node !== null) {
            callback(node.key);
            preOrderTraverseNode(node.left, callback);
            preOrderTraverseNode(node.right, callback);
        }
    };
    /**
     * 通过后序遍历方式遍历所有节点
     */
    this.postOrderTraverse = function(callback){
        postOrderTraverseNode(root, callback);
    };
    var postOrderTraverseNode = function (node, callback) {
        if (node !== null) {
            postOrderTraverseNode(node.left, callback);
            postOrderTraverseNode(node.right, callback);
            callback(node.key);
        }
    };
    /**
     * 返回树种最小的值(键)
     */
    this.min = function() {
        return minNode(root);
    };
    var minNode = function (node) {
        if (node){
            while (node && node.left !== null) {
                node = node.left;
            }
            return node.key;
        }
        return null;
    };
    /**
     * 返回树中最大值(键)
     */
    this.max = function() {
        return maxNode(root);
    };
    var maxNode = function (node) {
        if (node){
            while (node && node.right !== null) {
                node = node.right;
            }
            return node.key;
        }
        return null;
    };
    /**
     * 从树种移除某个键
     */
    this.remove = function(element){
        root = removeNode(root, element);
    };
    var findMinNode = function(node){
        while (node && node.left !== null) {
            node = node.left;
        }
        return node;
    };
    var removeNode = function(node, element){
        if (node === null){
            return null;
        }
        if (element < node.key){
            node.left = removeNode(node.left, element);
            return node;
        } else if (element > node.key){
            node.right = removeNode(node.right, element);
            return node;
        } else { //element is equal to node.item
            //handle 3 special conditions
            //1 - a leaf node
            //2 - a node with only 1 child
            //3 - a node with 2 children
            //case 1
            if (node.left === null && node.right === null){
                node = null;
                return node;
            }
            //case 2
            if (node.left === null){
                node = node.right;
                return node;
            } else if (node.right === null){
                node = node.left;
                return node;
            }
            //case 3
            var aux = findMinNode(node.right);
            node.key = aux.key;
            node.right = removeNode(node.right, aux.key);
            return node;
        }
    };
}