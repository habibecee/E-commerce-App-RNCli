import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Button,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axiosInstance from '../Utils/axios';
import {ProductsProps} from '../Types/Types';
import {colors, fonts} from '../Utils/GeneralStyles';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Cart() {
  const navigation = useNavigation();
  const [carts, setCarts] = useState<ProductsProps[] | []>([]);
  const [deleteItem, setDeleteItem] = useState<ProductsProps[] | []>([]);

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

  const deleteCarts = (cartId: number) => {
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
    fetchCart();
  }, []);

  const _renderCart =
    carts && carts?.length > 0 ? (
      <>
        <View style={styles.SubContainer}>
          <Text style={styles.SubText}> YOUR CART </Text>
        </View>

        <FlatList
          data={carts}
          renderItem={cart => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Product', {id: cart.item.id});
                }}>
                <View style={styles.cartItemContainer} key={cart.item.id}>
                  <Image
                    source={{uri: cart.item.thumbnail}}
                    style={styles.Image}
                  />
                  <View style={styles.cartTitleContainer}>
                    <Text style={styles.brand}>{cart.item.brand} </Text>
                    <Text style={styles.title}>{cart.item.title} </Text>
                  </View>
                  <Text style={styles.price}>{cart.item.price}$ </Text>
                  {/* <Text style={styles.discountPercentage}>
                    %{cart.item.discountPercentage}{' '}
                  </Text> */}
                  <TouchableOpacity onPress={() => deleteCarts(cart?.item.id)}>
                    <View>
                      <Icon name="trash" size={24} color={colors.red} />
                    </View>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            );
          }}
        />
        <View style={styles.SubContainer}>
          <Text style={styles.SubText}> Total: {} </Text>
        </View>
        <TouchableOpacity>
          <View style={styles.buttonContinue}>
            <Text style={styles.buttonText}> Continue </Text>
          </View>
        </TouchableOpacity>
      </>
    ) : (
      <View style={styles.EmptyCart}>
        <Text style={styles.EmptyText}>There is no product in your cart.</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Products')}>
          <View style={styles.button}>
            <Text style={styles.buttonText}> Show Products </Text>
          </View>
        </TouchableOpacity>
      </View>
    );

  return <View style={styles.ScrollView}>{_renderCart}</View>;
}

const styles = StyleSheet.create({
  SubContainer: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: colors.bgLight,
    shadowColor: colors.dark,
    shadowOpacity: 1,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  SubText: {
    fontFamily: fonts.bold,
    fontSize: 24,
    color: colors.textDark,
  },
  ScrollView: {
    flex: 1,
    backgroundColor: colors.bgLight,
    padding: 10,
  },
  cartItemContainer: {
    flexDirection: 'row',
    gap: 15,
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
    paddingBottom: 10,
    shadowColor: colors.dark,
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },

  cartTitleContainer: {
    flex: 1,
    width: '100%',
    gap: 5,
  },
  Image: {
    width: 70,
    height: 70,
  },

  brand: {
    fontFamily: fonts.bold,
    fontSize: 18,
    color: colors.textDark,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: colors.textDark,
  },
  price: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: colors.textSecondary,
  },
  discountPercentage: {
    fontFamily: fonts.bold,
    fontSize: 16,
    // textDecorationLine: 'line-through',
    color: colors.textLight,
  },

  buttonContinue: {
    width: '100%',
    height: 50,
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
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

  EmptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  EmptyText: {
    fontFamily: fonts.bold,
    fontSize: 20,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    margin: 20,
    padding: 10,
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
    fontSize: 18,
    color: colors.textDark,
  },
});
