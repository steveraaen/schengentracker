import React from 'React';
import { Agenda, Animated, Button, StyleSheet, Platform, Image, Text, View, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars' 
import ctrylist from './ctrylist';
import moment from 'moment';
import * as Animatable from 'react-native-animatable';
const _format = 'YYYY-MM-DD'
const _today = moment().format(_format)
const _maxDate = _today
const _minDate = moment().subtract(180, 'days').format(_format)
var curCol;
export default class FadeInView extends React.Component {
	  initialState = {
      [_today]: {disabled: true}
  }
	constructor(props) {
		super(props);
  this.state = {
	  	data: this.props.navigation.state.params.data,
	  	ctryName: this.props.navigation.state.params.data.placeName.address_components[6].long_name,
  		_maxDate: _maxDate,
  		_minDate: _minDate,
   	_markedDates: this.initialState,
   	curCol: 'gray',
   	duration: 1000,
   	daysIn: 0, 
   	daysLeft: 90,
   	dayCount: 0
  		}	
  		this.calcDays = this.calcDays.bind(this)
  		this.makeGrid = this.makeGrid.bind(this)
	}

  calcDays() {
	var randC = this.state.ctrEU[Math.floor(Math.random()*this.state.ctrEU.length)]
	this.setState({ctry: randC,  dayCount: this.state.dayCount + 1}, () => {
	if(this.state.ctry.schengen) {
  		this.setState({curCol: 'red', daysIn: this.state.daysIn + 1, daysLeft: this.state.daysLeft - 1})
    	} else {
    		this.setState({curCol: 'green'})
    	}
	})

  }
componentWillMount() {
	var inta = setInterval(this.calcDays, 1000)	
}
makeGrid() {
/*	var x = 26;
	var y = 7;
	var xy=[]
	for(let i = 0; i < y; i++) {
		for(j = 0; j < x; j++) {
			 xy.push(<View style={{flex: .03, height: 10, backgroundColor: 'pink'}}><Text key={i}>{i}</Text></View>)
		}
	}
	console,log(xy) */
}
  componentDidMount() {
    var ctrsInEU = []
    for (let i = 0; i < ctrylist.length; i++) {
    	if(ctrylist[i].europe) [
    		ctrsInEU.push(ctrylist[i])]
    }
    this.setState({ctrEU: ctrsInEU}, () => this.calcDays())

  }


  render() {

const styles = StyleSheet.create({
container: {
	paddingTop: 18,
	flex: 1,	
	justifyContent: 'flex-start',
	flexDirection: 'column',
	backgroundColor: 'black',
},

rows: {
  /* flexDirection: 'row', */
  /* flexWrap: 'wrap', */
   flex: 1, 
   alignContent: 'center',

},
bigGreen: {
  color: this.state.curCol,
  fontSize: 24,
  fontWeight: 'bold'
},
europe: {
  color:  this.state.curCol,
  fontSize: 24,
  fontWeight: 'bold',
  textAlign: 'center',
/*  marginRight: 30*/
},
schengen: {
  color: this.state.curCol,
  fontSize: 24,
  fontWeight: 'bold',
  textAlign: 'center',
/*  marginRight: 30*/
},
other: {
	color: 'white',
  fontSize: 18,
  fontWeight: 'bold',
  textAlign: 'center'
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
eurBoxS: {
	/*flex: 1,*/
	backgroundColor:curCol,
	alignItems: 'center',
	height: 80,
	width: 80,
	borderRadius: 10,
	backgroundColor: this.state.curCol,
	/*marginLeft: 30*/
},
eurBoxText: {
  color: 'white',
  fontWeight: 'bold',
  fontSize:32,
  textAlign: 'center'
},
nameTextEU: {
	color: this.state.curCol,
  fontSize: 24,
  fontWeight: 'bold',
  textAlign: 'center'
},
nameTextS: {
  color:  this.state.curCol,
  fontSize: 24,
  fontWeight: 'bold',
  textAlign: 'center'
},
names: {
	height: 50
}
});
    if(this.state.ctry) {

  	var randomCtry = this.state.ctry
		
			return (
				<View style={styles.container}>	
				<View style={{marginLeft: 10, marginBottom: 12}}><Text style={{color: 'gray', fontSize: 12, fontWeight: 'bold'}}>You are in {this.state.ctryName}</Text></View>			
				<View style={{justifyContent: 'center'}}>
					<View style={{backgroundColor: 'black', height: 120, alignItems: 'center'}}><View style={styles.eurBoxEU}><Animatable.Text animation="slideInDown"style={styles.eurBoxText}>{moment().add(this.state.dayCount, 'days').format('MMM DD')}</Animatable.Text></View></View>
					<View style={{backgroundColor: 'black', height: 120}}><Animatable.Text animation="rotate" style={styles.europe}>{randomCtry.name}</Animatable.Text></View>				
				<View style={{height: 50}}><Text style={styles.other}>Days In Schengen Area :  {this.state.daysIn} </Text></View>
				<View><Text style={styles.other}>Days Left in Schengen Area: {this.state.daysLeft}</Text></View>
				</View>
				<View style={{justifyContent: 'flex-end'}}><Text style={styles.other}>Last Day in EU {moment().add(this.state.daysLeft, 'days').format("LL")}</Text></View>
				</View>
				)
		
}
    	return (
    <View style={styles.container}>
    	<View>
			
    	</View>
	</View>
      
    );
  }
}

