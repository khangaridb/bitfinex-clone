import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './redux/store';
import 'react-native-gesture-handler';
import OrderBooks from './screens/orderbooks/OrderBooksContainer';
import TradesContainer from './screens/trades/TradesContainer';
import Navigations from './Navigations';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navigations />
      </PersistGate>
    </Provider>
  );
};

export default App;
