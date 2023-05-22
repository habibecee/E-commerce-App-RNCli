import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useContext, useLayoutEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {colors, fonts} from '../Utils/GeneralStyles';
import {MainContext} from '../Context/Context';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Category({route}) {
  const {navigate} = useNavigation();

  const {categoryItems} = useContext(MainContext);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={categoryItems}
        renderItem={item => {
          return (
            <TouchableOpacity
              key={item.item.id}
              onPress={() => {
                navigate('Product', {id: item.item.id});
              }}>
              <View style={styles.productContainer}>
                <Text style={styles.productTitle}>CATEGORY</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.bgLight,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  ButtonCart: {
    color: colors.textDark,
  },
  productContainer: {
    flexDirection: 'row',
    gap: 10,
    marginVertical: 10,
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

  editIconContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 10,
    marginLeft: 10,
  },
});
