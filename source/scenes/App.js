import React from 'react';
import { Navigator } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import UserForm from './UserForm.js';

EStyleSheet.build({
});

export default function App() {
  return (
    <Navigator
      initialRoute={{ component: UserForm }}
      renderScene={(route, navigator) => (
        <route.component navigator={navigator} {...route.props} />
        )
      }
    />
  );
}
