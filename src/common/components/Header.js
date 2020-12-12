import React from 'react';
import {Pressable, View, Text, StyleSheet} from 'react-native';

const Header = (props) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => props.navigation.goBack()}>
        <Text style={styles.text}>Go back</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    color: 'white',
  },
});

export default Header;
