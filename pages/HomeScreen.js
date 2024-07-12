import React, { useState, useEffect } from 'react';
import banner from '../assets/banner.png'
import bell from '../assets/bell.png'
import bill from '../assets/bill.png'
import defaultImg from '../assets/default.png'
import disabled from '../assets/disabled.jpg'
import CustomAlert from './CustomAlert'
//import LinearGradient from 'react-native-linear-gradient'
import {
 TableButtonCollection
} from '@aws-amplify/ui-react-native'

import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  Button
} from 'react-native';
//import PushNotification from 'react-native-push-notification';
var selButton = null
const HomeScreen  = () => {
  const [buttons, setButtons] = useState(
    Array.from({ length: 20 }, () => ({
      state: null,
      type: null,
      id : 0,
      startTime: Date.now(),
      elapsedTime: 0
    }))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setButtons((prevButtons) =>
        prevButtons.map((button,index) => {
            if (index > 10)    {button.state = 'disabled' ; button.type = 'disabled'}

          if (!button.startTime || button.state == 'disabled') return button;
          var elTime  = (Date.now() - button.startTime) / 1000 ;
          button.elapsedTime = Math.ceil(elTime)
          if (elTime > 60) {button.state = 'alarm' ; button.type = 'bill'}
          else if (elTime > 30)  {button.state = 'warning' ; button.type = 'attention'}
          else if (elTime > 10)  {button.state = 'call' ; button.type = 'attention'}

           return button;
        })
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleButtonPress = (index) => {

   const currentButton = buttons[index];

       const elapsedTime = currentButton.startTime
         ? Math.floor((Date.now() - currentButton.startTime) / 1000)
         : 0;
       Alert.alert(
         `Button ${index + 1}`,
         `Time since color change: ${elapsedTime} seconds`,
         [
           {
             text: 'Cancel',
             borderRadius: 10,
           },
           {
             text: 'OK',
             onPress: () => handleReset(index),
           },
         ]
       );
  };

  const handleReset = (index) => {
    setButtons((prevButtons) =>
      prevButtons.map((button, i) =>
        i === index
          ? { color: 'transparent', startTime: Date.now() }
          : button
      )
    );
  };
const getImageSource = (type) => {
    switch (type) {
      case 'bill':
        return (bill);
      case 'attention':
        return (bell);
      case 'disabled':
              return (disabled);
      default:
        return (defaultImg);
    }
  };

  const renderButtons = () => {
    return buttons.map((button, index) => (

    <TouchableOpacity
        key={index}
        style={[styles.buttonContainer, buttonColorStyle(button.state)]}
        onPress={() => handleButtonPress(index)}
      >
        <Button title="S" />
    </TouchableOpacity>

    ));
  };

  const buttonColorStyle = (state) => {

    switch (state) {
      case 'disabled':
          return styles.buttonDisabled;
      case 'call':
        return styles.buttonCall;
      case 'warning':
        return styles.buttonOrange;
      case 'alarm':
        return styles.buttonRed;
      default:
        return styles.buttonDefault;
    }
  };

  return (
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.banner}>
            <Image source= {banner}
            style={styles.bannerImage} />
        </View>
        <Text style = {styles.userText}>  Captain: Surendra </Text>
        <View style={styles.grid}>{renderButtons()}</View>

      </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  bannerImage:{
      height: 60,
      objectFit: 'contain',
  },
  banner: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerText: {
    color: '#fff',
    fontSize: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    justifyContent: 'space-between',
  },
  buttonContainer: {
    width: '22%',
    margin: '1%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius : 20,
    alignItems: 'stretch',
    justifyContent : 'stretch',
  },
   buttonText: {
      color: '#fff',
      fontSize: 14,
    },
  buttonImage: {
    width: 40,
    height: 40,
  },
  buttonDefault: {
    backgroundColor: 'transparent',
  },

  buttonCall: {
    backgroundColor: 'green',
  },
  buttonOrange: {
    backgroundColor: 'orange',
  },
  buttonRed: {
    backgroundColor: 'red',
  },
  buttonGrad: {
      flex: 1,
      borderRadius: 15,
      bottom: '15%',
      right: '10%',
    },
    buttonParent: {
      flex: 1,
      alignItems: 'stretch',
      justifyContent : 'stretch',
      flexDirection: 'row',
      borderRadius: 10,
    },
  userText: {
      color: 'red',
      fontSize: 20,
      alignItems: 'center'
    },
  buttonDisabled: {
      backgroundColor: 'transparent'
      }
});

export default HomeScreen ;
