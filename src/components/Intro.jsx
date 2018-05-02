import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Header, Accordion, Button, Modal, Icon, Label } from 'semantic-ui-react';
import '../styles/Intro.css';

import md from '../data/intro.js';

const Intro = ({ isOpen, handleClick }) => (
	<div className="Intro">
		<Header size="huge" as="h1">Housing segregation in Greater New Haven, yesterday and today</Header>
		<Accordion>
			<Accordion.Title active={isOpen} index={0} onClick={handleClick} as={Button} size="tiny">
				<Icon name="dropdown" />
					About this story
				</Accordion.Title>
			<Accordion.Content active={isOpen}>
				<ReactMarkdown source={md} />
			</Accordion.Content>
		</Accordion>
	</div>
);

export default Intro;
