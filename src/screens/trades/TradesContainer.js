import React from 'react';
import {useDispatch} from 'react-redux';
import {FullHeightView, Header} from '../../common/components';
import {tradeSlice} from '../../redux/reducers/tradeSlice';
import {useFocusEffect} from '@react-navigation/native';
import Trades from './Trades';

const TradesContainer = (props) => {
  const dispatch = useDispatch();
  const ws = new WebSocket('wss://api-pub.bitfinex.com/ws/2');

  const [waitingToReconnect, setWaitingToReconnect] = React.useState(null);
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    if (waitingToReconnect) {
      return;
    }
    ws.onopen = () => {
      const msg = JSON.stringify({
        event: 'subscribe',
        channel: 'trades',
        symbol: 'tBTCUSD',
      });

      ws.send(msg);
      setIsOpen(true);
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

    ws.onclose = (e) => {
      console.log('ws closed');

      if (waitingToReconnect) {
        return;
      }

      setIsOpen(false);
      setWaitingToReconnect(true);

      setTimeout(() => {
        console.log('trying to reconnect again');
        setWaitingToReconnect(null);
      }, 5000);
    };
  }, [dispatch, ws, waitingToReconnect]);

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
      <Header navigation={props.navigation} webSocketStatus={isOpen} />

      <Trades {...props} />
    </FullHeightView>
  );
};

export default TradesContainer;
