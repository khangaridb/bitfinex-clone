import React from 'react';
import {useDispatch} from 'react-redux';
import Tickers from './Tickers';
import {FullHeightView, Header} from '../../common/components';
import {useFocusEffect} from '@react-navigation/native';
import {tickerSlice} from '../../redux/reducers/tickerSlice';

const TickersContainer = (props) => {
  const dispatch = useDispatch();
  const [waitingToReconnect, setWaitingToReconnect] = React.useState(null);
  const [isOpen, setIsOpen] = React.useState(false);

  const ws = React.useRef(null);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        ws.current.close();
      };
    }, [ws]),
  );

  React.useEffect(() => {
    if (waitingToReconnect) {
      return;
    }

    ws.current = new WebSocket('wss://api-pub.bitfinex.com/ws/2');

    ws.current.onopen = () => {
      const msg = JSON.stringify({
        event: 'subscribe',
        channel: 'ticker',
        symbol: 'tBTCUSD',
      });

      ws.current.send(msg);
      setIsOpen(true);
    };

    ws.current.onmessage = (e) => {
      const data = JSON.parse(e.data);
      console.log(e.data);
      if (data.event) {
        return;
      }

      const [channelId, value] = data;

      if (value.length > 2) {
        return dispatch(tickerSlice.actions.setTickers(value));
      }
    };

    ws.current.onclose = (e) => {
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
  }, [dispatch, waitingToReconnect]);

  return (
    <FullHeightView>
      <Header navigation={props.navigation} webSocketStatus={isOpen} />

      <Tickers {...props} />
    </FullHeightView>
  );
};

export default TickersContainer;
