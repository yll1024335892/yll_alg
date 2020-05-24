'use strict';
module.exports = function ShortestPath(graph) {
    //传递一个graph的值
    this.graph = graph;
    //number的最大值
    var INF = Number.MAX_SAFE_INTEGER;
    //计算顶点间的minDistance,就要搜索dist数组中的最小值,返回它在数组中的索引
    var minDistance = function (dist, visited) {
        var min = INF,
            minIndex = -1;
        for (var v = 0; v < dist.length; v++) {
            if (visited[v] == false && dist[v] <= min) {
                min = dist[v];
                minIndex = v;
            }
        }
        return minIndex;
    };
    /**
     * 贪心算法
     */
    this.dijkstra = function (src) {
        var dist = [],
            visited = [],
            length = this.graph.length;
        for (var i = 0; i < length; i++) {//把所有的距离(dist)初始化为无限大,将visited[]初始为false
            dist[i] = INF;
            visited[i] = false;
        }
        dist[src] = 0;//把源顶点到自己的距离设为0
        for (var i = 0; i < length - 1; i++) {//找出到其余顶点中选出距离最近的顶点
            var u = minDistance(dist, visited);//需要从尚未处理的顶点中选出距离最近的顶点
            visited[u] = true;//把选出的顶点标为visited以免重复计算
            for (var v = 0; v < length; v++) {
                //如果找到更短的路径，则更新最短路径的值
                if (!visited[v] && this.graph[u][v] != 0 && dist[u] != INF && dist[u] + this.graph[u][v] < dist[v]) {
                    dist[v] = dist[u] + this.graph[u][v];
                }
            }
        }
        return dist;// 处理完所有顶点后,返回从源顶点(src)到图中其他顶点最短路径的结果
    };
    /**
     * 动态规划算法
     * INF代表顶点i到j的最短路径不存在
     */
    this.floydWarshall = function () {
        var dist = [],
            length = this.graph.length,
            i, j, k;
        for (i = 0; i < length; i++) {//把dist数组初始化为每个顶点之间的权值,因为i到j可嫩最短距离就是这些顶点间的权值
            dist[i] = [];
            for (j = 0; j < length; j++) {
                dist[i][j] = this.graph[i][j];
            }
        }
        for (k = 0; k < length; k++) {//通过k,得到i途径顶点0至k,到达j的最短路径
            for (i = 0; i < length; i++) {
                for (j = 0; j < length; j++) {
                    //判断i经过顶点k到达j的路径是否比已有的最短路径更短
                    if (dist[i][k] + dist[k][j] < dist[i][j]) {
                        dist[i][j] = dist[i][k] + dist[k][j]; //如果式更短的路径,则更新更短路径的值
                    }
                }
            }
        }
        return dist;
    }
}