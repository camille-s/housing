import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './semantic/dist/semantic.min.css';
import { dataPrep } from './components/DataPrep.js';

import data from './data/housing_data.json';
import meta from './data/meta.js';
import text from './data/text.js';

ReactDOM.render(<App {...dataPrep(data)} allMeta={meta} allText={text} />, document.getElementById('root'));

registerServiceWorker();
