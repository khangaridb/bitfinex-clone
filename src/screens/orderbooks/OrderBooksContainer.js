import React from 'react';
import {useDispatch} from 'react-redux';
import OrderBooks from './OrderBooks';
import {orderBookSlice} from '../../redux/reducers/orderBookSlice';
import {FullHeightView, Header} from '../../common/components';
import {useFocusEffect} from '@react-navigation/native';

const OrderBooksContainer = (props) => {
  const dispatch = useDispatch();
  const ws = new WebSocket('wss://api-pub.bitfinex.com/ws/2');

  React.useEffect(() => {
    ws.onopen = () => {
      const msg = JSON.stringify({
        event: 'subscribe',
        channel: 'book',
        symbol: 'tBTCUSD',
        prec: 'P0',
        freq: 'F0',
        len: '25',
      });

      ws.send(msg);
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

      <OrderBooks {...props} />
    </FullHeightView>
  );
};

export default OrderBooksContainer;
