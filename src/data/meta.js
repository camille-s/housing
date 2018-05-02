const meta = [
    {
        step: 1,
        indicator: 'holc area',
        scheme: 'grade',
        type: 'map',
        hasLegend: true,
        mapdata: ['town', 'holc']
    }, {
        step: 2,
        indicator: 'holc neighborhood overlay',
        scheme: 'grade',
        type: 'map',
        hasLegend: true,
        mapdata: ['town', 'holc', 'hood']
    }, {
        step: 3,
        indicator: 'race by region',
        type: 'chart',
        hasLegend: true,
        direction: 'horizontal',
        rExtent: [ 0, 1 ],
        thresh: 10,
        oPadding: 30,
        margin: { top: 40, right: 20, bottom: 40, left: 70 },
		tickValues: [ 0, 0.25, 0.5, 0.75, 1.0 ]
    }, {
        step: 4,
        indicator: 'homeownership by grade',
        scheme: 'grade',
        type: 'chart'
    }, {
        step: 5,
        indicator: 'unit type by town',
        type: 'chart',
        scheme: 'unit',
        hasLegend: false,
        direction: 'horizontal',
        rExtent: [ 0, 1 ],
        margin: { top: 16, right: 20, bottom: 40, left: 110 },
        tickValues: [ 0, 0.25, 0.5, 0.75, 1.0 ],
		hasTipTitle: false
    }, {
        step: 6,
        indicator: 'homeownership by region',
        type: 'chart',
        thresh: 10,
        oPadding: 20,
		hasTipTitle: false
    }, {
        step: 7,
        indicator: 'homeownership by region by race',
        type: 'chart',
        bartype: 'clusterbar',
        hasLegend: true,
        thresh: 10,
    }, {
        step: 8,
        indicator: 'homeowners by race and grade',
        type: 'chart',
        hasLegend: true,
        hasWidth: true,
        rExtent: [ 0, 1 ],
        oPadding: 5,
        tickValues: [ 0, 0.25, 0.5, 0.75, 1.0 ]
    }, {
        step: 9,
        indicator: 'share in isolation 2016',
        type: 'chart',
        bartype: 'clusterbar',
        hasLegend: true,
        oPadding: 20
    }, {
        step: 10,
        indicator: 'share in isolation over time',
        type: 'chart',
        bartype: 'clusterbar',
        hasLegend: true
    }
];

export default meta;
