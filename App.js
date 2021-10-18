import { Navigation } from './router/navigate';
import React from 'react';
import { Provider } from 'react-redux';
import store from './store';


const App = () => {

  return (
    <Provider store={store}>
      <Navigation/>
    </Provider>
  );
};

export default App;
