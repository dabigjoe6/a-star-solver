import React from 'react';
import './styles.css'

export default function Footer() {
	return (
		<div className="footer-container">
			<div className="label-wrapper">
				<div className="graph-label explored" />
				<p className="graph-label-text">Explored paths</p>
			</div>
			<div className="label-wrapper">
				<div className="graph-label shortest" />
				<p className="graph-label-text">Shortest path</p>
			</div>
		</div>
	)
}