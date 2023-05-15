import {
  View,
  Text,
  Button,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import axiosInstance from '../Utils/axios';
import {ProductsProps} from '../Types/Types';
import Product from './Product';
import {colors, fonts} from '../Utils/GeneralStyles';

export default function Products() {
  const [products, setProducts] = useState<ProductsProps | []>([]);
  const navigation = useNavigation();

  const fetchProducts = () => {
    axiosInstance.get('products').then(response => {
      setProducts(response.data);
    });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <Button title="Cart" onPress={() => navigation.navigate('Cart')} />
        );
      },
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={products}
        renderItem={item => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Product', {id: item.item.id});
              }}>
              <View style={styles.productContainer}>
                <Image
                  source={{uri: item.item.thumbnail}}
                  style={styles.productImage}
                />
                <Text style={styles.productTitle}>{item.item.title}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
      {/* <View>
        <Text>Products</Text>
        <Button
          title="Go Details"
          onPress={() => navigation.navigate('Product')}
        />
      </View> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: colors.bgLight,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  ButtonCart: {
    color: colors.textDark,
  },
  productContainer: {
    flexDirection: 'row',
    gap: 20,
    marginVertical: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
    paddingBottom: 10,
    shadowColor: colors.dark,
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },

  productTitle: {
    fontFamily: fonts.bold,
    fontSize: 20,
    color: colors.textDark,
  },
});
