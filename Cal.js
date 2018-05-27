import React from 'react'
import moment from 'moment' // 2.20.1
import { Animated, Button, StyleSheet, Image, Text, View } from 'react-native';

class Cal extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      vowels: ["A","E","I","O","U"],
      fullStr: ["U","N","D","E","R","B","U","I","L","T"],
      shortStr: ["N","D","R","B","L","T"],
      fadeAnim: new Animated.Value(0)
    } 
  }
  componentDidMount() {
    
    Animated.timing(this.state.fadeAnim,{toValue: 1, duration: 5000}).start();  
} 
  render() {
    let { fadeAnim } = this.state;

    var formatArr = []
    for(let i = 0; i < this.state.fullStr.length; i++) {
       formatArr.push(<Animated.View style={{flex: 1 / this.state.fullStr.length, flex: fadeAnim }}><Text style={{fontSize: 32, fontWeight: 'bold', textAlign: 'center'}}>{this.state.fullStr[i]}</Text></Animated.View>) 
    }

    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <View style={{alignItems: 'center', flex: 1, flexDirection: 'row', flexWrap: "wrap", color: 'black'}}>{formatArr}</View>

      </View>
    );
  }
}

export default Cal