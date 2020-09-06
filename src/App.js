import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';

import Main from './Pages/Main';
import { Provider } from 'react-redux';
import { ConfigureStore } from './Redux/ConfigureStore';

const store = ConfigureStore();


function App() {
	return (
		<Provider store={store}>
			<Router>
				<Main/>
			</Router>
		</Provider>
	);
}

export default App;
