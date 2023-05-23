import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React from 'react';
import {colors, fonts} from '../Utils/GeneralStyles';
import {useNavigation} from '@react-navigation/native';

const ProductItem = ({item, id, thumbnail, title, brand, price}) => {
  const {navigate} = useNavigation();

  return (
    <TouchableOpacity
      style={styles.productContainer}
      key={id}
      onPress={() => {
        navigate('Product', {id});
      }}>
      <View style={styles.productImageContainer}>
        <Image source={{uri: thumbnail}} style={styles.productImage} />
      </View>
      <Text style={styles.productTitle}>{title}</Text>
      <Text style={styles.productBrand}>{brand}</Text>
      <Text style={styles.productPrice}>- {price}$ -</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    flex: 1,
    width: 200,
    height: 350,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.bgLight,
    borderRadius: 10,
    gap: 15,
    margin: 10,
    backgroundColor: colors.tertiary,
    shadowColor: colors.dark,
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },

  productImageContainer: {
    width: 195,
    height: 200,
  },
  productImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },

  productTitle: {
    fontFamily: fonts.bold,
    fontSize: 18,
    color: colors.textDark,
  },

  productBrand: {
    fontFamily: fonts.semiBold,
    fontSize: 16,
    color: colors.textPrimary,
  },

  productPrice: {
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.textSecondary,
  },
});

export default ProductItem;
