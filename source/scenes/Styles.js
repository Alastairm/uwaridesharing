import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
  // Comment explaining purpose of style class.
  // And where in the app it should be used.
  scene: {
    ...StyleSheet.absoluteFillObject, // Comment describing purpose of each line.
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
    alignItems: 'center',
  },
  baseText: {
    fontFamily: 'Cochin',
  },
  titleText: {
    fontFamily: 'Cochin',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  bodyText: {
    fontSize: 15,
    textAlign: 'left',
  },
  backgroundImage: {
    flex: 1,
    height: null,
    width: null,
  },
  welcomeTitle: {
    fontSize: 108,
    color: 'navy',
    textAlign: 'center',
  },
  welcomeSubtitle: {
    fontSize: 24,
    color: 'navy',
    textAlign: 'center',
  },
});

export default Styles;
