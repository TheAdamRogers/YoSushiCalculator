import React from 'react';
import {
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  Text,
  Image,
  View,
} from 'react-native';

const styles = {
  container: {
    width: Dimensions.get('window').width - 20,
    height: '13%',
    flexDirection: 'row',
    justifyContent: 'space-around',
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
  bowlContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
  },
  image: {
    shadowOpacity: 0,
    justifyContent: 'center',
    height: 100,
    width: 100,
  },
  text: {
    fontSize: 30,
    textAlign: 'center',
  },
  bowlText: {
    fontSize: 25,
    paddingBottom: 8,
    textAlign: 'center',
    color: 'white',
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

const BowlButton = ({ bowl, onPress, student, basket, undoPress }) => {
  const { container, image, text, bowlText, undoContainer, bowlContainer } = styles;
  const { imgURL } = bowl;
  let quantity;
  Object.keys(basket).map((item) => {
    if (basket[item].name === bowl.name) {
      quantity = basket[item].quantity;
    }
  });
  let { price } = bowl;
  if (student) {
    price *= 0.75;
  }
  return (
    <View style={container}>
      <TouchableOpacity style={bowlContainer} onPress={() => onPress(bowl)}>
        <ImageBackground imageStyle={{ resizeMode: 'contain' }} style={image} source={imgURL}>
          <Text style={bowlText}>
            {quantity}
          </Text>
        </ImageBackground>
        <Text style={text}>
          £
          {parseFloat(price).toFixed(2)}
        </Text>
      </TouchableOpacity>
      {quantity
        ? (
          <TouchableOpacity style={undoContainer} onPress={() => undoPress(bowl)}>
            <View>
              <Image source={require('../images/undoOrange.png')} style={{ width: 25, height: 25, resizeMode: 'contain' }} />
            </View>
          </TouchableOpacity>
        )
        : null }
    </View>
  );
};

export { BowlButton };
