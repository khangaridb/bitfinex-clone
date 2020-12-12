import React from 'react';
import {useDispatch} from 'react-redux';
import OrderBooks from './OrderBooks';
import {orderBookSlice} from '../../redux/reducers/orderBookSlice';
import {FullHeightView, Header} from '../../common/components';
import WebsocketWrapper from '../../common/components/WebsocketWrapper';

const OrderBooksContainer = (props) => {
  const dispatch = useDispatch();

  return (
    <WebsocketWrapper
      initMsg={{
        event: 'subscribe',
        channel: 'book',
        symbol: 'tBTCUSD',
        prec: 'P0',
        freq: 'F1',
        len: '25',
      }}
      onMessage={(data) => {
        if (data.event) {
          return;
        }

        const [channelId, value] = data;

        if (value.length > 3) {
          return dispatch(orderBookSlice.actions.setOrderBooks(value));
        }

        return dispatch(orderBookSlice.actions.updateBook(value));
      }}>
      {({isOpen}) => (
        <FullHeightView>
          <Header navigation={props.navigation} webSocketStatus={isOpen} />

          <OrderBooks {...props} />
        </FullHeightView>
      )}
    </WebsocketWrapper>
  );
};

export default OrderBooksContainer;
