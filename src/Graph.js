const Dictionary = require('./Dictionary');
const Queue = require('./Queue');
module.exports=function Graph() {
    var vertices = []; //存储顶点的名字
    var adjList = new Dictionary(); //存储相邻链表,以顶点的名字作为键,邻接点列表作为值
    /**
     * 用来向图中添加一个新的顶点
     */
    this.addVertex = function(v){
        vertices.push(v); //将顶点添加到列表中
        adjList.set(v, []); //设置顶点v作为键对应的字典值为一个空数组
    };
    /**
     * 添加顶点之间的边
     */
    this.addEdge = function(v, w){
        adjList.get(v).push(w); //有向图
        adjList.get(w).push(v); //无向图
    };
    this.toString = function(){
        var s = '';
        for (var i=0; i<vertices.length; i++){ //迭代vertices数组列表,
            s += vertices[i] + ' -> ';
            var neighbors = adjList.get(vertices[i]); //取得该顶点的领链表
            for (var j=0; j<neighbors.length; j++){ //迭代该领链表，将相邻顶点加入我们的字符串
                s += neighbors[j] + ' ';
            }
            s += '\n';  //添加一个换行符
        }
        return s;
    };
    /**
     * 初始化所有顶点颜色都是白色
     * 白色white:表示该顶点还没有被访问
     * 灰色grey:表示该顶点被访问过，但并未被探索过
     * 黑色black:表示该顶点被访问过且被完全探索过
     */
    var initializeColor = function(){
        var color = {};
        for (var i=0; i<vertices.length; i++){
            color[vertices[i]] = 'white';
        }
        return color;
    };
    /**
     * 广度优先搜索(队列)
     */
    this.bfs = function(v, callback){
        //初始化颜色和队列
        var color = initializeColor(),
            queue = new Queue();
        queue.enqueue(v);
        while (!queue.isEmpty()){ //队列非空
            var u = queue.dequeue(), //移除一个顶点
                neighbors = adjList.get(u);//获取一个包含其所有邻点的
            color[u] = 'grey'; //顶点被标注为grey,发现了它但还未完成对其的探索
            for (var i=0; i<neighbors.length; i++){//对于u的每个邻点
                var w = neighbors[i]; //该顶点的名字
                if (color[w] === 'white'){ //如果未被访问过,颜色为white
                    color[w] = 'grey'; //标注已经发现了它(颜色设置为grey)
                    queue.enqueue(w);//将这个顶点加入到队列中
                }
            }
            color[u] = 'black'; //完成探索该顶点和其相邻顶点后,我们将该顶点标注为已探索过的。颜色设置为black
            if (callback) {
                callback(u);
            }
        }
    };
    /**
     * 深度优先算法
     */
    this.dfs = function(callback){
        var color = initializeColor();
        for (var i=0; i<vertices.length; i++){
            if (color[vertices[i]] === 'white'){
                dfsVisit(vertices[i], color, callback);
            }
        }
    };
    var dfsVisit = function(u, color, callback){
        color[u] = 'grey';
        if (callback) {
            callback(u);
        }
        console.log('Discovered ' + u);
        var neighbors = adjList.get(u);
        for (var i=0; i<neighbors.length; i++){
            var w = neighbors[i];
            if (color[w] === 'white'){
                dfsVisit(w, color, callback);
            }
        }
        color[u] = 'black';
        console.log('explored ' + u);
    };
    /**
     * 寻找最短路径
     */
    this.BFS = function(v){
        var color = initializeColor(),
            queue = new Queue(),
            d = {}, //距离
            pred = {}; //前溯点
        queue.enqueue(v);
        for (var i=0; i<vertices.length; i++){
            d[vertices[i]] = 0;
            pred[vertices[i]] = null;
        }
        while (!queue.isEmpty()){
            var u = queue.dequeue(),
                neighbors = adjList.get(u);
            color[u] = 'grey';
            for (i=0; i<neighbors.length; i++){
                var w = neighbors[i];
                if (color[w] === 'white'){
                    color[w] = 'grey';
                    d[w] = d[u] + 1;
                    pred[w] = u;
                    queue.enqueue(w);
                }
            }
            color[u] = 'black';
        }
        return {
            distances: d,
            predecessors: pred
        };
    };
    var time = 0;
    this.DFS = function(){
        var color = initializeColor(),
            d = {},
            f = {},
            p = {};
        time = 0;
        for (var i=0; i<vertices.length; i++){
            f[vertices[i]] = 0;
            d[vertices[i]] = 0;
            p[vertices[i]] = null;
        }
        for (i=0; i<vertices.length; i++){
            if (color[vertices[i]] === 'white'){
                DFSVisit(vertices[i], color, d, f, p);
            }
        }
        return {
            discovery: d,
            finished: f,
            predecessors: p
        };
    };
    var DFSVisit = function(u, color, d, f, p){
        console.log('discovered ' + u);
        color[u] = 'grey';
        d[u] = ++time;
        var neighbors = adjList.get(u);
        for (var i=0; i<neighbors.length; i++){
            var w = neighbors[i];
            if (color[w] === 'white'){
                p[w] = u;
                DFSVisit(w,color, d, f, p);
            }
        }
        color[u] = 'black';
        f[u] = ++time;
        console.log('explored ' + u);
    };
}
// let graph=new Graph();
// let myVertices=['A','B','C','D','E','F','G','H','I'];
// for(var i=0;i<myVertices.length;i++){
//     graph.addVertex(myVertices[i]);
// }
// graph.addEdge('A','B');
// graph.addEdge('A','C');
// graph.addEdge('A','D');
// graph.addEdge('C','D');
// graph.addEdge('C','G');
// graph.addEdge('D','G');
// graph.addEdge('D','H');
// graph.addEdge('B','E');
// graph.addEdge('B','F');
// graph.addEdge('E','I');
// console.log(graph.toString());
// //广度优先
// graph.bfs(myVertices[0],function(value){
//     console.log("visited vertex:",value);
// });
// //广度优先最短距离
// let shortestPathA=graph.BFS(myVertices[0]);
// console.log("最短距离的值:",shortestPathA);