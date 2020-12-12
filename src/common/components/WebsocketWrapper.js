import React from 'react';
import {useFocusEffect} from '@react-navigation/native';

const WithWebsocket = (props) => {
  const [waitingToReconnect, setWaitingToReconnect] = React.useState(null);
  const [isOpen, setIsOpen] = React.useState(false);

  const {initMsg, onMessage} = props;

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
        ...initMsg,
      });

      ws.current.send(msg);
      setIsOpen(true);
    };

    ws.current.onmessage = (e) => {
      const data = JSON.parse(e.data);

      onMessage(data);
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
  }, [initMsg, waitingToReconnect, onMessage]);

  return props.children({
    isOpen,
  });
};

export default WithWebsocket;
