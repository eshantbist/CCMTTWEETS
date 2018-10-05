/** @format */

import {AppRegistry} from 'react-native';
import AppStackNavigator from './src/components/AppStackNavigator';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => AppStackNavigator);
