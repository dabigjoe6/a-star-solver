import React from 'react';
import './styles.css'
export default function UserInput({ startNode, endNode, setStartNode, setEndNode }) {
	return (
		<div className="user-input-container">
			<div className="user-input-wrapper">
				<div className="user-text-input"  >
					<p className="user-input-label">Start Node: </p>
					<input type="text" value={startNode} onChange={(event) => setStartNode(event.target.value)} />
				</div>
				<div className="user-text-input" >
					<p className="user-input-label">Goal Node: </p>
					<input type="text" value={endNode} onChange={(event) => setEndNode(event.target.value)} />
				</div>
			</div>
		</div>
	)
} 