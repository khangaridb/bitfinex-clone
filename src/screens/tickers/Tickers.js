import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {FullHeightView} from '../../common/components';

const Tickers = () => {
  const tickers = useSelector((state) => state.ticker);

  return (
    <FullHeightView>
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.text}>BTC/USD</Text>
          <Text style={styles.text}>{tickers.ticker.lastPrice || 0}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.text}>
            VOL {parseFloat(tickers.ticker.volume || 0).toPrecision(5)}
            BTC
          </Text>
          <Text style={styles.text}>
            {parseFloat(tickers.ticker.dailyChange || 0).toPrecision(4)} (
            {parseFloat(
              tickers.ticker.dailyChangeRelative * 100 || 0,
            ).toPrecision(2)}
            %)
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.text}>LOW {tickers.ticker.low || 0}</Text>
          <Text style={styles.text}>HIGH {tickers.ticker.high || 0}</Text>
        </View>
      </View>
    </FullHeightView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginLeft: 20,
    marginRight: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    color: 'white',
  },
});

export default Tickers;
