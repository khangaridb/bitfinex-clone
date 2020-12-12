import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import OrderBooksContainer from './screens/orderbooks/OrderBooksContainer';
import TradesContainer from './screens/trades/TradesContainer';
import TickersContainer from './screens/tickers/TickersContainer';

const Navigations = () => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" headerMode="none">
        <Stack.Screen name="Home" component={HomeScreen} />

        <Stack.Screen name="OrderBooks" component={OrderBooksContainer} />

        <Stack.Screen name="Trades" component={TradesContainer} />

        <Stack.Screen name="Tickers" component={TickersContainer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigations;
