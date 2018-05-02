import React, { Component } from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import * as topojson from 'topojson-client';
import dedent from 'dedent';

import './App.css';

import Stepper from './components/Stepper';
import Viz from './components/Viz';
import Text from './components/Text';
import Intro from './components/Intro';
import Footer from './components/Footer';

let shapes = [
	{ name: 'holc', shape: require('./shape/holc_topo.json'), stroke: '#eee', fill: true },
	{ name: 'town', shape: require('./shape/town_topo.json'), stroke: '#444', weight: 2 },
	{ name: 'hood', shape: require('./shape/hood_topo.json'), stroke: '#444', weight: 1 }
];
shapes.forEach((shp) => shp.topo = topojson.feature(shp.shape, shp.shape.objects.shape));

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: [],
			meta: [],
			text: [],
			step: 1,
			introOpen: false
		};
	}

	componentWillMount() {
		this.setState({
			data: this.props.initData[0],
			meta: this.props.allMeta[0],
			text: this.props.allText[0]
		});
	}

	handleStep = (e, { value }) => {
		e.preventDefault();
		let step = this.state.step + value;
		let index = step - 1;
		if (index < 0 || index > this.props.allMeta.length) {
			return;
		}

		this.setState({
			step: step,
			data: this.props.initData[step],
			meta: this.props.allMeta[index],
			text: this.props.allText[index]
		});
	};

	handleIntro = (e) => {
		// e.preventDefault();
		this.setState({
			introOpen: !this.state.introOpen
		});
	};

	render() {
		return (
			<div className="App">
				<Grid container stackable padded>
					<Grid.Row>
						<Grid.Column width={16}>
							{/* <Container text> */}
								<Intro handleClick={this.handleIntro} isOpen={this.state.introOpen} />
							{/* </Container> */}
						</Grid.Column>
					</Grid.Row>

					<Grid.Row>
						<Grid.Column width={8}>
							<Segment>
								<Text text={dedent(this.state.text.body)} />
								<Stepper
									onChange={this.handleStep}
									noBack={this.state.step === 1}
									noNext={this.state.step === this.props.allMeta.length}
								/>
							</Segment>
						</Grid.Column>
						<Grid.Column width={8}>
							<Segment>
								<Viz
									data={this.state.data}
									size={[400, 400]}
									shapes={shapes}
									title={dedent(this.state.text.title)}
									{...this.state.meta}
								/>
							</Segment>
						</Grid.Column>
					</Grid.Row>

					<Grid.Row>
						<Grid.Column>
							<Footer />
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</div>
		);
	}
}

export default App;
