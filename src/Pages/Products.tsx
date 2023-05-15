import {
  View,
  Text,
  Button,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import axiosInstance from '../Utils/axios';

export default function Products() {
  const [products, setProducts] = useState([]);
  const navigation = useNavigation();

  const fetchProducts = () => {
    axiosInstance.get('products').then(response => {
      setProducts(response.data);
    });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <Button title="Cart" onPress={() => navigation.navigate('Cart')} />
        );
      },
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={products}
        renderItem={item => {
          return (
            <TouchableOpacity>
              <View style={styles.productContainer}>
                <Image
                  source={{uri: item.item.thumbnail}}
                  style={styles.productImage}
                />
                <Text>{item.item.title}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
      {/* <View>
        <Text>Products</Text>
        <Button
          title="Go Details"
          onPress={() => navigation.navigate('Product')}
        />
      </View> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  productContainer: {
    flexDirection: 'row',
    gap: 20,
    marginVertical: 10,
    alignItems: 'center',
  },
  productImage: {
    width: 100,
    height: 100,
  },
});
