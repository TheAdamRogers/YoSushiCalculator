import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Dimensions, Image } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk'

import reducers from '../yoSushiCalculator/src/utils/Reducers';
import Home from './src/components/Home/home';

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

export default class App extends React.Component {
  

  componentWillMount = () => {
    //TestFairy.begin("d92766413a9fac0c5f9c860256d05159e472426f");
  }
  
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Home/>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});
