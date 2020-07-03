import Queue from "tinyqueue";

export class Map {
  constructor(intersections, roads) {
    this.intersections = {}; // {node: [x, y]}
    this.roads = []; //adjacency list of edges

    intersections.forEach((intersection, index) => {
      this.intersections[index] = [intersection["x"], intersection["y"]];
    });

    roads.forEach((road, index) => {
      //map every edge to its adjacent edge
      if (this.roads[road["from"]]) {
        this.roads[road["from"]] = [...this.roads[road["from"]], road["to"]];
      } else {
        this.roads[road["from"]] = [road["to"]];
      }
    });
  }

  //helper method to calc straight line distance between two points
  calcDistance(intersection1, intersection2) {
    let x2_x1 = Math.pow(intersection2[0] - intersection1[0], 2);
    let y2_y1 = Math.pow(intersection2[1] - intersection1[1], 2);
    return Math.sqrt(x2_x1 + y2_y1);
  }

  getPath(explored, stop, cb) {
    //return path tracing from goal node to start node using the 'origin' param
    let result = []; //[start, ...., stop]

    //recursive function
    function getPathFunc(explored, stop, array = []) {
      if (stop != null) {
        // Highlight path between origin node and destination node for recursive step
        cb(explored[stop]["origin"], explored[stop]["intersection"], "red");

        // Calls getPathFunc() with the node just before the current goal node
        // This happens for every recursive call till the start node

        getPathFunc(explored, explored[stop]["origin"], array);
        array.push(stop);
      }
    }

    getPathFunc(explored, stop, result);

    return result;
  }

  a_star(start, goal, cb) {
    if (!(start in this.intersections)) {
      return "Start not found";
    }

    if (!(goal in this.intersections)) {
      return "Goal not found";
    }

		// frontier contains nodes we've seen but haven't explored yet
    let frontier = new Queue([
      {
        intersection: start,
        weight: 0,
        origin: null,
        acc_dist: 0,
      },
    ]); //priority queue

		// explored nodes are nodes with the smallest accumulated 
		// distance from the start point in the fronter priority queue
    let explored = {};

    while (frontier.length) {
      //get the intersection with the least accumulated distance from start node
      let current_intersection_dict = frontier.pop();
      let current_intersection = current_intersection_dict["intersection"];

			//current node had been previously explored
      if (current_intersection in explored) {
        if (
          current_intersection_dict["weight"] <
          explored[current_intersection]["weight"]
        ) {
          explored[current_intersection] = current_intersection_dict;
          cb(
            current_intersection_dict["origin"],
            current_intersection_dict["intersection"]
          ); // highlight this explored path on the graph
        }
      } else {
        explored[current_intersection] = current_intersection_dict;
        cb(
          current_intersection_dict["origin"],
          current_intersection_dict["intersection"]
        );  // highlight this explored path on the graph
      }

      for (let road of this.roads[current_intersection]) {
        if (!(road in explored)) {
          let dist_from_goal = this.calcDistance(
            this.intersections[road],
            this.intersections[goal]
          );

          let dist_from_intersection =
            this.calcDistance(
              this.intersections[current_intersection],
              this.intersections[road]
            ) + current_intersection_dict["acc_dist"];

          let total_weight = dist_from_intersection + dist_from_goal;

          frontier.push({
            intersection: road,
            weight: total_weight,
            acc_dist: dist_from_intersection,
            origin: current_intersection,
          });
        }
      }
    }
    return this.getPath(explored, goal, cb);
  }
}
