import React from 'react';
import { Navigator } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Welcome from './Welcome.js';

EStyleSheet.build({
});

export default function App() {
  return (
    <Navigator
      initialRoute={{ component: Welcome }}
      renderScene={(route, navigator) => (
        <route.component navigator={navigator} {...route.props} />
        )
      }
    />
  );
}
