import React from 'react';
import * as _ from 'underscore';
import { ResponsiveOrdinalFrame } from 'semiotic';
import { AnnotationLabel } from 'react-annotation';
import { format } from 'd3-format';
import { max } from 'd3-array';
import { defaultProps } from 'recompose';
import { LegendOrdinal } from '@vx/legend';

// import Legend from './Legend';

import '../styles/Chart.css';

var wrap = require('word-wrap');

const tspans = (str, thresh) => (
	str.length <= thresh || str.indexOf(' ') === -1 ?
	str:
	wrap(str, { width: thresh, newline: '!' }).split('!').map((d, i) => <tspan key={i} x={0} dy={i === 0 ? '0' : '1em'}>{d}</tspan>)
);

const withDefaults = defaultProps({
	margin: { top: 16, right: 20, bottom: 40, left: 48 },
	// size: [ 400, 480 ],
	oAccessor: 'x',
	rAccessor: 'value',
	bartype: 'bar',
	oPadding: 10,
	format: '.0%',
	ticks: 4,
	direction: 'vertical',
	hasLegend: false,
	hasWidth: false,
	scheme: 'race',
	thresh: 20
});

const Chart = (props) => {
	let data = props.data;
	let isVert = props.direction === 'vertical';
	let orient = isVert ? 'left' : 'bottom';
	let axis = {
		// orient: orient,
		tickFormat: (d) => format(props.format)(d),
		ticks: props.ticks,
		tickValues: props.tickValues || null
	};

	console.log(data);
	let notes = data.map((d) => ({
		type: AnnotationLabel,
		x: d.x,
		value: d.value,
		// group: d.group,
		dx: (isVert ? 0 : 0.25),
		dy: (isVert ? -0.25 : 0.25),
		disable: ['connector'],
		note: {
			title: format(props.format)(d.value) ,
			orientation: (isVert ? 'topBottom' : 'leftRight'),
			// align: (isVert ? 'left' : 'bottom')
			// padding: (isVert ? -2 : 2)
		},
		color: 'black'
	}));

	return (
		<div className="Chart" key="chart">
			<ResponsiveOrdinalFrame
				size={props.size}
				data={data}
				oAccessor={props.oAccessor}
				rAccessor={props.rAccessor}
				// type={props.bartype}
				// type={labelBar}
				responsiveWidth={true}
				rExtent={ props.rExtent || [ 0, max(data, d => d.value) ] }
				dynamicColumnWidth={props.hasWidth ? 'width' : null}
				style={(d) => ({
					fill: props.color(d.group)
				})}
				oPadding={props.oPadding}
				projection={props.direction}
				oLabel={(d) => <text style={{ textAnchor: props.direction === 'vertical' ? 'middle' : 'end' }}>{tspans(d, props.thresh)}</text>}
				margin={props.margin}
				// axis={axis}
				// annotations={notes}
				// svgAnnotationRules={labeller}
				// pieceHoverAnnotation={true}
				pieceIDAccessor={(d) => d.x + ' ' + d.group}
			/>
			<div className="Legend">
				{ props.hasLegend ?
					<LegendOrdinal
						scale={props.color.domain(_.pluck(props.data, 'group'))}
						itemDirection="row"
						direction="row"
						labelMargin="0 1em 0 0.2em"
						shapeMargin="2px 0 0"
					/> : null
				}
			</div>
		</div>
	);
};

export default withDefaults(Chart);

const labelBar = ({ data, oScale, rScale }) => {
	const renderedPieces = [];
	const keys = Object.keys(data);

	keys.forEach((key) => {
		const column = data[key];
		const d = column.pieceData[0];
		const marks = (
			<g key={`piece-${d.renderKey}`}>
				<rect
					x={d.x}
					y={d.scaledValue}
					width={column.width}
					height={d.scaledVerticalValue}
				/>
			</g>
		);
		// const marks = column.pieceData.map((d) => {
			// console.log(d);
			// return (
			// 	<g key={`piece-${d.renderKey}`}>
			// 		<rect
			// 			x={d.x}
			// 			y={d.scaledValue}
			// 			width={column.width}
			// 			height={d.scaledVerticalValue}
			// 		/>
			// 	</g>
			// );
		// });

		// const mark = (
		// 	<g key={`piece-${key}`}>
		// 		<rect
		// 			width={column.width}
		// 			height={100}
		// 			x={column.x}
		// 			y={column.y}
		// 		/>
		// 	</g>
		// );

		renderedPieces.push(marks);
	});

	return renderedPieces;
};

const labeller = ({ d, i, oScale, rScale, screenCoordinates }) => {
	console.log(screenCoordinates);
	// return { x: d.x, y: d.value, type: 'or', label: d.value };
	return (
		<text key={i} x={screenCoordinates[0]} y={screenCoordinates[1]}>{d.note.title}</text>

	);
};
