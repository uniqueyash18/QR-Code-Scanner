import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import App from './App';
import { I18nextProvider } from 'react-i18next';
import i18next from './src/constants/lang/index';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import store from './src/redux/store';

const RootComponent = () => (
  <Provider store={store}>
    <I18nextProvider i18n={i18next}>
    <App />
  </I18nextProvider>
  </Provider>
);

AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(RootComponent));