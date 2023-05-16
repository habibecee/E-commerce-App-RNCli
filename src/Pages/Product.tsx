import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  useWindowDimensions,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import axiosInstance from '../Utils/axios';
import {colors, fonts} from '../Utils/GeneralStyles';
import {ProductsProps} from '../Types/Types';

export default function Product() {
  const dimensions = Dimensions.get('window');
  const [product, setProduct] = useState({
    id: 2,
    title: 'iPhone X',
    description:
      'SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...',
    price: 899,
    discountPercentage: 17.94,
    rating: 4.44,
    stock: 34,
    brand: 'Apple',
    category: 'smartphones',
    thumbnail: 'https://i.dummyjson.com/data/products/2/thumbnail.jpg',
    images: [
      'https://i.dummyjson.com/data/products/2/1.jpg',
      'https://i.dummyjson.com/data/products/2/2.jpg',
      'https://i.dummyjson.com/data/products/2/3.jpg',
      'https://i.dummyjson.com/data/products/2/thumbnail.jpg',
    ],
  });

  //   object destructuring
  const {params} = useRoute<RouteProp<RouteProps>>();

  const fetchProduct = () => {
    axiosInstance.get(`products/${params?.id}`).then(response => {
      setProduct(response.data);
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

  useEffect(() => {
    fetchProduct();
  }, []);

  //   İKİNCİ USEEFFECT ID DEĞİŞTİĞİ DURUMDA SAĞLIKLI BİR ŞEKİLDE
  //   YENİDEN RENDER EDİLMESİ İÇİN VERİLDİ!!!

  useEffect(() => {
    fetchProduct();
  }, [params]);

  const _renderItem = ({item}: {item: []}) => (
    <View style={styles.ThumbnailContainer}>
      <Image
        source={{uri: item}}
        style={styles.Thumbnail}
        resizeMode="contain"
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={product?.images}
        renderItem={_renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      />
      {/* <Image
        source={{uri: product?.thumbnail}}
        style={styles.Image}
        resizeMode="contain"
      /> */}
      <View style={styles.DescriptionContainer}>
        <Text style={styles.brand}> {product?.brand} </Text>
        <Text style={styles.title}> {product?.title} </Text>
        <Text style={styles.price}>
          {' '}
          {product?.price}${' '}
          <Text style={styles.discountPercentage}>
            {' '}
            %{product?.discountPercentage}{' '}
          </Text>{' '}
        </Text>
        <Text style={styles.description}> {product?.description} </Text>
      </View>
      <TouchableOpacity onPress={() => addCarts()}>
        <View style={styles.button}>
          <Text style={styles.buttonText}> Add To Cart </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    alignItems: 'center',
    backgroundColor: colors.bgLight,
    padding: 5,
  },
  ThumbnailContainer: {
    width: Dimensions.get('window').width,
    height: 200,
    shadowColor: colors.dark,
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  Thumbnail: {
    width: Dimensions.get('window').width,
    height: 200,
  },

  DescriptionContainer: {
    flex: 1,
    gap: 10,
    alignItems: 'center',
    backgroundColor: colors.bgLight,
    padding: 5,
    top: -120,
  },

  Image: {
    width: '100%',
    height: 250,
  },

  brand: {
    fontFamily: fonts.bold,
    fontSize: 22,
    color: colors.textDark,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 20,
    color: colors.textDark,
  },
  price: {
    fontFamily: fonts.bold,
    fontSize: 20,
    color: colors.textSecondary,
  },
  discountPercentage: {
    fontFamily: fonts.bold,
    fontSize: 20,
    // textDecorationLine: 'line-through',
    color: colors.textLight,
  },
  description: {
    fontFamily: fonts.semiBold,
    fontSize: 20,
    color: colors.textPrimary,
  },

  button: {
    width: '100%',
    height: 50,
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.7,
    shadowRadius: 3,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  buttonText: {
    fontFamily: fonts.semiBold,
    fontSize: 20,
    color: colors.textDark,
  },
});
