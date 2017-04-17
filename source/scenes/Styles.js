import { StyleSheet } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const Styles = EStyleSheet.create({
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
    marginBottom: '2%', // relative spacing between button and bottom of screen
  },
  // baseText: { unable to find location in app
  //   fontFamily: 'Cochin',
  // },
  titleText: { // FareEstimation
    fontFamily: 'Cochin',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    textAlign: 'left',
  },
  bodyText: { // FareEstimation
    fontSize: '1rem',
    textAlign: 'left',
  },
  backgroundImage: { // Welcome.js
    flex: 1, // background expands to full vertical width
  },
  welcomeTitle: { // Welcome.js
    fontSize: '5.5rem', // relative sizing for title
    color: 'navy',
    textAlign: 'center',
    marginTop: '2%',
  },
  welcomeSubtitle: { // Welcome.js
    fontSize: '1.5rem', // relative sizing for subtitle
    color: 'navy',
    textAlign: 'center',
  },
});

export default Styles;
