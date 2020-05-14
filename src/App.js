import React, { useEffect, useState } from 'react';
import useInterval from './useInterval'
import logo from './logo.svg';
import Graph from "react-graph-vis";
import { graphData, options, defaultData } from './constants'
import { SpeedControl, Button, UserInput } from './components'
import { Map } from './solver'
import './App.css';

const initialData = graphData
const originalData = defaultData

function App() {
	const [network, setNetwork] = useState(null)
	const [graph, setGraph] = useState(initialData)
	const [queue, setQueue] = useState([]) 

	const [currentSpeed, setCurrentSpeed] = useState(20)
	const [isSolving, setIsSolving] = useState(false)
	const [isInstantSolving, setIsInstantSolving] = useState(false)

	const [startNode, setStartNode] = useState(8)
	const [endNode, setEndNode] = useState(24)
 

	useInterval(() => {
		// Your custom logic here
			applyChanges()
		
  		}, (isSolving && queue.length > 0) ? currentSpeed : null);

  function startSolving(stop = false) {
		const map_40 = new Map(graphData.nodes, graphData.edges)

	if(map_40.a_star(startNode, endNode, updateQueue) && queue.length > 0) {
			setIsSolving(true)
	}
  }

  function startInstantSolve() {
		const map_40 = new Map(graphData.nodes, graphData.edges)

		if(map_40.a_star(startNode, endNode, updateQueue) && queue.length > 0) {
			setIsInstantSolving(true)
			  let queueCopy = queue
		  let edgesCopy = graph.edges
		edgesCopy = [ ...edgesCopy, ...queueCopy ]
		
		network.setData({ nodes: graph.nodes, edges: edgesCopy })
		}

  }

  function convertSpeedToMS(speed) {
    const baseSpeed = 20;
    switch (speed) {
      case "0.5x":
        setCurrentSpeed(baseSpeed * 0.5)
		break;
      case "1x":
        setCurrentSpeed(baseSpeed)
		break;
      case "2x":
        setCurrentSpeed(baseSpeed * 2)
		break;
      default:
        setCurrentSpeed(baseSpeed)
		break;
    }
  }

  function updateQueue(from, to, color = 'yellow') {
	  let queueCopy = queue
	  queueCopy.push({ from, to, color })
	  setQueue(queueCopy)
  }

  function applyChanges() { 
	  if(queue.length > 0) {
		  let queueCopy = queue
		  let edgesCopy = graph.edges
		edgesCopy.push(queueCopy.shift())
		setQueue(queueCopy)
		if(queue.length == 0) {
			// setIsSolving(false)
		}
		network.setData({ nodes: graph.nodes, edges: edgesCopy })
	  }
	  
	  //use set interval to upload changes
  }

  function resetBoard() {
	  if(isSolving || isInstantSolving) {
		  setIsSolving(false)
		  setIsInstantSolving(false)
		  let queueCopy = queue
		  queueCopy.length = 0
		  setQueue(queueCopy)

		  network.setData({ nodes: [], edges: [] })

		network.setData({ nodes: originalData.nodes, edges: originalData.edges })

		let graphDataCopy = graph

		graphDataCopy.edges.forEach((edge, index) => {
			if(edge.hasOwnProperty('color')) {
				edge['color'] = 'black'
			}
		})
	  }
  }

  useEffect(() => {
	  console.log(startNode)
  }, [startNode])

  useEffect(() => {
	  console.log(endNode)
  }, [endNode])

  return (
	  <div>
		<Graph
		graph={graph}
		options={options}
		// events={events}
		style={{ height: '75vh' }}
		getNetwork={net => {
			setNetwork(net)
			//  if you want access to vis.js network api you can set the state in a parent component using this property
		}}
		/>
		<SpeedControl onChangeSpeed={convertSpeedToMS} />
		<UserInput startNode={startNode} endNode={endNode} setStartNode={setStartNode} setEndNode={setEndNode} />
		<div className="btn-group">
          <Button
            disabled={(isSolving || isInstantSolving) ? false : true}
            buttonText={"Reset"}
            onClick={resetBoard}
          />
          <Button
            disabled={(isSolving || isInstantSolving)}
            buttonText="Solve Graph In Steps"
            onClick={startSolving}
          />
          <Button
            disabled={(isSolving || isInstantSolving)}
            buttonText="Solve Graph Instantly"
            onClick={startInstantSolve}
          />
        </div>
	</div>
  );
}

export default App;
