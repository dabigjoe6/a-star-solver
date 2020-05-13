import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import Graph from "react-graph-vis";
import { graphData, options } from './constants'
import { Map } from './solver'
import './App.css';

function App() {
	let network = null
	const [graph, setGraph] = useState(graphData)
 

  function addNode() {
	//   let edgesCopy = edges
	//   edgesCopy.push({"from": 39, "to": 28, color: "yellow"})
	//   network.setData({ nodes, edges: edgesCopy })
	
	  console.log(network)
  }

  useEffect(() => {
	    const map_40 = new Map(graphData.nodes, graphData.edges)

		console.log(map_40.a_star(8, 24))
  }, [])

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
		<button onClick={addNode}>Add Node</button>
	</div>
  );
}

export default App;
