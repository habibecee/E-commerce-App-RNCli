import {SafeAreaView, StyleSheet, FlatList, Text} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {colors, fonts} from '../Utils/GeneralStyles';
import {MainContext} from '../Context/Context';
import ProductItem from '../Components/ProductItem';
import {useNavigation} from '@react-navigation/native';

export default function Category({route}) {
  const navigation = useNavigation();
  const {categories, categoryItem, setCategoryItem, products} =
    useContext(MainContext);

  const categoryId = route.params.id;

  const filteredCategoryItems = () => {
    const filteredProducts = products.filter(
      product => product.categoryId === categoryId,
    );

    setCategoryItem(filteredProducts);
  };

  const getCategoryName = categoryId => {
    const selectedCategory = categories.find(
      category => category.id === categoryId,
    );
    return selectedCategory ? selectedCategory.name : '';
  };

  const selectedCategoryName = getCategoryName(categoryId);

  const updateNavigationTitle = () => {
    navigation.setOptions({title: selectedCategoryName});
  };

  useEffect(() => {
    filteredCategoryItems();
    updateNavigationTitle();
  }, [categoryId]);

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

  categoryName: {
    fontSize: 24,
    fontFamily: fonts.bold,
    textAlign: 'center',
    marginBottom: 10,
  },

  flatList: {
    flexGrow: 1,
  },
});
