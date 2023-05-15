import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import axios from 'axios';
import {
  Alert,
  Button,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export interface ProductsProps {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001/',
});

function App(): JSX.Element {
  const [products, setProducts] = useState<ProductsProps | null>(null);

  // const fetchProducts =  () => {
  //   const fetchProducts = async () => {
  //     try {
  //       const response = await fetch("http://localhost:3001/products", {
  //         method: "GET",
  //         headers: {
  //           Accept: "application/json",
  //           "Content-Type": "application/json",
  //         },
  //       });

  //       if (!response.ok) {
  //         throw new Error("Ağ isteği başarısız!");
  //       }

  //       const data = await response.json();
  //       console.log("message:", JSON.stringify(data, null, 4));
  //     } catch (error) {
  //       console.error("Hata:", error);
  //     }
  //   }
  //   // fetch("  http://localhost:3001/products" , {
  //   //   method: "GET",
  //   //   headers: {
  //   //     Accept : "application/json",
  //   //     "Content-Type": "application/json",
  //   //   }
  //   // }).then(response => response.json())
  //   // .then(data => console.log("DATA:" , data))
  // }

  const AxiosProducts = async () => {
    const axiosResponse = await axiosInstance.get('products');

    setProducts(axiosResponse.data);
  };

  const AddedProducts = () => {
    axiosInstance
      .post('products', {
        // id: 4, --> POST İSTEĞİNDE ID VERİLMEMELİDİR!
        title: 'Samsung ',
        description:
          'Samsung Galaxy S21 Ultra 5G 256 GB (Samsung Türkiye Garantili)',
        price: 16499,
        discountPercentage: 10,
        rating: 4.5,
        stock: 100,
        brand: 'Samsung',
        category: 'Telefon',
        thumbnail:
          'https://m.media-amazon.com/images/I/61O-QykQ7LL._AC_UY218_.jpg',
        images: [
          'https://m.media-amazon.com/images/I/61O-QykQ7LL._AC_UY218_.jpg',
          'https://m.media-amazon.com/images/I/61O-QykQ7LL._AC_UY218_.jpg',
          'https://m.media-amazon.com/images/I/61O-QykQ7LL._AC_UY218_.jpg',
          'https://m.media-amazon.com/images/I/61O-QykQ7LL._AC_UY218_.jpg',
        ],
      })
      .then(response => {
        // console.log('response', response.status, response.data);
        if (response.status === 201) {
          AxiosProducts();
        }
      });
  };

  const UpdateProducts = () => {
    axiosInstance
      .put('products/3', {
        // PUT İSTEĞİNDE ID VERİLMESİ GEREKİR!
        id: 3,
        title: 'Samsung Universe 9 Plus',
        description:
          "Samsung's new variant which goes beyond Galaxy to the Universe",
        price: 14321,
        discountPercentage: 15.46,
        rating: 4.09,
        stock: 36,
        brand: 'Samsung',
        category: 'smartphones',
        thumbnail: 'https://i.dummyjson.com/data/products/3/thumbnail.jpg',
        images: ['https://i.dummyjson.com/data/products/3/1.jpg'],
      })
      .then(response => {
        // console.log('response', response.status, response.data);
        if (response.status === 200) {
          AxiosProducts();
        }
      });
  };

  const DeleteProducts = (productId: number) => {
    axiosInstance
      .delete(`products/${productId}`)
      .then(response => {
        console.log('response', response.status, response.data);
        if (response.status === 200) {
          AxiosProducts();
        }
      })
      .catch(error => {
        return Alert.alert('Error', 'Product not found!');
      });
  };

  useEffect(() => {
    // fetchProducts();
    AxiosProducts();
  }, []);

  return (
    <SafeAreaView>
      {/* <ScrollView> */}
      <View>
        <Text> Welcome! </Text>
        {/* {products.map((product: any) => {
            return <Text> {product.title} </Text>;
          })} */}
        <FlatList
          data={products}
          ListHeaderComponent={() => {
            return (
              <View>
                <Button title="Show Data" onPress={() => AxiosProducts()} />
                <Button title="Hide Data" onPress={() => setProducts([])} />
                <Button title="Add Product" onPress={() => AddedProducts()} />
                <Button title="Edit Product" onPress={() => UpdateProducts()} />
                <Button
                  title="Delete Product"
                  onPress={() => DeleteProducts(1)}
                />
              </View>
            );
          }}
          ListEmptyComponent={() => {
            return (
              <View style={{paddingVertical: 10}}>
                <Text> NO DATA AVAILABLE! </Text>
              </View>
            );
          }}
          renderItem={props => {
            return (
              <View style={{paddingVertical: 10}}>
                <Text>
                  {' '}
                  {props.item.title} -- {props.item.price}{' '}
                </Text>
              </View>
            );
          }}
        />
      </View>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default App;
