import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  Image,
} from 'react-native';

const styles = {
  container: {
    width: Dimensions.get('window').width - 20,
    height: '8.2%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    margin: 10,
    shadowColor: '#000000',
    backgroundColor: '#fcfcfc',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 3,
  },
  image: {
    shadowOpacity: 0,
    justifyContent: 'center',
    height: 50,
    width: 50,
  },
  text: {
    fontSize: 20,
    textAlign: 'right',
  },
  cupText: {
    fontSize: 25,
    paddingBottom: 8,
    textAlign: 'center',
    color: 'black',
  },
  drinkContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
  },
  undoContainer: {
    borderLeftWidth: 1,
    borderColor: '#eaeaea',
    width: '20%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

const DrinkButton = ({ drink: { name, price }, drink, basket, onPress, undoPress }) => {
  const { container, image, text, cupText, drinkContainer, undoContainer } = styles;
  let quantity;
  Object.keys(basket).map((item) => {
    if (basket[item].name === drink.name) {
      quantity = basket[item].quantity;
    }
  });
  return (
    <View style={container}>
      <TouchableOpacity style={drinkContainer} onPress={() => onPress(drink)} >
        <ImageBackground imageStyle={{ resizeMode: 'contain' }} style={image} source={require('../images/cup.png')}>
          <Text style={cupText}>
            {quantity}
          </Text>
        </ImageBackground>
        <View style={{width: 150, alignItems: 'flex-end'}}>
          <Text style={text}>{name}</Text>
          <Text style={text}>£{parseFloat(price).toFixed(2)}</Text>
        </View>
      </TouchableOpacity>
      {quantity
        ? (
          <TouchableOpacity style={undoContainer} onPress={() => undoPress(drink)}>
            <View>
              <Image source={require('../images/undoOrange.png')} style={{ width: 25, height: 25, resizeMode: 'contain' }} />
            </View>
          </TouchableOpacity>
        )
        : null }
    </View>
  );
};

export { DrinkButton };
