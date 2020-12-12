import React from 'react';
import {useDispatch} from 'react-redux';
import Tickers from './Tickers';
import {FullHeightView, Header} from '../../common/components';
import {useFocusEffect} from '@react-navigation/native';
import {tickerSlice} from '../../redux/reducers/tickerSlice';

const TickersContainer = (props) => {
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
        channel: 'ticker',
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
      if (waitingToReconnect) {
        return;
      }

      // Parse event code and log
      setIsOpen(false);
      console.log('ws closed');

      // Setting this will trigger a re-run of the effect,
      // cleaning up the current websocket, but not setting
      // up a new one right away
      setWaitingToReconnect(true);

      // This will trigger another re-run, and because it is false,
      // the socket will be set up again
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

      <Tickers {...props} />
    </FullHeightView>
  );
};

export default TickersContainer;
