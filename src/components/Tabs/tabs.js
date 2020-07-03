import React, { Component } from 'react';
import { Dimensions, ScrollView, Text, TouchableOpacity, View } from 'react-native';

const Styles = {
  container: {
    width: Dimensions.get('screen').width,
    flex: 1,
  },
  tabsContainer: {
    width: Dimensions.get('screen').width,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tabButton: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    borderColor: '#e73f0c',
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
};

class Tabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 0,
    };
    this.selectTab = this.selectTab.bind(this);
  }

  selectTab(tab) {
    this.setState({
      selectedTab: tab,
    });
  }

  render() {
    const { tabs, children } = this.props;
    const { selectedTab } = this.state;
    const { tabsContainer, container, tabButton } = Styles;
    return (
      <View style={container}>
        <View style={tabsContainer}>
          {tabs.map((tab, index) => {
            return (
              <TouchableOpacity
                key={tab}
                onPress={() => this.selectTab(index)}
                style={{ ...tabButton, borderBottomWidth: index === selectedTab ? 1 : 0 }}
              >
                <Text>{tab}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <ScrollView style={{ flex: 1 }}>{children[selectedTab]}</ScrollView>
      </View>
    );
  }
}

export default Tabs;
