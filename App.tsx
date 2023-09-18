
import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import MyStack from './src/navigation/stack';

function App(): JSX.Element {

  return <Provider store={store}>
    <MyStack/>
  </Provider>
   

}

export default App;