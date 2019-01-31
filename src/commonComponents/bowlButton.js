import React, {Component} from 'react';
import { Dimensions, TouchableOpacity, Image, Text, View } from 'react-native';

class BowlButton extends Component {
    constructor(props){
        super(props)
        this.state = {
            quantity : 0,
            price: 0,
            imgURL: null
        }
    }
    render(){
        const { container, image, text } = styles;
        let { bowl, onPress } = this.props;
        let { name, price, imgURL, quantity} = bowl;
        
        return (
            <TouchableOpacity onPress={() => onPress(price)}>
                <View style={container}>
                    <Text style={text}>{quantity} X</Text>
                    <Image style={image} source={imgURL}></Image>
                    <Text style={text}>£{price.toFixed(2)}</Text>
                </View>
            </TouchableOpacity>
        );
    }
};

const styles = {
    container: { 
        width: Dimensions.get('window').width - 20, 
        flexDirection: 'row',
        justifyContent: 'space-between', 
        padding: 40,
        margin: 10,
        shadowColor: "#000000",
        backgroundColor: '#fcfcfc',
        shadowOpacity: 0.1,
        shadowRadius: 3,
        shadowOffset: {
          height: 0,
          width: 0,
        },
        elevation: 3
    },
    image: { 
        height: 40, 
        resizeMode: 'contain',
        shadowOpacity: 0,
    },
    text: {
        fontSize: 30,
    }
};

export { BowlButton };