import React, {createContext, useContext, useEffect, useState} from 'react';
import axiosInstance from '../Utils/axios';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Alert} from 'react-native';

const MainContext = createContext();

const MainContextProvider = ({children}) => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({
    title: '',
    description: '',
    price: 0,
    discountPercentage: 0,
    rating: 0,
    stock: 0,
    brand: '',
    category: '',
    thumbnail: 'https://i.dummyjson.com/data/products/2/thumbnail.jpg',
    images: [
      'https://i.dummyjson.com/data/products/2/1.jpg',
      'https://i.dummyjson.com/data/products/2/2.jpg',
      'https://i.dummyjson.com/data/products/2/3.jpg',
      'https://i.dummyjson.com/data/products/2/thumbnail.jpg',
    ],
  });

  const [carts, setCarts] = useState([]);

  const fetchProducts = () => {
    axiosInstance.get('products').then(response => {
      setProducts(response.data);
    });
  };

  const fetchCart = () => {
    axiosInstance
      .get('carts')
      .then(response => {
        const {status, data} = response;

        if (status === 200) {
          setCarts(data);
        }
      })
      .catch(error => {
        console.log('error:', error);
      });
  };

  const addCarts = () => {
    axiosInstance
      .post('carts', product)
      .then(response => {
        if (response.status === 201 && response.data) {
          setProduct(response.data);
          Alert.alert('Success', 'Product added to cart');
        }
      })
      .catch(error => {
        Alert.alert('Error', 'Product could not be added to cart');
      });
  };

  const onChangeText = (key, value) => {
    setProduct({...product, [key]: value});
  };

  const productCreate = () => {
    axiosInstance.post('products', product).then(response => {
      const {data, status} = response;

      if (status === 201 && data) {
        setProduct(data);

        Alert.alert('Success', `Product added to list! >> ${data?.title}`);
      }
    });
  };

  const deleteCarts = cartId => {
    axiosInstance
      .delete(`carts/${cartId}`)
      .then(response => {
        const {status} = response;

        if (status === 200) {
          Alert.alert('Success', 'Item Deleted From The Cart!');
          fetchCart();
        }
      })
      .catch(error => {
        return Alert.alert('Error', 'Product not found!');
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [product]);

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <MainContext.Provider
      value={{
        fetchProducts,
        fetchCart,
        carts,
        deleteCarts,
        products,
        product,
        addCarts,
        onChangeText,
        productCreate,
      }}>
      {children}
    </MainContext.Provider>
  );
};

export {useContext, MainContext, MainContextProvider};
