import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Products from '../Pages/Products';
import Product from '../Pages/Product';
import Cart from '../Pages/Cart';
import ProductCreate from '../Pages/ProductCreate';
import ProductUpdate from '../Pages/ProductUpdate';
import Home from '../Pages/Home';
import Account from '../Pages/Account';
import Category from '../Pages/Category';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors, fonts} from '../Utils/GeneralStyles';
import {useContext} from 'react';
import {MainContext} from '../Context/Context';

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

function StackNavigator({route}) {
  const {selectedCategory} = useContext(MainContext);

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontFamily: fonts.bold,
          fontSize: 20,
        },
        headerStyle: {
          backgroundColor: colors.tertiary,
        },
        headerTintColor: colors.textDark,
        headerBackTitleStyle: {
          fontFamily: fonts.bold,
          color: colors.textDark,
          size: 20,
        },
      }}>
      <Stack.Screen
        options={{
          title: 'Category List',
        }}
        name="Home"
        component={Home}
      />
      <Stack.Screen name="Product" component={Product} />
      <Stack.Screen name="Category" component={Category} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="ProductCreate" component={ProductCreate} />
      <Stack.Screen name="ProductUpdate" component={ProductUpdate} />
    </Stack.Navigator>
  );
}

function Navigation() {
  const {isFocused, handleTabPress, getTabIconName} = useContext(MainContext);

  return (
    <NavigationContainer>
      <Tab.Navigator
        listeners={{
          tabPress: handleTabPress,
        }}
        screenOptions={({route}) => ({
          tabBarActiveTintColor: colors.dark,
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            backgroundColor: colors.tertiary,
            height: 100,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
          },
          tabBarLabelStyle: {
            fontFamily: fonts.bold,
            fontSize: isFocused ? 20 : 18,
          },
          tabBarIcon: ({color, size}) => (
            <Icon name={getTabIconName(route.name)} color={color} size={size} />
          ),
        })}
        initialRouteName="StackNavigator">
        <Tab.Screen
          name="Categories"
          component={StackNavigator}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Products"
          component={Products}
          options={{
            headerStyle: {
              backgroundColor: colors.tertiary,
            },
            headerTitleStyle: {
              fontFamily: fonts.bold,
              fontSize: 20,
              color: colors.textDark,
            },
          }}
        />
        <Tab.Screen
          name="Account"
          component={Account}
          options={{
            headerStyle: {
              backgroundColor: colors.tertiary,
            },
            headerTitleStyle: {
              fontFamily: fonts.bold,
              fontSize: 20,
              color: colors.textDark,
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
