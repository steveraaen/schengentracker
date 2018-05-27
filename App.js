console.disableYellowBox = true;
import React from 'react';
import { Animated,  AppRegistry, Button, Dimensions, Easing, Image, StyleSheet, Platform, ProgressViewIOS, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { StackNavigator } from 'react-navigation'
import { Calendar } from 'react-native-calendars' 
import firebase from 'react-native-firebase';
import moment from 'moment';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons'; 
import * as Animatable from 'react-native-animatable';
import Cal from './Cal.js';
/*import FadeInView from './AnimateA.js';*/
import ctrylist from './ctrylist';
const database = firebase.database()
const _format = 'YYYY-MM-DD'
const _today = moment().format(_format)
const _maxDate = _today
const _minDate = moment().subtract(90, 'days').format(_format)


class App extends React.Component {
    static navigationOptions = {
    header: null
  }
  constructor(props) {
      initialState = {
      [_today]: {disabled: true}
  }
    super(props);
    console.log(initialState)
    this.state = {
        isAuthenticated: false,
        yesStartDateText: moment().subtract(180, 'days').format("MMMM Do YYYY"),
        yesStartDateDigit: moment().subtract(180, 'days').format("YYYY-MM-DD"),
        todaysDate: moment().format("YYYY-MM-DD"),
        modalVisible: false,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        curCol: 'salmon',
        _markedDates: initialState,
        diEU: 0,
        dlEU:90
       /* uid: null*/

    }; 
        Dimensions.addEventListener('change', () => {
        this.setState({
            orientation: Rescale.isPortrait() ? 'portrait' : 'landscape',
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height
        });
    });
;
    this.calcDays = this.calcDays.bind(this)
    this.revGeocode = this.revGeocode.bind(this)
    this.writeUserData = this.writeUserData.bind(this)
    this.resetDays = this.resetDays.bind(this)

  }
    revGeocode(lat, lng) {      
    var lat= parseFloat(this.state.uLatitude).toFixed(6); 
      var lng= parseFloat(this.state.uLatitude).toFixed(6) ;

     return axios.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + parseFloat(this.state.uLatitude).toFixed(6) +',' + parseFloat(this.state.uLongitude).toFixed(6) + '&key=AIzaSyD0Zrt4a_yUyZEGZBxGULidgIWK05qYeqs', {
        }).then((doc) => {

for (let i = 0; i < ctrylist.length; i++) {
  var plnm = doc.data.results[0].address_components
  if(plnm[4].long_name === ctrylist[i].name || plnm[5].long_name === ctrylist[i].name || plnm[6].long_name === ctrylist[i].name) {
    var cctry = ctrylist[i]
   console.log(cctry.name)
   var curOut = !cctry.europe && !cctry.schengen;
   var curIn = cctry.schengen
   var curNear = !cctry.schengen && cctry.europe
   this.setState({
              ctry: cctry.name,
              curOut: curOut,
              curIn: curIn,
              curNear: curNear
                  }, () => {
                    if(this.state.curIn) {
                      this.setState({curCol: 'blue'})
                    } else if(this.state.curNear) {
                      this.setState({curCol: 'green'})
                    } else if(this.state.curOut) {
                      this.setState({curCol: 'gray'})
                    }
                  })
          }
        }

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
componentWillMount() {
  firebase.auth().signInAnonymouslyAndRetrieveData()
  .then(() => {
   
    this.setState({
      authObj: firebase.auth(),
      isAuthenticated: true,
      uid: firebase.auth()._user.uid,
    }, () => {
             database.ref('users/' + this.state.uid).on('value', (snapshot) =>{
         this.setState({
          snp: snapshot.val(),
          diEU: snapshot.val().daysInEU,
          dlEU: snapshot.val().daysLeft,
          lastDay: moment().add(snapshot.val().daysInEU, 'days').format('MMMM Do YYYY'),
          mkddts: snapshot.val().markedDates
        })
         console.log(snapshot.val().daysInEU)
      }) 
    });
  });
                         
  axios.get('https://api.opencagedata.com/geocode/v1/json?q='+ parseFloat(this.state.uLongitude).toFixed(6) +',' + parseFloat(this.state.uLatitude).toFixed(6) + '&pretty=1&key=7972b0994b65ec093e1dfb49909b9667')
    .then((docs) => { 
      this.setState({ocage: docs, flag: docs.data.results[0].annotations.flag})  })
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

  }
  calcDays(mds) {
    console.log(mds)
    var mkdarr = []
    for( let mkds in mds) {
      if(mds[mkds].marked) {
        mkdarr.push(mds[mkds])
      }
      console.log(mkdarr)
      this.setState({
        daysInEU: mkdarr.length,
        daysLeft: 90 - mkdarr.length
      }, () => {
        this.writeUserData(this.state.uid, this.state._markedDates, this.state.daysInEU, this.state.daysLeft)
      })
    }
  } 
  writeUserData(uid, mkd, wdi, wdl) {
  console.log('clicked')
  database.ref('users/' + uid).set({
     uid: uid,
    markedDates: mkd,
    daysInEU: wdi,
    daysLeft: wdl
  });
} 
  onDaySelect = (day) => {
      const _selectedDay = moment(day.dateString).format(_format);      
      let marked = true;
      console.log(_selectedDay)
      if (this.state._markedDates[_selectedDay]) {
        marked = !this.state._markedDates[_selectedDay].marked;
      }
      const updatedMarkedDates = {...this.state._markedDates, ...{ [_selectedDay]: { marked } } }
      this.setState({ _markedDates: updatedMarkedDates }, () =>
          this.calcDays(this.state._markedDates)
        );
  }
  resetDays() {
    this.setState({diEU: 0, dlEU:90})
  }
  render() {
    this.styles = StyleSheet.create({
container: {
  paddingTop: 18,
  flex: 1, 
  flexWrap: 'wrap', 
  justifyContent: 'flex-start',
/*  flexDirection: 'column',*/
  backgroundColor: 'black',
  },
  europe: {
  backgroundColor: 'cornsilk',
  color:  this.state.curCol,
  fontSize: 32,
  fontWeight: 'bold',
  textAlign: 'center'
/*  marginRight: 30*/
},
eurBoxEU: {
  /*flex: 1,*/
  backgroundColor: this.state.curCol,
  alignItems: 'center',
  height: 80,
  width: 80,
  borderRadius: 10,
  backgroundColor:  this.state.curCol,
  /*marginLeft: 30*/
  },
eurBoxText: {
  color: 'white',
  fontWeight: 'bold',
  fontSize:32,
  textAlign: 'center'
  },
otherIn: {
  color: 'red',
  fontSize: 18,
  fontWeight: 'bold',
  textAlign: 'center'
  },
  otherLeft: {
  color: 'green',
  fontSize: 18,
  fontWeight: 'bold',
  textAlign: 'center'
  }
});
  /*  this.makeList(ctrylist)*/
    var lst = []
    for(let i = 0; i < ctrylist.length; i++) {
      if(!ctrylist[i].europe) {
        lst.push(<Text key={ctrylist[i].name} style={this.styles.other}>{ctrylist[i].name}</Text>)
      } else if(ctrylist[i].schengen) {
        lst.push(<Text key={ctrylist[i].name} style={this.styles.schen}>{ctrylist[i].name}</Text>)
      }  else {
        lst.push(<Text key={ctrylist[i].name} style={this.styles.eur}>{ctrylist[i].name}</Text>)
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
      <View style={this.styles.container}>
        <View>
          <Icon name="ios-calendar-outline" 
            size={30} 
            color="#F5DEB3"
            onPress={() => navigate('Cal', {data: this.state})}
            title="FIView" 
          />
          <Icon name="ios-refresh-outline" 
            size={30} 
            color="#F5DEB3"
            onPress={() => this.resetDays()}
            title="FIView" 
          />
            <View style={{alignItems: 'center'}}>
              <View style={this.styles.eurBoxEU}>
                <Animatable.Text animation="slideInDown"style={this.styles.eurBoxText}>{moment().format('MMM DD')}</Animatable.Text>
              </View>
            </View>
              <View style={{marginTop: 18}}><Animatable.Text animation="rotate" style={this.styles.europe}>{this.state.ctry}<Text style={{height:32, width: 36}}>{this.state.flag}</Text></Animatable.Text></View>            
          </View>
           <Animatable.View animation='fadeOut' delay={3000} duration={2000} easing='ease-out' style={{alignItems: 'center'}}><Text style={{color: 'white', fontSize: 20}}>90 Day Schengen Zone Summary</Text></Animatable.View>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: .5, flexDirection: 'column', marginTop: 18}}>
              <Text style={this.styles.otherIn}>Days In</Text>
              <Text style={this.styles.eurBoxText}>{this.state.diEU}</Text>
            </View>
            <View style={{flex: .5, flexDirection: 'column', marginTop: 18}}>
              <Text style={this.styles.otherLeft}>Days Left</Text>
              <Text style={this.styles.eurBoxText}>{this.state.dlEU}</Text>
            </View>
          </View>
                  <View style={{marginTop: 14, marginBottom: 14}}><ProgressViewIOS  progressTintColor='red' trackTintColor='green' progress={this.state.daysInEU / 90}/></View>

          <View>
            <Calendar 
                style={{marginTop: 1}}           
                theme={{ calendarBackground: 'black'}}
                // we use moment.js to give the minimum and maximum dates.
                minDate={_minDate}
                maxDate={_maxDate}
                // hideArrows={true}
                onDayPress={this.onDaySelect}
                markedDates={this.state._markedDates}
             
            />              
        </View>
      </View>
    );

  }

}


export const schengentracker = StackNavigator({

  App: { screen: App },
  Cal: { screen: Cal},
});

AppRegistry.registerComponent('schengentracker', () => schengentracker);
