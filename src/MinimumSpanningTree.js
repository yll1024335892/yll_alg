'use strict';
module.exports=function MinimumSpanningTree(graph) {
    this.graph = graph;
    var INF = Number.MAX_SAFE_INTEGER;
    var minKey = function (key, visited) {
        // Initialize min value
        var min = INF, minIndex;
        for (var v = 0; v < this.graph.length; v++) {
            if (visited[v] == false && key[v] < min) {
                min = key[v];
                minIndex = v;
            }
        }
        return minIndex;
    };
    /**
     * Prim算法是一种求解加权无向连通图的MST问题的贪心算法。它能找出一个边的子集,使得其构成的树包含图中所有顶点,且边的权值之和最小
     */
    this.prim = function () {
        var parent = [],
            key = [],
            visited = [],
            length = this.graph.length,
            i;
        for (i = 0; i < length; i++) {//把所有顶点(key)初始化为无限大,visited[]初始化为false
            key[i] = INF;
            visited[i] = false;
        }
        key[0] = 0;  //选择第一个key作为第一个顶点,同时应为第一个顶点总是MST的根节点
        parent[0] = -1;
        for (i = 0; i < length - 1; i++) {//对所有顶点求MST
            var u = minKey(key, visited);//
            visited[u] = true;//从未处理的顶点集合中选出key值最小的顶点
            for (var v = 0; v < length; v++) {
                //把选出的顶点标为visited,以免重复计算
                if (this.graph[u][v] && visited[v] == false && this.graph[u][v] < key[v]) {
                    parent[v] = u;//保存MST路径
                    key[v] = this.graph[u][v];//更新其权值
                }
            }
        }
        return parent; //处理完所有顶点,返回包含MST的结果
    };
    //防止MST出现环路
    var find = function (i, parent) {
        while (parent[i]) {
            i = parent[i];
        }
        return i;
    };
    var union = function (i, j, parent) {
        if (i != j) {
            parent[j] = i;
            return true;
        }
        return false;
    };
    var initializeCost = function () {
        var cost = [], length = this.graph.length;
        for (var i = 0; i < length; i++) {
            cost[i] = [];
            for (var j = 0; j < length; j++) {
                if (this.graph[i][j] == 0) {
                    cost[i][j] = INF;
                } else {
                    cost[i][j] = this.graph[i][j];
                }
            }
        }
        return cost;
    };
    /**
     * 也是一种求加权无向连通图的MST的贪心算法
     */
    this.kruskal = function () {
        var length = this.graph.length,
            parent = [], cost,
            ne = 0, a, b, u, v, i, j, min;
        cost = initializeCost();//把邻接矩阵的值复制到cost数组,以方便修改且可以保留原始值行
        while (ne < length - 1) {//当MST的边数小于顶点总数减1时
            for (i = 0, min = INF; i < length; i++) {//找出权值最小的边
                for (j = 0; j < length; j++) {
                    if (cost[i][j] < min) {
                        min = cost[i][j];
                        a = u = i;
                        b = v = j;
                    }
                }
            }
            u = find(u, parent);//检查MST中是否已存在这条边,以避免环路
            v = find(v, parent);//检查MST中是否已存在这条边,以避免环路
            if (union(u, v, parent)) {//如果u和v是不同的边,则将其加入MST
                ne++;
            }
            cost[a][b] = cost[b][a] = INF;//从列表中移除这些边,以免重复计算
        }
        return parent;//返回MST
    }
}