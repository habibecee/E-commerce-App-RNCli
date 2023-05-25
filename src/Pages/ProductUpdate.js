import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import axiosInstance from '../Utils/axios';
import {MainContext} from '../Context/Context';
import ProductChanges from '../Components/ProductChanges';
import {colors, fonts} from '../Utils/GeneralStyles';
import Icon from 'react-native-vector-icons/Ionicons';

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
    <SafeAreaView style={styles.container}>
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

      <TouchableOpacity style={styles.button} onPress={() => productUpdate()}>
        <Icon
          name="checkmark-circle-sharp"
          size={50}
          color="green"
          style={styles.buttonText}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    position: 'absolute',
    bottom: 20,
    right: 30,
    zIndex: 999,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    padding: 0,
    backgroundColor: 'transparent',
  },
  buttonText: {},
});
