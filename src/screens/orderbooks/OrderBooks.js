import React from 'react';
import {View, FlatList, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import {TableRow} from '../../common/components';

const OrderBooks = (props) => {
  const orderBooks = useSelector((state) => state.orderBook);

  const {asks, bids} = orderBooks;

  const renderItem = ({item}, type) => {
    let col = bids;

    if (type === 'asks') {
      col = asks;
    }

    const value = col[item];

    let cellValues = [value.price, value.amount];
    let textStyle = {textAlign: 'left'};

    if (type === 'asks') {
      cellValues = [value.amount, value.price];
      textStyle = {textAlign: 'right'};
    }

    return (
      <TableRow
        cellValues={cellValues}
        rowStyle={{borderWidth: 1, padding: 5}}
        textStyle={textStyle}
      />
    );
  };

  return (
    <ScrollView>
      <View style={{flexDirection: 'row'}}>
        <FlatList
          data={Object.keys(asks)}
          style={{paddingLeft: 10}}
          ListHeaderComponent={
            <TableRow
              rowStyle={{
                marginBottom: 10,
              }}
              textStyle={{textAlign: 'center'}}
              cellValues={['Total', 'Price']}
            />
          }
          renderItem={(item) => renderItem(item, 'asks')}
          keyExtractor={(item) => item}
        />

        <FlatList
          data={Object.keys(bids)}
          style={{paddingRight: 10}}
          ListHeaderComponent={
            <TableRow
              textStyle={{textAlign: 'center'}}
              rowStyle={{marginBottom: 10}}
              cellValues={['Price', 'Total']}
            />
          }
          renderItem={(item) => renderItem(item, 'bids')}
          keyExtractor={(item) => item}
        />
      </View>
    </ScrollView>
  );
};

export default OrderBooks;
