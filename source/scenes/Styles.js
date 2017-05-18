import { StyleSheet } from 'react-native';
// import EStyleSheet from 'react-native-extended-stylesheet';

const Styles = StyleSheet.create({

  // Comment explaining purpose of style class.
  // And where in the app it should be used.

  scene: { // generic view style
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  mapScene: { // Map.js
    flex: 1, // map expands to full vertical width
    justifyContent: 'center', // centers map icon vertically
    alignItems: 'center',  // centers map icon horizontally
    flexDirection: 'column', // vertical direction of layout
    flexWrap: 'wrap',
  },
  header: {
    justifyContent: 'flex-start',
    //marginTop: '10%', //if need space above address bar
  },
  footer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: '2%', // relative spacing between button and bottom of screen
  },
  twoway: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  errorText: {
    color: 'red',
  },
  titleText: { // FareEstimation
    fontFamily: 'Cochin',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  bodyText: { // FareEstimation
    fontSize: 20,
    textAlign: 'left',
  },
  backgroundImage: { // Welcome.js
    flex: 1, // background expands to full vertical width
  },
  buttonText: {
    fontSize: 20,
  },
  welcomeTitle: { // Welcome.js
    fontSize: 80,
    // fontFamily: 'alcubierre',
    color: 'navy',
    textAlign: 'center',
    marginTop: '2%',
  },
  welcomeSubtitle: { // Welcome.js
    fontSize: 25,
    color: 'navy',
    textAlign: 'center',
  },
});

const NativeStyles = {
  button: {
    marginTop: '5%',
    marginBottom: '5%',
  },
  mapdirectionOff: {
    flex: 0.5,
    backgroundColor: '#FFFFFF',
  },
  mapdirectionOn: {
    flex: 0.5,
    backgroundColor: '#80bfff',
  },
  scene: { // generic view style
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
};

export { Styles, NativeStyles };
