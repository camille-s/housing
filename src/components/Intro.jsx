import React from 'react';
import ReactMarkdown from 'react-markdown';
import '../styles/Intro.css';

import md from '../data/intro.js';

const Intro = () => (
	<div className="Intro"><ReactMarkdown source={md} /></div>
);

export default Intro;
