import React from 'react';
import {useDispatch} from 'react-redux';
import Tickers from './Tickers';
import {FullHeightView, Header} from '../../common/components';
import {useFocusEffect} from '@react-navigation/native';
import {tickerSlice} from '../../redux/reducers/tickerSlice';

const TickersContainer = (props) => {
  const dispatch = useDispatch();
  const ws = new WebSocket('wss://api-pub.bitfinex.com/ws/2');

  React.useEffect(() => {
    ws.onopen = () => {
      const msg = JSON.stringify({
        event: 'subscribe',
        channel: 'ticker',
        symbol: 'tBTCUSD',
      });

      ws.send(msg);
    };

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);

      if (data.event) {
        return;
      }

      const [channelId, value] = data;

      if (value.length > 2) {
        return dispatch(tickerSlice.actions.setTickers(value));
      }
    };

    ws.onerror = (e) => {
      // an error occurred
      console.log('error: ', e.message);
    };

    ws.onclose = (e) => {
      // connection closed
      console.log('close: ', e.code, e.reason);
    };
  }, [dispatch, ws]);

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused

      return () => {
        ws.close();
      };
    }, [ws]),
  );

  return (
    <FullHeightView>
      <Header navigation={props.navigation} />

      <Tickers {...props} />
    </FullHeightView>
  );
};

export default TickersContainer;
