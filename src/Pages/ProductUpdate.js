import {Alert, SafeAreaView} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import axiosInstance from '../Utils/axios';
import {MainContext} from '../Context/Context';
import ProductChanges from '../Components/ProductChanges';

export default function ProductUpdate(props) {
  const {fetchProducts} = useContext(MainContext);
  const {navigate} = useNavigation();
  const [product, setProduct] = useState(props.route.params);

  const onChangeUpdate = (key, value) => {
    setProduct({...product, [key]: value});
  };

  function productUpdate() {
    axiosInstance
      .put(`products/${product.id}`, product)
      .then(response => {
        if (response.status === 200 && response.data) {
          setProduct(response.data);
          Alert.alert('Success', `Product updated! >>> ${response.data.title}`);
        }

        setTimeout(() => {
          navigate('Products');
        }, 2000);
      })
      .catch(error => {
        Alert.alert('Error', 'Product could not be updated!');
      });
  }

  return (
    <SafeAreaView>
      <ProductChanges
        productUpdateFunc={productUpdate}
        onChange={'ProductUpdate'}
        onChangeUpdate={onChangeUpdate}
        defaultValue={[
          product.title,
          product.brand,
          product.description,
          product.price,
          product.discountPercentage,
          product.rating,
          product.stock,
          product.thumbnail,
          product.images,
        ]}
        productButton={' Update Product '}
      />
    </SafeAreaView>
  );
}
