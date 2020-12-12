import React from 'react';
import commonStyles from '../styles';
import {StyleSheet, View} from 'react-native';

const FullHeightView = (props) => {
  return <View style={styles.container}>{props.children}</View>;
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: commonStyles.colors.lightBlue,
  },
});

export default FullHeightView;
