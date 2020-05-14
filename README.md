# A* search algorithm solver (visualizer)

###### You can check out a live version of this project on https://a-star-search.netlify.app/

### About

This project attempts to provide a way to visualize the way a graph traversal and path search algorithm to find the shortest path between two nodes in a graph.

At each iteration of its main loop, A* needs to determine which of its paths to extend. It does so based on the cost of the path and an estimate of the cost required to extend the path all the way to the goal. Specifically, A* selects the path that minimizes

{\displaystyle f(n)=g(n)+h(n)}f(n)=g(n)+h(n)

where n is the next node on the path, g(n) is the cost of the path from the start node to n, and h(n) is a heuristic function that estimates the cost of the cheapest path from n to the goal. A* terminates when the path it chooses to extend is a path from start to goal or if there are no paths eligible to be extended. The heuristic function is problem-specific. If the heuristic function is admissible, meaning that it never overestimates the actual cost to get to the goal, A* is guaranteed to return a least-cost path from start to goal.


### Installation
`
Clone the repository, Install dependencies and Start the application

```sh
git clone https://github.com/dabigjoe6/a-star-solver.git
cd a-star-solver
npm install
npm run start
```


# 🧾 License - MIT License
Copyright (c) 2020 a-star-solver - Released under the <a href="https://github.com/dabigjoe6/a-star-solver/blob/master/LICENSE.txt">MIT license.</a>
