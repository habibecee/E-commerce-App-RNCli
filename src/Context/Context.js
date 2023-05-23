import React, {createContext, useContext, useEffect, useState} from 'react';
import axiosInstance from '../Utils/axios';
import {Alert} from 'react-native';

const MainContext = createContext();

const MainContextProvider = ({children}) => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});
  const [carts, setCarts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryItem, setCategoryItem] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedCategoryName, setSelectedCategoryName] = useState('');
  const [selectedValue, setSelectedValue] = useState('');

  const getTabIconName = routeName => {
    switch (routeName) {
      case 'Categories':
        return isFocused ? 'planet-sharp' : 'planet-outline';
      case 'Products':
        return isFocused ? 'paw-sharp' : 'paw-outline';
      case 'Account':
        return isFocused ? 'person-sharp' : 'person-outline';
      default:
        return null;
    }
  };

  const handleTabPress = () => {
    setIsFocused(!isFocused);
  };

  const fetchCategories = () => {
    axiosInstance.get('categories').then(response => {
      setCategories(response.data);
    });
  };

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

  const onChangeText = (key, value) => {
    setProduct(prevProduct => ({
      ...prevProduct,
      [key]: value,
    }));
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

  const addCarts = product => {
    axiosInstance
      .post('carts', product)
      .then(response => {
        const {status, data} = response;

        if (status === 201 && data) {
          setProduct(data);

          Alert.alert('Success', 'Product added to cart');
        }
      })
      .catch(error => {
        Alert.alert('Error', 'Product could not be added to cart');
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
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [product]);

  return (
    <MainContext.Provider
      value={{
        fetchProducts,
        fetchCategories,
        fetchCart,
        categories,
        categoryItem,
        setCategoryItem,
        carts,
        deleteCarts,
        products,
        product,
        setProduct,
        addCarts,
        onChangeText,
        productCreate,
        isFocused,
        handleTabPress,
        getTabIconName,
        selectedCategoryName,
        setSelectedCategoryName,
        selectedValue,
        setSelectedValue,
      }}>
      {children}
    </MainContext.Provider>
  );
};

export {useContext, MainContext, MainContextProvider};
