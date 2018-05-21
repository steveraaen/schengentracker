import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList, 
  Dimensions
} from 'react-native';
import { CalendarList} from 'react-native-calendars';

export default class Cal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			daysIn: 0,
			daysLeft: 90,
			markedDates: {},
		}
		this.onDayPress = this.onDayPress.bind(this)
	}
	onDayPress(day) {
		const markedDates = Object.assign({}, this.state.markedDates)
			
	      markedDates[day.dateString]= {selected: true,  color:  '#000099'}
    		
    		this.setState({
    			markedDates: markedDates,
    			daysIn: this.state.daysIn + 1,
    			daysLeft: this.state.daysLeft - 1,
    		})

	}

	render() {
	const marked={}
	var width = Dimensions.get('window').width;
    var height = Dimensions.get('window').height;
	const styles = StyleSheet.create({
	  container: {
		  	flexDirection: "row",
		  	marginTop: 30,
		  	justifyContent: 'center',
		  	marginLeft: width * .03,
		  	marginRight: width * .03,
		  	height: height * .65
	  },
	  lines: {
			width: width, 
			height: height * .04, 
			alignSelf: 'stretch', 
			marginTop: 2,  
			paddingTop: 2,  
			backgroundColor: '#000099',
			color: "#FFCC00",
			fontSize: 14,
			fontWeight: 'bold',
			textAlign: 'center'		
	  },
  	   instructions: {
  	   	flex: 1,
  	   	alignSelf: 'stretch',
		  	marginTop: 16,
		  	marginBottom: 16,
		  	height: 20
	  },
	   days: {
	   	flex: 1,
	   	flexDirection: 'row',
	   	alignSelf: 'stretch',
		  	marginTop: 20,
		  	marginBottom: 20,
		  	height: 40,
		  	marginLeft: 20,
		  	width: width,	 	
	  },

	});
		return (
	<View>
		<View style = {styles.instructions}>
			<Text style={{fontSize: 18, fontWeight: 'bold', textAlign: 'center'}}>
				Select the days you were in Europe
			</Text>		
 		</View>
 		<View style={styles.days}>
 			<View style={{flex:2, alignContent: 'flex-start'}}>
 				<Text style={{fontSize: 16, fontWeight: 'bold'}}>Days Used</Text>
 				<Text style={{fontSize: 20, fontWeight: 'bold'}}>{this.state.daysIn}</Text>
 			</View>
 			<View style={{flex:2, alignContent: 'flex-end'}}>
 				<Text style={{fontSize: 16, fontWeight: 'bold'}} >Days Left</Text>
 				<Text style={{fontSize: 16, fontWeight: 'bold'}} >{this.state.daysLeft}</Text>
 			</View>

 		</View>
			<View style={styles.container}>
			  <CalendarList
				style={{
				borderWidth: 1,
				borderColor: 'gray'
				}}
				current={this.props.navigation.state.params.start}
				minDate={this.props.navigation.state.params.start}
				maxDate={this.props.navigation.state.params.today}
				pastScrollRange={0}
				futureScrollRange={6}
				onDayPress={(day) => {this.onDayPress(day)}}
				markingType={'period'}
				monthFormat={'MMMM yyyy'}
				markedDates={this.state.markedDates}
				/>
			</View>
	</View>
			)
	}
}