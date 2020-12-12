import React from 'react';
import {Pressable, View, Text, StyleSheet} from 'react-native';

const Header = (props) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => props.navigation.goBack()}>
        <Text style={styles.text}>Go back</Text>
      </Pressable>

      <Text style={styles.text}>
        Websocket status: {props.webSocketStatus.toString() || ''}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 70,
    justifyContent: 'space-between',
    padding: 20,
    flexDirection: 'row',
  },
  text: {
    color: 'white',
  },
});

export default Header;
