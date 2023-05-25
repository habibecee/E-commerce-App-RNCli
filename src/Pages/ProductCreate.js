import {SafeAreaView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React, {useContext} from 'react';
import {MainContext} from '../Context/Context';
import ProductChanges from '../Components/ProductChanges';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function ProductCreate() {
  const {placeholder, productCreate} = useContext(MainContext);
  const {navigate} = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <ProductChanges
        onChange={'ProductCreate'}
        productButton={' Create New Product '}
        defaultValue={placeholder}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => (
          productCreate(),
          setTimeout(() => {
            navigate('Products');
          }, 1000)
        )}>
        <Icon
          name="checkmark-circle-sharp"
          size={50}
          color="green"
          style={styles.buttonText}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    position: 'absolute',
    bottom: 20,
    right: 30,
    zIndex: 999,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    padding: 0,
    backgroundColor: 'transparent',
  },
  buttonText: {},
});
