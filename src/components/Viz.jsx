import React from 'react';
import Chart from './Chart';
import DataMap from './DataMap';
import { scaleOrdinal } from 'd3-scale';
import ReactMarkdown from 'react-markdown';

import { componentFromProp } from 'recompose';

import schemes from './schemes.js';

import '../styles/Viz.css';

const ChartComponent = componentFromProp('component');
const chartHash = { chart: Chart, map: DataMap };

const Viz = (props) => (
	<div className="Viz" key="viz-holder" id="viz-holder">
		<ReactMarkdown source={props.title} />
		<ChartComponent
			component={chartHash[props.type]}
			{...props}
			color={scaleOrdinal().range(schemes[props.scheme] || schemes.race)}
		/>
	</div>
);

export default Viz;
