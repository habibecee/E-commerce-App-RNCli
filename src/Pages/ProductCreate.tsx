import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {colors, fonts} from '../Utils/GeneralStyles';
import axiosInstance from '../Utils/axios';

export default function ProductCreate() {
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

  const onChangeText = (key: string, value: string) => {
    setProduct({...product, [key]: value});
  };

  const productCreate = () => {
    axiosInstance.post('products', product).then(respponse => {
      const {data, status} = response;

      if (status === 200 && data) {
        Alert.alert('Success', `Product added to list! >> ${data.title}`);
        setProduct(data);
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.scrollViewContainer}>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.inputSubText}>Enter Product Details </Text>
          <TextInput
            placeholder="Title"
            style={styles.inputContainer}
            onChangeText={text => onChangeText('title', text)}
          />
          <TextInput
            placeholder="Description"
            style={styles.inputContainer}
            onChangeText={text => onChangeText('description', text)}
          />
          <TextInput
            placeholder="Price"
            style={styles.inputContainer}
            onChangeText={text => onChangeText('price', text)}
          />
          <TextInput
            placeholder="DiscountPercentage"
            style={styles.inputContainer}
            onChangeText={text => onChangeText('discountPercentage', text)}
          />
          <TextInput
            placeholder="Stock"
            style={styles.inputContainer}
            onChangeText={text => onChangeText('stock', text)}
          />
          <TextInput
            placeholder="Brand"
            style={styles.inputContainer}
            onChangeText={text => onChangeText('brand', text)}
          />
          <TextInput
            placeholder="Category"
            style={styles.inputContainer}
            onChangeText={text => onChangeText('category', text)}
          />
          <TextInput
            placeholder="Thumbnail"
            style={styles.inputContainer}
            value={product.thumbnail}
          />
          {/* <TextInput placeholder="Images" style={styles.inputContainer}  /> */}
          <TextInput
            placeholder="Rating"
            style={styles.inputContainer}
            onChangeText={text => onChangeText('rating', text)}
          />
        </ScrollView>
        <TouchableOpacity onPress={() => productCreate()}>
          <View style={styles.button}>
            <Text style={styles.buttonText}> Add To Product List </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.bgLight,
    margin: 20,
  },

  scrollViewContainer: {
    flex: 1,
    width: '100%',
    shadowColor: colors.secondary,
    shadowOpacity: 1,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },

  scrollView: {
    padding: 15,
    backgroundColor: colors.bgGreen,
    borderWidth: 1,
    borderColor: colors.bgGreen,
    borderRadius: 10,
  },

  inputSubText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    padding: 10,
    fontFamily: fonts.semiBold,
    fontSize: 20,
    textAlign: 'center',
    color: colors.textDark,
    shadowColor: colors.dark,
    shadowOpacity: 1,
    shadowRadius: 3,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    padding: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.primary,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: colors.bgGreen,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 15,
    paddingHorizontal: 10,
    paddingVertical: 10,
    shadowColor: colors.darkShadowGreen,
    shadowOpacity: 1,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  buttonText: {
    fontFamily: fonts.semiBold,
    fontSize: 22,
    color: colors.textDark,
  },
});
