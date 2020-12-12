import React from 'react';
import {useDispatch} from 'react-redux';
import {FullHeightView, Header} from '../../common/components';
import {tradeSlice} from '../../redux/reducers/tradeSlice';
import Trades from './Trades';
import WebsocketWrapper from '../../common/components/WebsocketWrapper';

const TradesContainer = (props) => {
  const dispatch = useDispatch();

  return (
    <WebsocketWrapper
      initMsg={{
        event: 'subscribe',
        channel: 'trades',
        symbol: 'tBTCUSD',
      }}
      onMessage={(data) => {
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
      }}>
      {({isOpen}) => (
        <FullHeightView>
          <Header navigation={props.navigation} webSocketStatus={isOpen} />

          <Trades {...props} />
        </FullHeightView>
      )}
    </WebsocketWrapper>
  );
};

export default TradesContainer;
