import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {FullHeightView} from '../common/components';
import commonStyles from '../common/styles';

const HomeScreen = (props) => {
  const menus = [
    {label: 'Order books Widget', navigation: 'OrderBooks'},
    {label: 'Trades Widget', navigation: 'Trades'},
    {label: 'Ticker Widget', navigation: 'Tickers'},
  ];

  return (
    <FullHeightView>
      <View style={styles.container}>
        {menus.map((menu, index) => {
          return (
            <Pressable
              onPress={() => props.navigation.navigate(menu.navigation)}
              key={index}>
              <View style={styles.card}>
                <Text style={styles.text}>{menu.label}</Text>
              </View>
            </Pressable>
          );
        })}
      </View>
    </FullHeightView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  card: {
    backgroundColor: commonStyles.colors.darkBlue,
    padding: 30,
    borderRadius: 25,
    width: 200,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  text: {
    color: 'white',
  },
});

export default HomeScreen;
