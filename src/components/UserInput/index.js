import React from 'react';

export default function UserInput({ startNode, endNode, setStartNode, setEndNode }) {
	return (
		<div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
		<div style={{ display: 'flex', alignSelf: 'center', justifyContent: 'space-around', alignItems: 'center', maxWidth: '50vw' }}>
			<div style={{ margin: 10, display: 'flex', alignItems: 'center' }}>
				<p style={{ marginRight: 10 }}>Start Node: </p>
				<input type="text" value={startNode} onChange={(value) => setStartNode(Number(value))} />
			</div>
			<div style={{ margin: 10, display: 'flex', alignItems: 'center' }}>
				<p style={{ marginRight: 10 }}>Goal Node: </p>
				<input type="text" value={endNode} onChange={(value) => setEndNode(Number(value))} />
			</div>
		</div>
		</div>
	)
} 