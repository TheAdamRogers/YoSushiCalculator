import React, { Component } from 'react';
import { View, Text, SafeAreaView, ScrollView, Alert, Dimensions, TouchableOpacity } from 'react-native';

class Tutorial extends Component {

    constructor(props){
        super(props);
        this.state = {
            steps: []
        };
        this.nextStep = this.nextStep.bind(this);
    }
    nextStep = () => {
        let stepsClone = this.state.steps;
        stepsClone.push(true);
        this.setState({
            steps: [...stepsClone]
        })
    }

    render(){

        let { steps } = this.state;
        let { addToBasket, finishTutorial } = this.props;

        return(
            <View style={{width: Dimensions.get('screen').width, height: Dimensions.get('screen').height, backgroundColor: 'rgba(160,160,160, 0.3)', position: 'absolute'}}>
                    {steps.length === 0 ? 
                        <View style={{ backgroundColor: 'white', borderRadius: 75, margin: 20, padding: 20, marginTop: (Dimensions.get('screen').height/2 - 50)}}>
                            <Text style={{textAlign: 'center'}}>
                                Welcome to the yo sushi calculator.
                                This is a quick start guide to explain how it works.
                            </Text>    
                        </View>
                        : steps.length === 1 ?
                        <View style={{ backgroundColor: 'white', borderRadius: 75, margin: 20, padding: 20, marginTop: (Dimensions.get('screen').height/2 - 50)}}>
                            <Text style={{textAlign: 'center'}}>
                                First thing first, is to add the bowls by clicking the buttons.
                                When you've added a bowl, the total price and quantity will increase.

                                I'll add a bowl for you and then we can get on to the next step.
                            </Text> 
                        </View>
                        : steps.length === 2 ? 
                        <View style={{ backgroundColor: 'white', borderRadius: 75, margin: 20, padding: 20, marginTop: 80, width: 270 }}>
                            <Text style={{textAlign: 'center'}}>
                                The button to the right of this box is the undo button.
                                Clicking this will remove the last item you added.
                                It can be held to undo multiple items. 
                            </Text> 
                        </View>
                        :  steps.length === 3 ? 
                        <View style={{ backgroundColor: 'white', borderRadius: 75, margin: 20, padding: 20, marginTop: 80, width: 270, marginLeft: 100 }}>
                            <Text style={{textAlign: 'center'}}>
                                The button to the left of this box is the student button.
                                Clicking this will discount the 25% off from unidays.
                            </Text> 
                        </View>
                        :  steps.length === 4 ? 
                        <View>
                            <View style={{ backgroundColor: 'white', borderRadius: 75, margin: 20, padding: 20, marginTop: (Dimensions.get('screen').height/3 ) }}>
                                <Text style={{textAlign: 'center'}}>
                                    The Yo! logo at the top can be clicked to fully reset the basket.
                                    Don't worry about misclicking it, they'll be an alert to stop you. 
                                </Text> 
                            </View>
                            <View style={{ backgroundColor: 'white', borderRadius: 75, margin: 20, padding: 20 }}>
                                <Text style={{textAlign: 'center'}}>
                                    That's all there is to it! Enjoy you food! 
                                </Text> 
                            </View>
                        </View>
                        : null  }
                <TouchableOpacity 
                onPress={ () => {
                    this.nextStep();
                    (steps.length === 1 ? addToBasket(2.30) : steps.length === 5 ? finishTutorial() : null)
                    }} 
                style={{ backgroundColor: 'white', borderRadius: 75, margin: 20, padding: 10, width: 100, alignSelf: 'center' }}
                >
                    <Text style={{textAlign: 'center'}}>
                       {steps.length === 4 ? 'Finish' :  'Next'}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default Tutorial;