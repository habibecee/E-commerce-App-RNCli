import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import React, {useContext, useLayoutEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {MainContext} from '../Context/Context';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors, fonts} from '../Utils/GeneralStyles';

function Home({route}) {
  const {navigate, setOptions} = useNavigation();

  const {products, categories} = useContext(MainContext);

  useLayoutEffect(() => {
    setOptions({
      headerRight: () => {
        return (
          <TouchableOpacity onPress={() => navigate('Cart')}>
            <Icon name="cart-sharp" size={24} color={colors.darkGreen} />
          </TouchableOpacity>
        );
      },
      headerLeft: () => {
        return (
          <TouchableOpacity onPress={() => navigate('ProductCreated')}>
            <Icon name="add-circle-sharp" size={24} color={colors.darkBlue} />
          </TouchableOpacity>
        );
      },
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        contentContainerStyle={styles.flatListContainer}
        data={categories}
        renderItem={item => {
          return (
            <TouchableOpacity
              key={item.item.id}
              onPress={() => {
                navigate('Category');
              }}>
              <TouchableOpacity style={styles.productContainer}>
                <Icon name={item.item.icon} size={28} color="purple" />
                <Text style={styles.productTitle}>{item.item.name}</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          );
        }}
      />

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigate('Products')}>
        <Icon name="list-circle-sharp" size={28} color="green" />
        <Text style={styles.buttonTitle}>Show All Products</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgLight,
  },

  flatListContainer: {
    margin: 20,
    padding: 20,
    gap: 30,
    justifyContent: 'center',
  },

  productContainer: {
    flexDirection: 'row',
    gap: 10,
    marginVertical: 10,
    alignItems: 'center',
    paddingBottom: 10,
    shadowColor: colors.dark,
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },

  productTitle: {
    fontFamily: fonts.bold,
    fontSize: 18,
    color: colors.textDark,
  },

  buttonContainer: {
    width: 200,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginVertical: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: colors.bgLight,
    borderWidth: 1,
    borderColor: colors.darkGreen,
    paddingBottom: 10,
    shadowColor: colors.dark,
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },

  buttonTitle: {
    fontFamily: fonts.bold,
    fontSize: 18,
    color: colors.textPrimary,
  },
});

export default Home;
