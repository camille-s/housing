import React from 'react';
import { Mercator } from '@vx/geo';
import { ScaleSVG } from '@vx/responsive';
import { LegendOrdinal } from '@vx/legend';
import { defaultProps } from 'recompose';
import * as _ from 'underscore';

const makeColor = (geography, color, fill) => {
    return fill ? color(geography.properties.name) : 'transparent';
};

const withDefaults = defaultProps({
    hasLegend: true
});

const DataMap = (props) => {
    let topo = _.filter(props.shapes, (shp) => _.contains(props.mapdata, shp.name));
    let holc = _.where(topo, { name: 'holc' })[0];

	return (
        <div className="DataMap" key="map">
            <ScaleSVG width={props.size[0]} height={props.size[1]}>

                { topo.map((tp) => (
                    <Mercator
                        key={tp.name}
                        data={tp.topo.features}
                        fitSize={[props.size, holc.topo]}
                        stroke={tp.stroke}
                        strokeWidth={tp.weight || 0.8}
                        fill={(geography) => makeColor(geography, props.color, tp.fill) }
                    />
                ))}

            </ScaleSVG>

            <div className="Legend">
                { props.hasLegend ?
                    <LegendOrdinal
                        scale={props.color}
                        itemDirection="row"
                        direction="column"
                        labelMargin="0 1em 0 0.2em"
                        shapeMargin="2px 0 0"
                    /> : null
                }
            </div>
        </div>
    );
};

export default withDefaults(DataMap);
//
// { topo.map((tp, i) => (
//     <Mercator
//         key={i}
//         data={tp.features}
//         fitSize={[[400, 400], topo[0]]}
//         fill={this.makeColor}
//         stroke="#ccc"
//     />
// )) }
