import React from 'react';
import {useDispatch} from 'react-redux';
import OrderBooks from './OrderBooks';
import {orderBookSlice} from '../../redux/reducers/orderBookSlice';
import {FullHeightView, Header} from '../../common/components';
import {useFocusEffect} from '@react-navigation/native';

const OrderBooksContainer = (props) => {
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
        channel: 'book',
        symbol: 'tBTCUSD',
        prec: 'P0',
        freq: 'F1',
        len: '25',
      });

      ws.current.send(msg);
      setIsOpen(true);
    };

    ws.current.onmessage = (e) => {
      const data = JSON.parse(e.data);

      if (data.event) {
        return;
      }

      console.log(data);

      const [channelId, value] = data;

      if (value.length > 3) {
        return dispatch(orderBookSlice.actions.setOrderBooks(value));
      }

      return dispatch(orderBookSlice.actions.updateBook(value));
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

      <OrderBooks {...props} />
    </FullHeightView>
  );
};

export default OrderBooksContainer;
