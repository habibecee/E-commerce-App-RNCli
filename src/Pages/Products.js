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
import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import axiosInstance from '../Utils/axios';
import {ProductsProps} from '../Types/Types';
import {colors, fonts} from '../Utils/GeneralStyles';
import {MainContext} from '../Context/Context';

export default function Products() {
  const {navigate, setOptions} = useNavigation();

  const {products} = useContext(MainContext);

  useLayoutEffect(() => {
    setOptions({
      headerRight: () => {
        return <Button title="Cart" onPress={() => navigate('Cart')} />;
      },
      headerLeft: () => {
        return (
          <Button
            title="Add Product"
            onPress={() => navigate('ProductCreate')}
          />
        );
      },
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={products}
        renderItem={item => {
          return (
            <TouchableOpacity
              key={item.item.id}
              onPress={() => {
                navigate('Product', {id: item.item.id});
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.bgLight,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  ButtonCart: {
    color: colors.textDark,
  },
  productContainer: {
    flexDirection: 'row',
    gap: 10,
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
    fontSize: 18,
    color: colors.textDark,
  },

  editIconContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 10,
    marginLeft: 10,
  },
});
