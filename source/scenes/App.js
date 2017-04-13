import React from 'react';
import { Navigator } from 'react-native';

import Welcome from './Welcome.js';


export default function App() {
  return (
    <Navigator
      initialRoute={{ component: Welcome }}
      renderScene={(route, navigator) =>
          React.createElement(route.component, { navigator })
      }
    />
  );
}
