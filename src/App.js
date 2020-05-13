import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import Graph from "react-graph-vis";
import { graphData, options } from './constants'
import { Map } from './solver'
import './App.css';

function App() {
	let network = null
	const [graph, setGraph] = useState(graphData)
	const queue = []
 

  function startSolving() {
	//   let edgesCopy = edges
	//   edgesCopy.push({"from": 39, "to": 28, color: "yellow"})
	//   network.setData({ nodes, edges: edgesCopy })
	// console.log(network)
	const map_40 = new Map(graphData.nodes, graphData.edges)

	if(map_40.a_star(8, 24, updateQueue)) {
		const intervalNumber = setInterval(
			() => {
				applyChanges()
				if(queue.length == 0) {
					clearInterval(intervalNumber)
				}
			},
			4000
		)
	}
  }

  function updateQueue(from, to) {
	  queue.push({ from, to, color: 'yellow' })
	//   console.log("QUeue", queue)
  }

  function applyChanges() { 
	  console.log("Apply changes")
	  let edgesCopy = graph.edges
	  edgesCopy.push(queue.shift())
	  network.setData({ nodes: graph.nodes, edges: edgesCopy })
	  //use set interval to upload changes
  }

  return (
	  <div>
		<Graph
		graph={graph}
		options={options}
		// events={events}
		style={{ height: '90vh' }}
		getNetwork={net => {
			network = net
			//  if you want access to vis.js network api you can set the state in a parent component using this property
		}}
		/>
		<button onClick={startSolving}>Start solving</button>
	</div>
  );
}

export default App;
