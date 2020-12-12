import React from 'react';
import {useDispatch} from 'react-redux';
import {FullHeightView, Header} from '../../common/components';
import {tradeSlice} from '../../redux/reducers/tradeSlice';
import {useFocusEffect} from '@react-navigation/native';
import Trades from './Trades';

const TradesContainer = (props) => {
  const dispatch = useDispatch();
  const ws = new WebSocket('wss://api-pub.bitfinex.com/ws/2');

  React.useEffect(() => {
    ws.onopen = () => {
      const msg = JSON.stringify({
        event: 'subscribe',
        channel: 'trades',
        symbol: 'tBTCUSD',
      });

      ws.send(msg);
    };

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);

      if (data.event) {
        return;
      }

      if (data.length === 2) {
        const [channelId, value] = data;

        if (value.length > 4) {
          return dispatch(tradeSlice.actions.setTrades(value));
        }

        return;
      }

      const [channelId, type, value] = data;

      return dispatch(tradeSlice.actions.updateTrade(value));
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

      <Trades {...props} />
    </FullHeightView>
  );
};

export default TradesContainer;
