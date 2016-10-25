import { StyleSheet } from 'react-native';

export default Styles = StyleSheet.create({
  scene: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  mapScene: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  header: {
    justifyContent: 'flex-start',
  },
  footer: {
    justifyContent: 'flex-end',
  },
  locationIcon: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonBox: {
    padding:10,
    height:45,
    width:320,
    overflow:'hidden',
    borderRadius:4,
    backgroundColor: 'steelblue'},
  buttonContainer: {
    height: 60,
    alignItems: 'center'
  },
  baseText: {
    fontFamily: 'Cochin',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  bodyText: {
    fontSize: 15,
    textAlign: 'left',
  }
});
