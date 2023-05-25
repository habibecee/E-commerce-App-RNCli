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

  const {products, addFavorites, setProduct, addProductFav} =
    useContext(MainContext);
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
        style={styles.ThumbnailList}
        renderItem={_renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      />
      <ScrollView style={styles.scrollView}>
        <View style={styles.BrandContainer}>
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
        </View>

        <View style={styles.DescriptionContainer}>
          <Text style={styles.descriptionText}> DESCRIPTION </Text>
          <Text style={styles.description}> {product?.description} </Text>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => navigate('ProductUpdate', product)}>
          <View style={styles.button}>
            <Icon name="pencil-sharp" size={24} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => addFavorites(product)}>
          <View style={styles.button}>
            <Icon
              name={addProductFav[product.id] ? 'heart-sharp' : 'heart-outline'}
              size={24}
              color={addProductFav[product.id] ? colors.red : colors.dark}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.tertiary,
  },

  ThumbnailList: {
    width: Dimensions.get('window').width,
    height: 250,
    marginBottom: 10,
  },

  ThumbnailContainer: {
    width: Dimensions.get('window').width,
    height: 200,
    backgroundColor: colors.bgLight,
    shadowColor: colors.dark,
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  Thumbnail: {
    width: '100%',
    height: 200,
  },

  scrollView: {
    backgroundColor: colors.tertiary,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },

  BrandContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    width: '100%',
    minHeight: 50,
    marginBottom: 15,
    backgroundColor: colors.bgLight,
    borderWidth: 1,
    borderColor: colors.tertiary,
    backgroundColor: colors.bgLight,
    shadowColor: colors.dark,
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },

  DescriptionContainer: {
    flex: 1,
    gap: 10,
    width: '100%',
    height: 400,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
    minHeight: 200,
    borderWidth: 1,
    borderColor: colors.tertiary,
    backgroundColor: colors.bgLight,
    shadowColor: colors.dark,
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 0,
    },
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

  descriptionText: {
    fontFamily: fonts.bold,
    fontSize: 22,
    textDecorationLine: 'underline',
    color: colors.textPrimary,
  },

  description: {
    fontFamily: fonts.semiBold,
    fontSize: 20,
    color: colors.textPrimary,
  },

  buttonContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    margin: 10,
    zIndex: 999,
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
});
