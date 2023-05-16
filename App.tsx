import React, {useEffect, useState, useMemo} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Products from './src/Pages/Products';
import Product from './src/Pages/Product';
import Cart from './src/Pages/Cart';
import ProductCreate from './src/Pages/ProductCreate';
import ProductUpdate from './src/Pages/ProductUpdate';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Products" component={Products} />
        <Stack.Screen name="Product" component={Product} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="ProductCreate" component={ProductCreate} />
        <Stack.Screen name="ProductUpdate" component={ProductUpdate} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
