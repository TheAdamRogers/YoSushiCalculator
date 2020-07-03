import React, { Component } from 'react';
import { Dimensions, View, Image, Text, TouchableOpacity } from 'react-native';

const styles = {
  container: {
    width: Dimensions.get('window').width,
    height: 170,
    backgroundColor: '#e73f0c',
    paddingRight: 40,
    paddingLeft: 40,
    paddingBottom: 60,
  },
  image: {
    height: 50,
    width: 'auto',
    resizeMode: 'contain',
    marginTop: 55,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
  },
  undo: {
    width: 20,
    margin: 5,
    height: 20,
    resizeMode: 'contain',
  },
};

class Header extends Component {
  render() {
    const {
      basket,
      onPress,
      toggleStudent,
      student,
      holdUndo,
      unholdUndo,
      alert,
    } = this.props;

    const {
      container,
      image,
      text,
      undo,
    } = styles;

    const calculatePrice = () => {
      let price = parseFloat(0);
      Object.keys(basket).map((item) => {
        key = basket[item].name;
        if (basket[item].category === 'bowl' && student) {
          price += (basket[item].price * 0.75) * basket[item].quantity;
        } else {
          price += (basket[item].price) * basket[item].quantity;
        }
      });
      return price;
    };

    return (
      <View style={container}>
        <TouchableOpacity onPress={() => alert()}>
          <Image style={image} source={require('../images/yoLogo.png')} />
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 20 }}>
          <TouchableOpacity
            style={{ borderWidth: 1, borderColor: student ? 'white' : '#e73f0c', borderRadius: 50 }}
            onPress={() => toggleStudent()}
          >
            <Image style={undo} source={require('../images/StudenIcon.png')} />
          </TouchableOpacity>
          <Text style={text}>Total Price: £{parseFloat(calculatePrice()).toFixed(2)}</Text>
          <TouchableOpacity onPressIn={holdUndo} onPressOut={unholdUndo}>
            <Image style={undo} source={require('../images/undo.png')} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export { Header };
