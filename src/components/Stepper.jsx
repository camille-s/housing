import React from 'react';
import { Menu } from 'semantic-ui-react';

const Stepper = (props) => (
	// <Pagination
	// 	defaultActivePage={1}
	// 	pointing
	// 	secondary
	// 	totalPages={12}
	// 	firstItem={null}
	// 	lastItem={null}
	// 	size="small"
	// 	color={'violet'}
	// 	onPageChange={props.onChange}
	// 	siblingRange={0}
	// />
	<Menu pagination size="tiny" fluid widths={2} secondary>
		<Menu.Item name="Back" onClick={props.onChange} value={-1} disabled={props.noBack} aria-label="Back" role="button" />
		<Menu.Item name="Next" onClick={props.onChange} value={1} disabled={props.noNext} aria-label="Next" role="button" />
	</Menu>
);

export default Stepper;
