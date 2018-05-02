import React from 'react';
import * as _ from 'underscore';
import { ResponsiveOrdinalFrame } from 'semiotic';
import { format } from 'd3-format';
import { max } from 'd3-array';
import { defaultProps } from 'recompose';
import { LegendOrdinal } from '@vx/legend';
import { AnnotationLabel } from 'react-annotation';
import ReactTooltip from 'react-tooltip';
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
	thresh: 20,
	hasTipTitle: true
});

class Chart extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			tooltipContents: null
		};
	}

	hover = (e) => {
		if (_.isUndefined(e)) {
			this.setState({
				tooltipContents: null
			});
			ReactTooltip.hide();
		} else {
			this.setState({
				tooltipContents: this.makeTooltip(e)
			});
			ReactTooltip.show();
		}
	};

	unhover = () => {
		this.setState({
			tooltipContents: null
		});
	};


	makeTooltip = (d) => {
		let fmt = format(this.props.format);
		if (this.props.hasTipTitle) {
			return `${d.group}: ${fmt(d.value)}`;
		} else {
			return `${fmt(d.value)}`;
		}
	};

	render() {
		let data = this.props.data;
		let isVert = this.props.direction === 'vertical';
		let orient = isVert ? 'left' : 'bottom';
		let isPieced = this.props.bartype === 'clusterbar';
		let fmt = format(this.props.format);
		let axis = {
			// orient: orient,
			tickFormat: (d) => fmt(d),
			ticks: this.props.ticks,
			tickValues: this.props.tickValues || null
		};

		return (
			<div className="Chart" key="chart">

				<div data-tip="" data-for="tooltip" onMouseOut={this.unhover}>
					<ResponsiveOrdinalFrame
						size={this.props.size}
						data={data}
						oAccessor={this.props.oAccessor}
						rAccessor={this.props.rAccessor}
						type={this.props.bartype}
						responsiveWidth={true}
						rExtent={ this.props.rExtent || [ 0, max(data, d => d.value) ] }
						dynamicColumnWidth={this.props.hasWidth ? 'width' : null}
						style={(d) => ({
							fill: this.props.color(d.group)
						})}
						oPadding={this.props.oPadding}
						projection={this.props.direction}
						oLabel={(d) => <text style={{ textAnchor: this.props.direction === 'vertical' ? 'middle' : 'end' }}>{tspans(d, this.props.thresh)}</text>}
						margin={this.props.margin}
						axis={axis}
						pieceHoverAnnotation={true}
						tooltipContent={(d) => <div display="none"></div>}
						// tooltipContent={(d) => tooltip(d, fmt)}
						customHoverBehavior={this.hover}
						customClickBehavior={this.hover}
					/>
				</div>
				<div className="Legend">
					{ this.props.hasLegend ?
						<LegendOrdinal
							scale={this.props.color.domain(_.pluck(this.props.data, 'group'))}
							itemDirection="row"
							direction="row"
							labelMargin="0 1em 0 0.2em"
							shapeMargin="2px 0 0"
						/> : null
					}
				</div>

				<ReactTooltip id="tooltip">{this.state.tooltipContents}</ReactTooltip>
			</div>
		);
	}
}


export default withDefaults(Chart);
