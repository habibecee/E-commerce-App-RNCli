import React, {createContext, useContext, useEffect, useState} from 'react';
import axiosInstance from '../Utils/axios';
import {Alert} from 'react-native';

const MainContext = createContext();

const MainContextProvider = ({children}) => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({
    id: Number,
    isFavorite: Boolean,
    title: String,
    description: String,
    price: Number,
    discountPercentage: Number,
    rating: Number,
    stock: Number,
    brand: String,
    categoryId: Number,
    thumbnail: String,
    images: Array,
  });
  const [addProductFav, setAddProductFav] = useState({});
  const [Favorites, setFavorites] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryItem, setCategoryItem] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedCategoryName, setSelectedCategoryName] = useState('');
  const [selectedValue, setSelectedValue] = useState(product.categoryId);

  const placeholder = {
    title: product.title,
    description: product.description,
    price: product.price,
    discountPercentage: product.discountPercentage,
    rating: product.rating,
    stock: product.stock,
    brand: product.brand,
    thumbnail: product.thumbnail,
  };

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
      setAddProductFav(false);
    });
  };

  const fetchFavorites = () => {
    axiosInstance
      .get('favorites')
      .then(response => {
        const {status, data} = response;

        if (status === 200) {
          setFavorites(data);
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

      const isFavorite = false;

      if (status === 201 && data) {
        Alert.alert('Success', `Product added to list! >> ${data?.title}`);
        setProduct(data);
      }
    });
  };

  const addFavorites = product => {
    const productId = product.id;
    const isFavorite = addProductFav[productId];

    if (!isFavorite) {
      axiosInstance
        .post('Favorites', product)
        .then(response => {
          const {status, data} = response;

          if (status === 201) {
            Alert.alert('Success', 'Item Added To The Favorites List!');
            setAddProductFav(prevState => ({
              ...prevState,
              [productId]: true,
            }));
            fetchFavorites();
          }
        })
        .catch(error => {
          Alert.alert('Error', 'Product not found!');
        });
    } else {
      deleteFavorites(product.id);
      Alert.alert('Success', 'Item Deleted From The Favorites List!');
      fetchFavorites();
    }
  };

  const deleteFavorites = FavoriteId => {
    axiosInstance
      .delete(`favorites/${FavoriteId}`)
      .then(response => {
        const {status} = response;

        if (status === 200) {
          Alert.alert('Success', 'Item Deleted From The Favorites List!');
          setAddProductFav(prevState => ({
            ...prevState,
            [FavoriteId]: false,
          }));
          fetchFavorites();
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

  // useEffect(() => {
  //   setSelectedValue(product.categoryId);
  // }, [product]);

  return (
    <MainContext.Provider
      value={{
        fetchProducts,
        fetchCategories,
        fetchFavorites,
        categories,
        categoryItem,
        setCategoryItem,
        Favorites,
        deleteFavorites,
        addProductFav,
        products,
        product,
        setProduct,
        addFavorites,
        onChangeText,
        productCreate,
        isFocused,
        handleTabPress,
        getTabIconName,
        selectedCategoryName,
        setSelectedCategoryName,
        selectedValue,
        setSelectedValue,
        placeholder,
      }}>
      {children}
    </MainContext.Provider>
  );
};

export {useContext, MainContext, MainContextProvider};
