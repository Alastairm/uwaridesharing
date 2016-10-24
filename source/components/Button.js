import React, { Component } from 'react';
import Button from 'react-native-button';

function buttona1(props) {
return(
<Button
containerStyle={{padding:10, height:45, overflow:'hidden', borderRadius:4, backgroundColor: 'white'}}
   style={{fontSize: 20, color: 'green'}}>)
   <View buttonMess="button-message">
   {props.message}
   </View>
   </Button>
   );
}

function callbutton(){
return(
<button
message="hello or press me")/>
);

}
