import {SafeAreaView, StyleSheet, FlatList} from 'react-native';
import React, {useContext, useLayoutEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../Utils/GeneralStyles';
import {MainContext} from '../Context/Context';
import ProductItem from '../Components/ProductItem';
import HeaderButtons from '../Components/HeaderButtons';

export default function Products() {
  const {navigate, setOptions} = useNavigation();

  const {products} = useContext(MainContext);

  useLayoutEffect(() => {
    setOptions({
      title: 'Product List',
      headerRight: () => {
        return (
          <HeaderButtons
            name="heart-sharp"
            size={24}
            color={colors.red}
            onPress={() => navigate('Favorite')}
            style={{paddingRight: 20}}
          />
        );
      },
      headerLeft: () => {
        return (
          <HeaderButtons
            name="add-circle-sharp"
            size={24}
            color={colors.darkBlue}
            onPress={() => navigate('ProductCreate')}
            style={{paddingLeft: 20}}
          />
        );
      },
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={products}
        contentContainerStyle={styles.flatList}
        numColumns={2}
        keyExtractor={(item, index) => item.id.toString()}
        renderItem={item => {
          return (
            <ProductItem
              item={item}
              id={item.item.id}
              thumbnail={item.item.thumbnail}
              title={item.item.title}
              brand={item.item.brand}
              price={item.item.price}
            />
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.bgLight,
  },

  flatList: {
    flexGrow: 1,
  },
});
