import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';

import React, {useContext} from 'react';
import {colors, fonts} from '../Utils/GeneralStyles';
import {MainContext} from '../Context/Context';
import ProductChanges from '../Components/ProductChanges';

export default function ProductCreate() {
  const {selectedValue, product, placeholder} = useContext(MainContext);

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
