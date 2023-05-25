import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import React, {useContext} from 'react';
import {MainContext} from '../Context/Context';
import {Picker} from '@react-native-picker/picker';
import {colors, fonts} from '../Utils/GeneralStyles';
import {useNavigation} from '@react-navigation/native';

export default function ProductChanges({
  onChange,
  defaultValue,
  productButton,
  productUpdateFunc,
  onChangeUpdate,
}) {
  const {
    categories,
    setSelectedValue,
    onChangeText,
    productCreate,
    selectedValue,
  } = useContext(MainContext);

  const {navigate} = useNavigation();

  // console.log('defaultValue', JSON.stringify(defaultValue, null, 4));

  return (
    <View style={styles.container}>
      <FlatList
        data={[defaultValue]}
        style={styles.scrollView}
        renderItem={({item, index}) => {
          return (
            <>
              {String(onChange) === 'ProductUpdate' ? (
                <>
                  {Object.entries(item).map(([key, value]) => (
                    <TextInput
                      key={key}
                      style={styles.inputContainer}
                      placeholder={key}
                      onChangeText={text => onChangeUpdate(key, text)}
                      value={String(item[key])}
                    />
                  ))}
                  <View style={styles.pickerContainer}>
                    <Text style={styles.pickerSubText}>Choose Category</Text>

                    <Picker
                      style={styles.picker}
                      itemStyle={styles.pickerText}
                      selectedValue={selectedValue}
                      onValueChange={itemValue => {
                        setSelectedValue(itemValue);
                        onChangeUpdate('categoryId', itemValue);
                        productUpdateFunc;
                      }}>
                      {categories.map((picker, index) => {
                        return (
                          <Picker.Item
                            label={picker.name}
                            value={categories[index].id}
                            key={index}
                          />
                        );
                      })}
                    </Picker>
                  </View>
                </>
              ) : (
                <>
                  {Object.entries(item).map(([key, value]) => (
                    <TextInput
                      key={key}
                      placeholder={key}
                      style={styles.inputContainer}
                      onChangeText={text => onChangeText(key, text)}
                    />
                  ))}
                  <View style={styles.pickerContainer}>
                    <Text style={styles.pickerSubText}>Choose Category</Text>
                    <Picker
                      style={styles.picker}
                      itemStyle={styles.pickerText}
                      selectedValue={selectedValue}
                      onValueChange={itemValue => {
                        setSelectedValue(itemValue);
                        onChangeText('categoryId', itemValue);
                      }}>
                      {categories.map((picker, index) => {
                        return (
                          <Picker.Item
                            label={picker.name}
                            value={picker.id}
                            key={index}
                          />
                        );
                      })}
                    </Picker>
                  </View>
                </>
              )}
            </>
          );
        }}
      />

      {/* <TouchableOpacity
        style={styles.button}
        onPress={() =>
          onChange === 'ProductUpdate'
            ? productUpdateFunc()
            : (productCreate(),
              setTimeout(() => {
                navigate('Products');
              }, 1000))
        }>
        <Text style={styles.buttonText}> {productButton} </Text>
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    minHeight: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.tertiary,
    padding: 10,
    shadowColor: colors.dark,
    shadowOpacity: 0.7,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    borderRadius: 10,
  },

  scrollView: {
    flex: 1,
    width: '100%',
    paddingVertical: 35,
    paddingHorizontal: 10,
    backgroundColor: colors.tertiary,
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
  },

  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    padding: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.primary,
  },

  pickerContainer: {
    flex: 1,
    paddingBottom: 30,
    textAlign: 'center',
  },

  pickerSubText: {
    width: '50%',
    textAlign: 'center',
    fontFamily: fonts.semiBold,
    fontSize: 20,
    color: colors.dark,
    alignSelf: 'center',
  },

  picker: {
    width: '70%',
    alignSelf: 'center',
    justifyContent: 'center',
  },

  pickerText: {
    fontFamily: fonts.semiBold,
    fontSize: 20,
    color: colors.textDark,
  },

  button: {
    // position: 'relative',
    flex: 1,
    width: '100%',
    maxHeight: 50,
    backgroundColor: colors.bgLight,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 15,
    paddingHorizontal: 10,
    paddingVertical: 10,
    shadowColor: colors.dark,
    shadowOpacity: 0.7,
    shadowRadius: 3,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  buttonText: {
    fontFamily: fonts.semiBold,
    fontSize: 22,
    color: colors.textDark,
  },
});
