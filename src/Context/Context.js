import React, {createContext, useContext, useEffect, useState} from 'react';
import axiosInstance from '../Utils/axios';
import {Alert} from 'react-native';

const MainContext = createContext();

const MainContextProvider = ({children}) => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});
  const [carts, setCarts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryItems, setCategoryItems] = useState([]);

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

  const fetchCategoryItem = id => {
    axiosInstance.get(`products`).then(response => {
      axiosInstance.get(`categories`).then(response => {
        const {data, status} = response;

        if (status === 200) {
          const categoryItem = data?.filter(
            product => product.categoryId === id,
          );

          setCategoryItems(categoryItem);
        }
      });
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
    fetchCategoryItem();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [product]);

  return (
    <MainContext.Provider
      value={{
        fetchProducts,
        fetchCategories,
        fetchCategoryItem,
        fetchCart,
        categories,
        categoryItems,
        carts,
        deleteCarts,
        products,
        product,
        setProduct,
        addCarts,
        onChangeText,
        productCreate,
      }}>
      {children}
    </MainContext.Provider>
  );
};

export {useContext, MainContext, MainContextProvider};
