import {SafeAreaView, StyleSheet, FlatList} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {colors} from '../Utils/GeneralStyles';
import {MainContext} from '../Context/Context';
import ProductItem from '../Components/ProductItem';

export default function Category({route}) {
  const {categoryItem, setCategoryItem, products} = useContext(MainContext);

  const filteredCategoryItem = () => {
    const categoryId = route.params.id;
    const filteredProducts = products.filter(
      product => product.categoryId === categoryId,
    );

    setCategoryItem(filteredProducts);
  };

  useEffect(() => {
    filteredCategoryItem();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={categoryItem}
        contentContainerStyle={styles.flatList}
        numColumns={2}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => {
          return (
            <ProductItem
              item={item}
              id={item.id}
              thumbnail={item.thumbnail}
              title={item.title}
              brand={item.brand}
              price={item.price}
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
    justifyContent: 'center',
    backgroundColor: colors.light,
  },
  flatList: {
    flexGrow: 1,
  },
});
