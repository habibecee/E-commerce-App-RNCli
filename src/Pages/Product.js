import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import {colors, fonts} from '../Utils/GeneralStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import {MainContext} from '../Context/Context';

export default function Product({route}) {
  const {navigate} = useNavigation();
  const dimensions = Dimensions.get('window');

  const {products, addCarts, setProduct} = useContext(MainContext);
  const productId = route.params.id;
  const product = products?.find(product => product?.id === productId);

  const _renderItem = item => (
    <View style={styles.ThumbnailContainer}>
      <Image
        source={{uri: item?.item}}
        style={styles.Thumbnail}
        resizeMode="contain"
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        key={product?.id}
        data={product?.images}
        renderItem={_renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      />

      <View style={styles.DescriptionContainer}>
        <ScrollView style={styles.scrollView}>
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
        </ScrollView>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => navigate('ProductUpdate', product)}>
          <View style={styles.button}>
            <Icon name="pencil-sharp" style={styles.buttonText} size={24} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => addCarts(product)}>
          <View style={styles.button}>
            <Icon name="cart-sharp" style={styles.buttonText} size={24} />
          </View>
        </TouchableOpacity>
      </View>
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
    backgroundColor: colors.bgLight,
    margin: 15,
    minHeight: 200,
  },

  scrollView: {
    backgroundColor: colors.bgLight,
    gap: 10,
    padding: 5,
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

  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 100,
    backgroundColor: colors.bgLight,
    paddingVertical: 5,
    paddingHorizontal: 5,
  },

  button: {
    position: 'relative',
    margin: 10,
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
  buttonText: {
    fontFamily: fonts.semiBold,
    fontSize: 20,
    color: colors.textDark,
  },
});
