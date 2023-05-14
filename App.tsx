import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
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
                <Text> {props.item.title} </Text>
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
