import {SafeAreaView} from 'react-native';
import React, {useContext} from 'react';
import {MainContext} from '../Context/Context';
import ProductChanges from '../Components/ProductChanges';

export default function ProductCreate() {
  const {placeholder} = useContext(MainContext);

  return (
    <SafeAreaView>
      <ProductChanges
        onChange={'ProductCreate'}
        productButton={' Create New Product '}
        defaultValue={placeholder}
      />
    </SafeAreaView>
  );
}
