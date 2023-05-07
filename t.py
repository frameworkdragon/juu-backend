#User function Template for python3

class Solution:
    def __init__(self):
        self.V = 0
        self.is_visited = []
        self.numSCC = 0
        self.SCC = [0]
    #Function to find number of strongly connected components in the graph.
    def kosaraju(self, V, adj):
        # code here
        self.V = V
        self.is_visited = [False]*V
        self.numSCC = 0
        self.SCC = [0]*V
        
        adj = self.createADJ(adj, V)

        stack = []
        for v in range(V):
            if not self.is_visited[v]:
                self.DFS(0, stack, adj)

        self.is_visited = [False]*V
        while stack:
            v = stack.pop()
            if not self.is_visited[v]:
                self.numSCC += 1
                self.DFS_reverse_graph(v, adj)

        return self.numSCC
        
        
    
    def DFS(self, v, stack, adj):
        if self.is_visited[v]:
            return
        # if not visited yet, mark as visited
        self.is_visited[v] = True
        for j in range(self.V):
            if v!=j and adj[v][j] and not self.is_visited[j]:
                self.DFS(j, stack, adj)
        
        stack.append(v)
    
    def DFS_reverse_graph(self, v, adj):
        if not self.is_visited[v]:
            self.is_visited[v] = True
            for j in range(self.V):
                #  adj[j][v] is reverse edge of adj[v][j]
                if v!=j and adj[j][v] and not self.is_visited[j]:
                    self.DFS_reverse_graph(j, adj)
            
            self.SCC[v] = self.numSCC
            
    def createADJ(self, adj, V, reverse=False):
        res = [[0]*V for i in range(V)]

        for v in range(V):
            for i in adj[v]:
                res[v][i]=1
        
        return res
        
    
        

#{ 
 # Driver Code Starts
#Initial Template for Python 3

from collections import OrderedDict 
import sys 

sys.setrecursionlimit(10**6) 
if __name__ == '__main__':
    t = int(input())
    for i in range(t):
        V,E = list(map(int, input().strip().split()))
        adj = [[] for i in range(V)]
        for i in range(E):
            a,b = map(int,input().strip().split())
            adj[a].append(b)
        ob = Solution()
        
        print(ob.kosaraju(V, adj))
# } Driver Code Ends