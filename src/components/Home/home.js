import React, { Component } from 'react';
import { View, ScrollView, Alert, AsyncStorage } from 'react-native';
import { defaultBowls } from '../../utils/data';

import {
    Header,
    BowlButton
} from '../../commonComponents/index';
import Tutorial from '../Tutorial/tutorial';

class Home extends Component {

    constructor(props){
        super(props);
        this.state = {
            basket: [],
            bowls: [...defaultBowls],
            student: false,
            tutorialDone: false
        };
        this.timer = null
        this.addToBasket = this.addToBasket.bind(this);
        this.alert = this.alert.bind(this);
        this.resetBowls = this.resetBowls.bind(this);
        this.finishTutorial = this.finishTutorial.bind(this);
        this.checkTutorial = this.checkTutorial.bind(this);
    }

    componentDidMount(){
        this.checkTutorial();
    }

    finishTutorial = async () => {
        try {
            await AsyncStorage.setItem('TutorialFinished', 'true');
            this.resetBowls();
            this.setState({
                tutorialDone: true
            });
        } catch (error) {
            console.log(error)
        }
    }

    checkTutorial = async () => {
        try {
            const value = await AsyncStorage.getItem('TutorialFinished');
            console.log(value)
            if (value === 'true') {
              this.setState({
                  tutorialDone: true
              });
            } else {
                this.setState({
                    tutorialDone: false
                });
            }
          } catch (error) {
            console.log(error)

          } 
    }

    alert = () =>{
        Alert.alert(
            'Reset Basket',
            'This will get rid of all previously added bowls',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {
                text: 'OK', 
                onPress: () => this.resetBowls()
              },
            ],
            {cancelable: false},
          );
    }

    resetBowls = () => {
        let bowlClone = [...this.state.bowls];
        bowlClone.map(item => {
            item.quantity = 0;
        })
        this.setState({
            basket: [],
            bowls: bowlClone
        })
    }

    addToBasket = (item) => {
        let basketClone = [...this.state.basket];
        let bowlClone = [...this.state.bowls];
        bowlClone.map(bowl => {
            if(bowl.price === item) {
                bowl.quantity++;
            }
        })

        basketClone.push(item);
        this.setState({
            basket: basketClone,
            bowls: bowlClone
        });
    }

    undoBasket = () => {
        let basketClone = [...this.state.basket];
        let bowlClone = [...this.state.bowls];
        let popped = basketClone.pop();

        bowlClone.map(bowl => {
            if(bowl.price === popped){
                bowl.quantity--;
            }
        })

        this.setState({
            basket: basketClone,
            bowls: bowlClone
        })
    }

    toggleStudent = () => {
        this.setState({
            student: !this.state.student
        })
    }

    holdUndo = () => {
        const basketClone = this.state.basket;
        let bowlClone = [...this.state.bowls];
        let popped = basketClone.pop();

        bowlClone.map(bowl => {
            if(bowl.price === popped){
                bowl.quantity--;
            }
        })

        this.setState({
            basket: basketClone
        })
        this.timer = setTimeout(this.holdUndo, 400);
    }

    unholdUndo = () => {
        clearTimeout(this.timer);
    }

    render(){
        const bowl = ['green','blue','purple','orange','pink','gray'];
        let { basket, student, bowls, tutorialDone } = this.state;
        return(
            <View>
                <Header
                    basket={basket}
                    student={student}
                    toggleStudent={this.toggleStudent}
                    onPress={this.undoBasket}
                    holdUndo={this.holdUndo}
                    unholdUndo={this.unholdUndo}
                    alert={this.alert}
                />
                <ScrollView>
                    {   
                        bowls.map(bowl => {
                            return(
                            <BowlButton
                                key={bowl.name}
                                onPress={this.addToBasket}
                                student={student}
                                bowl={bowl}
                            />
                            )
                        })
                    }
                </ScrollView>

                {tutorialDone === true ? null : 
                    <Tutorial
                        addToBasket={this.addToBasket}
                        finishTutorial={this.finishTutorial}
                    />
                }
            </View>
        )
    }
}

export default Home;