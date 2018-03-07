import * as _ from 'underscore';

export const dataPrep = (json) => {
	let data = _.groupBy(json, 'step');

	return {
		initData: data,
	};
};
