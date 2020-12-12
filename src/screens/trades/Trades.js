import React from 'react';
import {FlatList, View} from 'react-native';
import {useSelector} from 'react-redux';
import moment from 'moment';
import {FullHeightView, TableRow} from '../../common/components';

const Trades = () => {
  const trades = useSelector((state) => state.trade);

  const renderItem = ({item}) => {
    return (
      <TableRow
        rowStyle={{borderWidth: 1, padding: 5}}
        cellValues={[
          moment.utc(item.mts).format('h:mm:ss'),
          item.price,
          item.amount,
        ]}
      />
    );
  };

  return (
    <FullHeightView>
      <FlatList
        data={trades.list}
        ListHeaderComponent={
          <TableRow
            rowStyle={{marginBottom: 10}}
            cellValues={['Time', 'Price', 'Amount']}
          />
        }
        style={{paddingLeft: 10, paddingRight: 10}}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${index}`}
      />
    </FullHeightView>
  );
};

export default Trades;
