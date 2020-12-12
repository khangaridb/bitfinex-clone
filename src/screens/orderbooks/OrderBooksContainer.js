import React from 'react';
import {useDispatch} from 'react-redux';
import OrderBooks from './OrderBooks';
import {orderBookSlice} from '../../redux/reducers/orderBookSlice';
import {FullHeightView, Header} from '../../common/components';
import {useFocusEffect} from '@react-navigation/native';

const OrderBooksContainer = (props) => {
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
        channel: 'book',
        symbol: 'tBTCUSD',
        prec: 'P0',
        freq: 'F1',
        len: '25',
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

      if (value.length > 3) {
        return dispatch(orderBookSlice.actions.setOrderBooks(value));
      }

      return dispatch(orderBookSlice.actions.updateBook(value));
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
      return () => {
        console.log('about to disconnect');
        ws.close(1);
      };
    }, [ws]),
  );

  return (
    <FullHeightView>
      <Header navigation={props.navigation} webSocketStatus={isOpen} />

      <OrderBooks {...props} />
    </FullHeightView>
  );
};

export default OrderBooksContainer;
