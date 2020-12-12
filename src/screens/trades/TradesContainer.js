import React from 'react';
import {useDispatch} from 'react-redux';
import {FullHeightView, Header} from '../../common/components';
import {tradeSlice} from '../../redux/reducers/tradeSlice';
import {useFocusEffect} from '@react-navigation/native';
import Trades from './Trades';

const TradesContainer = (props) => {
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
        channel: 'trades',
        symbol: 'tBTCUSD',
      });

      ws.current.send(msg);
      setIsOpen(true);
    };

    ws.current.onmessage = (e) => {
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

      <Trades {...props} />
    </FullHeightView>
  );
};

export default TradesContainer;
