import React, { Component } from 'react';
import { Alert, AsyncStorage, ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BowlButton, DrinkButton, Header } from '../../commonComponents/index';
import { defaultBowls, drinks } from '../../utils/data';
import * as basketActions from '../Basket/basketAction';
import Tabs from '../Tabs/tabs';
import Tutorial from '../Tutorial/tutorial';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      basket: [],
      bowls: [...defaultBowls],
      drinks: [...drinks],
      student: false,
      tutorialDone: false,
    };
    this.timer = null;
    this.alert = this.alert.bind(this);
    this.finishTutorial = this.finishTutorial.bind(this);
    this.checkTutorial = this.checkTutorial.bind(this);
  }

  componentDidMount() {
    this.checkTutorial();
  }

  finishTutorial = async () => {
    try {
      await AsyncStorage.setItem('TutorialFinished', 'true');
    } catch (error) {
      console.log('This is an error message for the developer: ', error);
    }
    this.resetBowls();
    this.setState({
      tutorialDone: true,
    });
  };

  checkTutorial = async () => {
    try {
      const value = await AsyncStorage.getItem('TutorialFinished');
      // console.log(value);
      if (value === 'true') {
        this.setState({
          tutorialDone: true,
        });
      } else {
        this.setState({
          tutorialDone: false,
        });
      }
    } catch (error) {
      console.log('This is an error message for the developer: ', error);
    }
  };

  alert = () => {
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
          onPress: () => this.props.actions.resetBasket(),
        },
      ],
      { cancelable: false }
    );
  };

  toggleStudent = () => {
    this.setState({
      student: !this.state.student,
    });
  };

  holdUndo = () => {
    this.props.actions.removeFromBasket();
    this.timer = setTimeout(this.holdUndo, 400);
  };

  unholdUndo = () => {
    clearTimeout(this.timer);
  };

  render() {
    const { student, bowls, drinks, tutorialDone } = this.state;
    const {
      basket: { basket },
      actions: { addToBasket, removeItemFromBasket },
    } = this.props;
    // console.log('props', this.props);
    return (
      <View>
        <Header
          basket={basket}
          student={student}
          toggleStudent={this.toggleStudent}
          holdUndo={this.holdUndo}
          unholdUndo={this.unholdUndo}
          alert={this.alert}
        />
        {/* <ScrollView>
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
                </ScrollView> */}
        <Tabs tabs={['Bowls', 'Drinks']}>
          <ScrollView>
            {bowls.map((bowl) => (
              <BowlButton
                key={bowl.name}
                basket={basket}
                onPress={addToBasket}
                student={student}
                bowl={bowl}
                undoPress={removeItemFromBasket}
              />
            ))}
          </ScrollView>
          <ScrollView>
            {drinks.map((drink) => (
              <DrinkButton
                key={drink.name}
                basket={basket}
                drink={drink}
                onPress={addToBasket}
                undoPress={removeItemFromBasket}
              />
            ))}
          </ScrollView>
        </Tabs>

        {tutorialDone === true ? null : (
          <Tutorial addToBasket={addToBasket} finishTutorial={this.finishTutorial} />
        )}
      </View>
    );
  }
}

export default connect(
  (state) => ({
    basket: state.basket,
  }),
  (dispatch) => ({
    actions: bindActionCreators(basketActions, dispatch),
  })
)(Home);
