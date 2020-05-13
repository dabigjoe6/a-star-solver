import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import Graph from "react-graph-vis";
import { graphData, options } from './constants'
import { SpeedControl, Button } from './components'
import { Map } from './solver'
import './App.css';

function App() {
	let network = null
	const [graph, setGraph] = useState(graphData)
	const queue = []

	const [currentSpeed, setCurrentSpeed] = useState(20)
	const [isSolving, setIsSolving] = useState(false)
 

  function startSolving() {
	  setIsSolving(true)
	const map_40 = new Map(graphData.nodes, graphData.edges)

	if(map_40.a_star(8, 24, updateQueue)) {
		const intervalNumber = setInterval(
			() => {
				applyChanges()
				if(queue.length == 0) {
					clearInterval(intervalNumber)
					setIsSolving(false)
				}
			},
			currentSpeed
		)
	}
  }

  function convertSpeedToMS(speed) {
    const baseSpeed = 20;
    switch (speed) {
      case "0.5x":
        setCurrentSpeed(baseSpeed * 0.5)
      case "1x":
        setCurrentSpeed(baseSpeed)
      case "2x":
        setCurrentSpeed(baseSpeed * 2)
      default:
        setCurrentSpeed(baseSpeed)
    }
  }

  function updateQueue(from, to, color = 'yellow') {
	  queue.push({ from, to, color })
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
		style={{ height: '85vh' }}
		getNetwork={net => {
			network = net
			//  if you want access to vis.js network api you can set the state in a parent component using this property
		}}
		/>
		<SpeedControl onChangeSpeed={convertSpeedToMS} />
		<div className="btn-group">
          <Button
            // disabled={isSolving}
            buttonText={isSolving ? "Restart" : "Randorm Graph"}
            // onClick={resetBoard}
          />
          <Button
            disabled={isSolving}
            buttonText="Solve Graph In Steps"
            onClick={startSolving}
          />
          <Button
            disabled={isSolving}
            buttonText="Solve Graph Instantly"
            // onClick={startsInstantSolve}
          />
        </div>
	</div>
  );
}

export default App;
