import React from 'react';
import ReactMarkdown from 'react-markdown';

import '../styles/Text.css';

const Text = ({ text }) => (
	<div className="Text">
		<ReactMarkdown source={text} />
	</div>
);

export default Text;
