import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const TableRow = (props) => {
  const {cellValues} = props;

  return (
    <View style={[styles.row, props.rowStyle]}>
      {cellValues.map((value) => {
        return (
          <View style={styles.cell}>
            <Text style={[styles.textStyle, props.textStyle]}>{value}</Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row',
  },
  cell: {
    flex: 1,
    alignSelf: 'stretch',
  },
  textStyle: {
    color: 'white',
  },
});

export default TableRow;
