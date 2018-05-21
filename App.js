import React from 'react';
import { Animated,  AppRegistry, Button, Easing, StyleSheet, Platform, Image, Text, View, ScrollView } from 'react-native';
import { StackNavigator } from 'react-navigation'
import firebase from 'react-native-firebase';
import moment from 'moment';
import Cal from './Cal.js';
import FadeInView from './AnimateA.js';
import ctrylist from './ctrylist';
const database = firebase.database()

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        isAuthenticated: false,
        yesStartDateText: moment().subtract(180, 'days').format("MMMM Do YYYY"),
        yesStartDateDigit: moment().subtract(180, 'days').format("YYYY-MM-DD"),
        todaysDate: moment().format("YYYY-MM-DD"),
        modalVisible: false,

    };
    this.animatedValue = new Animated.Value(0)
    this.animate = this.animate.bind(this)
    this.makeList = this.makeList.bind(this)
  }
  animate (easing) {
    this.animatedValue.setValue(0)
      Animated.timing(
        this.animatedValue,
        {
          toValue: 100,
          duration: 1000,
          easing
        }
    ).start()
  }

  componentDidMount() {
    firebase.auth().signInAnonymouslyAndRetrieveData()
      .then(() => {
        this.setState({
          authObj: firebase.auth(),
          isAuthenticated: true,
          uid: firebase.auth()._user.uid,
        });
      });
    ;
       database.ref('records/').on('value', (snapshot) =>{
         this.setState({
          snp: snapshot._value,
          diEU: snapshot._value.daysInEU,
          diL: snapshot._value.daysLeft,
          mkddts: snapshot._value.markedDates
        })
         console.log(snapshot._value.daysInEU)
      })
  }
  makeList(li) {

  }
  render() {
    this.makeList(ctrylist)
/*var listItems = ctrylist.map(ctry, idx) => {

}*/
    var lst = []
    for(let i = 0; i < ctrylist.length; i++) {
      if(!ctrylist[i].europe) {
        lst.push(<Text style={styles.other}>{ctrylist[i].name}</Text>)
      } else if(ctrylist[i].schengen) {
        lst.push(<Text style={styles.schen}>{ctrylist[i].name}</Text>)
      }  else {
        lst.push(<Text style={styles.eur}>{ctrylist[i].name}</Text>)
      }
    }

  const { navigate } = this.props.navigation;
    // If the user has not authenticated
    if (!this.state.isAuthenticated) {
      return null;
    }

    return (
      <View>
      <View>
        <Text>Schengentracker</Text>
        </View>
        <ScrollView style={{height: 300}}>{lst}</ScrollView>
        <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between',height: 30}}><Text style={{fontSize: 20}}>{this.state.diEU} Days In</Text><Text style={{fontSize: 20}}>{this.state.diL} Days Left</Text></View>    
        <FadeInView ><Text>Welcome to SchengenTracker</Text></FadeInView>
        <View style={{}}>
       <Button
          onPress={() => navigate('Cal', {data: this.state})}
          title="Yes"
          color="#000099"
          accessibilityLabel="Learn more about this purple button"
/>
        </View>
              
      </View>
    );
  }
}

const styles = StyleSheet.create({

schen: {
  color: 'green'
},
eur: {
  color: 'blue'
},
other: {
  color: 'red'
}
});
export const schengentracker = StackNavigator({
  App: { screen: App },
  Cal: { screen: Cal}
});

AppRegistry.registerComponent('schengentracker', () => schengentracker);
