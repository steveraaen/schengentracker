import React from 'react';
import { Animated,  AppRegistry, Button, Dimensions, Easing, StyleSheet, Platform, Image, Text, View, ScrollView } from 'react-native';
import { StackNavigator } from 'react-navigation'
import firebase from 'react-native-firebase';
import moment from 'moment';
import axios from 'axios';
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
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height

    };
        Dimensions.addEventListener('change', () => {
        this.setState({
            orientation: Rescale.isPortrait() ? 'portrait' : 'landscape',
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height
        });
    });
    this.makeList = this.makeList.bind(this)
    this.revGeocode = this.revGeocode.bind(this)
  }
    revGeocode(lat, lng) {      
    var lat= parseFloat(this.state.uLatitude).toFixed(6); 
      var lng= parseFloat(this.state.uLatitude).toFixed(6) ;
     return axios.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + parseFloat(this.state.uLatitude).toFixed(6) +',' + parseFloat(this.state.uLongitude).toFixed(6) + '&key=AIzaSyD0Zrt4a_yUyZEGZBxGULidgIWK05qYeqs', {
        }).then((doc) => {
          this.setState({            
            address:  doc.data.results[0].formatted_address.split(",")[0] + ", " + doc.data.results[0].formatted_address.split(",")[1],
            latitude: doc.data.results[0].geometry.location[1],
            longitude: doc.data.results[0].geometry.location[0],
            placeName: doc.data.results[0]
          })
        }).catch(function(error) {
       throw error
    }); 

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
        navigator.geolocation.getCurrentPosition(function(pos) {
            var { longitude, latitude, accuracy, heading } = pos.coords
            this.setState({
                uLongitude: pos.coords.longitude,
                uLatitude: pos.coords.latitude,
                uLnglat: [pos.coords.longitude, pos.coords.latitude],
                uPosition: pos.coords,
                deviceLng: pos.coords.longitude,
                deviceLat: pos.coords.latitude,
                loading: false
            })
      this.watchId = navigator.geolocation.watchPosition(
      (position) => {
            this.setState({
                uLatitude: position.coords.latitude,
                uLongitude: position.coords.longitude,
                uPosition: position.coords,
                deviceLng: pos.coords.longitude,
                deviceLat: pos.coords.latitude,
         error: null,
        },() => this.revGeocode(this.state.deviceLat, this.state.deviceLng));      
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true,  distanceFilter: 50 },
)      
        }.bind(this))
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
          lastDay: moment().add(snapshot._value.daysLeft, 'days').format('MMMM Do YYYY'),
          mkddts: snapshot._value.markedDates
        })
         console.log(snapshot._value.daysInEU)
      })
  }
  makeList(li) {

  }
  render() {
    this.makeList(ctrylist)
    var lst = []
    for(let i = 0; i < ctrylist.length; i++) {
      if(!ctrylist[i].europe) {
        lst.push(<Text key={ctrylist[i].name} style={styles.other}>{ctrylist[i].name}</Text>)
      } else if(ctrylist[i].schengen) {
        lst.push(<Text key={ctrylist[i].name} style={styles.schen}>{ctrylist[i].name}</Text>)
      }  else {
        lst.push(<Text key={ctrylist[i].name} style={styles.eur}>{ctrylist[i].name}</Text>)
      }
    }
/*var listItems = ctrylist.map(ctry, idx) => {

}*/
  const { navigate } = this.props.navigation;
    // If the user has not authenticated
    if (!this.state.isAuthenticated) {
      return null;
    }

    return (
      <View>
      <View>
        <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center', fontFamily:'ChalkboardSE-Bold'}}>Schengentracker</Text>
        </View>
      
        <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between',height: 30}}><Text style={{fontSize: 20}}>{this.state.diEU} Days In</Text><Text style={{fontSize: 20}}>{this.state.diL} Days Left</Text></View>    
        
        <View style={{}}>
       <Button
          onPress={() => navigate('Cal', {data: this.state})}
          title="Picker"
          color="#000099"
          accessibilityLabel="Learn more about this purple button"
/>
       <Button
          onPress={() => navigate('FadeInView', {data: this.state})}
          title="FIView"
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
  Cal: { screen: Cal},
  FadeInView: { screen: FadeInView}
});

AppRegistry.registerComponent('schengentracker', () => schengentracker);
