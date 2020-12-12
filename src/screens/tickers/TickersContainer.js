import React from 'react';
import {useDispatch} from 'react-redux';
import Tickers from './Tickers';
import {FullHeightView, Header} from '../../common/components';
import {tickerSlice} from '../../redux/reducers/tickerSlice';
import WebsocketWrapper from '../../common/components/WebsocketWrapper';

const TickersContainer = (props) => {
  const dispatch = useDispatch();

  return (
    <WebsocketWrapper
      initMsg={{
        event: 'subscribe',
        channel: 'ticker',
        symbol: 'tBTCUSD',
      }}
      onMessage={(data) => {
        if (data.event) {
          return;
        }

        const [channelId, value] = data;

        if (value.length > 2) {
          return dispatch(tickerSlice.actions.setTickers(value));
        }
      }}>
      {({isOpen}) => (
        <FullHeightView>
          <Header navigation={props.navigation} webSocketStatus={isOpen} />

          <Tickers {...props} />
        </FullHeightView>
      )}
    </WebsocketWrapper>
  );
};

export default TickersContainer;
