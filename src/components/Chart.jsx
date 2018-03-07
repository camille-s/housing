import React from 'react';
import * as _ from 'underscore';
import { ResponsiveOrdinalFrame } from 'semiotic';
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
	let orient = props.direction === 'horizontal' ? 'bottom' : 'left';
	let axis = {
		// orient: orient,
		tickFormat: (d) => format(props.format)(d),
		ticks: props.ticks,
		tickValues: props.tickValues || null
	};

	return (
		<div className="Chart" key="chart">
			<ResponsiveOrdinalFrame
				size={props.size}
				data={data}
				oAccessor={props.oAccessor}
				rAccessor={props.rAccessor}
				type={props.bartype}
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
				axis={axis}
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
