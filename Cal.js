import React from 'react'
import moment from 'moment' // 2.20.1
import { Agenda, Animated, Button, StyleSheet, Platform, Image, Text, View, ScrollView } from 'react-native';

import { Calendar } from 'react-native-calendars' // 1.16.1
import firebase from 'react-native-firebase';
const database = firebase.database()
/*const ref = firebase.database().ref('records');*/
const _format = 'YYYY-MM-DD'
const _today = moment().format(_format)
const _maxDate = _today
const _minDate = moment().subtract(90, 'days').format(_format)

class Cal extends React.Component {
  // It is not possible to select some to current day.
  initialState = {
      [_today]: {disabled: true}
  }
  
  constructor(props) {
    super(props);
    this.state = {
    	uid: firebase.auth()._user.uid,
    	data: this.props.navigation.state.params.data,
      _markedDates: this.initialState,
      daysInEU: 0,
      daysLeft: 90,
      _today: _today,
      _maxDate: _maxDate,
      _minDate: _minDate,
      fadeAnim: new Animated.Value(0)
   }
   
    this.calcDays = this.calcDays.bind(this)
    this.writeUserData = this.writeUserData.bind(this)
  }
  calcDays(mds) {
  	var di = 0;
  	var dl = 90;
    for( let mkds in mds) {
    	if(mds[mkds].marked) {
    		di = di + 1;
    		dl = dl - 1
    	}
    	console.log(di, dl)
    	this.setState({
    		daysInEU: di,
    		daysLeft: dl
    	}, () => {
    		this.writeUserData(this.state.uid, this.state._markedDates, this.state.daysInEU, this.state.daysLeft)
    	})
    }
  } 
writeUserData(uid, mkd, di, dl) {
	console.log('clicked')
  database.ref('records').set({
  	 uid: uid,
    markedDates: mkd,
    daysInEU: di,
    daysLeft: dl
  });
} 
  onDaySelect = (day) => {
      const _selectedDay = moment(day.dateString).format(_format);      
      let marked = true;
      if (this.state._markedDates[_selectedDay]) {
        marked = !this.state._markedDates[_selectedDay].marked;
      }
      const updatedMarkedDates = {...this.state._markedDates, ...{ [_selectedDay]: { marked } } }
      this.setState({ _markedDates: updatedMarkedDates }, () =>
      		this.calcDays(this.state._markedDates)
      	);
  }
 componentWillMount() {


 } 
  render() {
    return (
      <View style={{flex: 1}}>
        <Calendar
            // we use moment.js to give the minimum and maximum dates.
            minDate={_minDate}
            maxDate={_maxDate}

            // hideArrows={true}

            onDayPress={this.onDaySelect}
            markedDates={this.state._markedDates}
        />
      </View>
    );
  }
}

export default Cal