import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Dimensions, Image } from 'react-native';
import TestFairy from 'react-native-testfairy';

import Home from './src/components/Home/home';

export default class App extends React.Component {
  

  componentWillMount = () => {
    //TestFairy.begin("d92766413a9fac0c5f9c860256d05159e472426f");
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Home/>
      </View>
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
