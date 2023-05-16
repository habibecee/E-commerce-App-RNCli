import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {colors, fonts} from '../Utils/GeneralStyles';
import axiosInstance from '../Utils/axios';
import {useNavigation} from '@react-navigation/native';

export default function ProductUpdate(props: any) {
  console.log('props', props.route.params);
  const [product, setProduct] = useState(props.route.params);
  const {navigate} = useNavigation();

  const onChangeText = (key: string, value: string) => {
    setProduct({...product, [key]: value});
  };

  function productUpdate(): void {
    axiosInstance
      .put(`products/${product.id}`, product)
      .then(response => {
        if (response.status === 200 && response.data) {
          setProduct(response.data);
          Alert.alert('Success', `Product updated! >>> ${response.data.title}`);
          setTimeout(() => {
            navigate('Products');
          }, 2000);
        }
      })
      .catch(error => {
        Alert.alert('Error', 'Product could not be updated!');
      });
  }

  return (
    <View style={styles.container}>
      <View style={styles.scrollViewContainer}>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.inputSubText}>Update Product Details </Text>
          <TextInput
            placeholder="Title"
            style={styles.inputContainer}
            onChangeText={text => onChangeText('title', text)}
            value={product?.title}
          />
          <TextInput
            placeholder="Description"
            style={styles.inputContainer}
            onChangeText={text => onChangeText('description', text)}
            value={product?.description}
          />
          <TextInput
            placeholder="Price"
            style={styles.inputContainer}
            onChangeText={text => onChangeText('price', text)}
            value={String(product?.price)}
          />
          <TextInput
            placeholder="DiscountPercentage"
            style={styles.inputContainer}
            onChangeText={text => onChangeText('discountPercentage', text)}
            value={String(product?.discountPercentage)}
          />
          <TextInput
            placeholder="Stock"
            style={styles.inputContainer}
            onChangeText={text => onChangeText('stock', text)}
            value={String(product?.stock)}
          />
          <TextInput
            placeholder="Brand"
            style={styles.inputContainer}
            onChangeText={text => onChangeText('brand', text)}
            value={product?.brand}
          />
          <TextInput
            placeholder="Category"
            style={styles.inputContainer}
            onChangeText={text => onChangeText('category', text)}
            value={product?.category}
          />
          <TextInput
            placeholder="Thumbnail"
            style={styles.inputContainer}
            value={product?.thumbnail}
          />
          {/* <TextInput placeholder="Images" style={styles.inputContainer}  /> */}
          <TextInput
            placeholder="Rating"
            style={styles.inputContainer}
            onChangeText={text => onChangeText('rating', text)}
            value={String(product?.rating)}
          />
        </ScrollView>
        <TouchableOpacity onPress={() => productUpdate()}>
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
