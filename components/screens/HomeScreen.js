import React, { useState, useEffect } from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  View,
  FlatList,
  TouchableHighlight,
  TouchableOpacity,
  Modal,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '@/constants/Colors';
import categories from '../../constants/categories';

const { width } = Dimensions.get('screen');
const cardWidth = width / 2 - 20;

const HomeScreen = ({ navigation }) => {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [address, setAddress] = useState({
    street: '123 Main Street',
    city: 'Cityville',
    zip: '12345',
  });
  const [newAddress, setNewAddress] = useState({
    street: '',
    city: '',
    zip: '',
  });
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/vendors/get-all-items');
      const data = await response.json();
      const foodsWithId = data.map((food, index) => ({ ...food, id: index }));
      setFoods(foodsWithId);
    } catch (error) {
      console.error(error);
    }
  };

  const ListCategories = () => (
    <View style={{ height: 100 }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={style.categoriesListContainer}
      >
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => setSelectedCategoryIndex(index)}
          >
            <View
              style={{
                backgroundColor:
                  selectedCategoryIndex === index
                    ? Colors.required.primary
                    : Colors.required.secondary,
                ...style.categoryBtn,
              }}
            >
              <View style={style.categoryBtnImgCon}>
                <Image
                  source={category.image}
                  style={{ height: 35, width: 35, resizeMode: 'cover' }}
                />
              </View>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: 'bold',
                  marginLeft: 10,
                  color:
                    selectedCategoryIndex === index
                      ? Colors.required.white
                      : Colors.required.primary,
                }}
              >
                {category.name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const Card = ({ food }) => (
    <TouchableHighlight
      underlayColor={Colors.required.white}
      activeOpacity={0.9}
      //onPress={() => navigation.navigate('VendorListScreen', food)}
      onPress={() => navigation.navigate('VendorListScreen', {foodItem: food.title})}
    >
      <View style={style.card}>
        <View style={{ alignItems: 'center', top: -40 }}>
        {food.image && (
          <View style={{ alignItems: 'center', top: -40 }}>
          {food.image && (
            <Image source={{ uri: food.image }} style={{ height: 120, width: 120 }} />
          )}
        </View>
        )}
        </View>
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{food.title}</Text>
          <Text style={{ fontSize: 14, color: Colors.required.grey, marginTop: 2 }}>
            {/* You didn't provide any ingredients in the API response, so I'm commenting this out */}
            {/* {food.ingredients} */}
          </Text>
        </View>
        <View
          style={{
            marginTop: 10,
            marginHorizontal: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          {/* <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{`₹${food.cost}`}</Text> */}
          {/* <View style={style.addToCartBtn}>
            <Icon name="add" size={20} color={Colors.required.white} />
          </View> */}
        </View>
      </View>
    </TouchableHighlight>
  );

  const handleSaveAddress = () => {
    setAddress(newAddress);
    setIsModalVisible(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.required.white }}>
      <FlatList
  ListHeaderComponent={
    <View>
      {/* Header */}
      <View style={style.header}>
        <View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 28 }}> Hello,</Text>
            <Text style={{ fontSize: 28, fontWeight: 'bold', marginLeft: 10 }}>
              Ariz
            </Text>
          </View>
          <Text style={{ marginTop: 5, fontSize: 22, color: Colors.required.grey }}>
            What do you want today
          </Text>
        </View>
        <Image
          source={require('../../assets/images/person.png')}
          style={{ height: 50, width: 50, borderRadius: 25 }}
        />
      </View>

      {/* Address Card */}
      <View style={style.addressCard}>
        <Icon name="home" size={36} color={Colors.required.primary} />
        <View>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Home</Text>
          <Text style={{ fontSize: 14, color: Colors.required.grey }}>
            {address.street}, {address.city} - {address.zip}
          </Text>
        </View>
        <TouchableOpacity onPress={() => setIsModalVisible(true)}>
          <Icon name="edit" size={24} color={Colors.required.primary} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View
        style={{
          marginTop: 20,
          flexDirection: 'row',
          paddingHorizontal: 15,
        }}
      >
        <View style={style.inputContainer}>
          <Icon name="search" size={28} />
          <TextInput
            style={{ flex: 1, fontSize: 18 }}
            placeholder="Search for food"
          />
        </View>
        <View style={style.sortBtn}>
          <Icon name="tune" size={28} color={Colors.required.white} />
        </View>
      </View>

      {/* Categories */}
      <ListCategories />
    </View>
  }
  contentContainerStyle={{ paddingHorizontal: 10 }}
  showsVerticalScrollIndicator={false}
  numColumns={2}
  data={foods}
  renderItem={({ item }) => <Card food={item} />}
  keyExtractor={(item) => item.id.toString()}
/>

      {/* Address Input Modal */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={modalStyle.container}>
          <View style={modalStyle.modal}>
            <Text style={modalStyle.title}>Enter New Address</Text>
            <TextInput
              placeholder="Doorno"
              value={newAddress.doorno}
              onChangeText={(text) => setNewAddress({ ...newAddress, doorno: text })}
              style={modalStyle.input}
            />
            <TextInput
              placeholder="Street"
              value={newAddress.street}
              onChangeText={(text) => setNewAddress({ ...newAddress, street: text })}
              style={modalStyle.input}
            />
            <TextInput
              placeholder="Landmark"
              value={newAddress.landmark}
              onChangeText={(text) => setNewAddress({ ...newAddress, landmark: text })}
              style={modalStyle.input}
            />
            <TextInput
              placeholder="City"
              value={newAddress.city}
              onChangeText={(text) => setNewAddress({ ...newAddress, city: text })}
              style={modalStyle.input}
            />
            <TextInput
              placeholder="ZIP Code"
              value={newAddress.zip}
              onChangeText={(text) => setNewAddress({ ...newAddress, zip: text })}
              style={modalStyle.input}
            />
            <View style={modalStyle.buttons}>
              <Button title="Cancel" onPress={() => setIsModalVisible(false)} />
              <Button title="Save" onPress={handleSaveAddress} />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  addressCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.required.light,
    padding: 15,
    marginHorizontal: 15,
    borderRadius: 10,
    marginTop: 15,
    justifyContent: 'space-between',
  },
  inputContainer: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: Colors.required.light,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  sortBtn: {
    width: 50,
    height: 50,
    marginLeft: 10,
    backgroundColor: Colors.required.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesListContainer: {
    paddingVertical: 30,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  categoryBtn: {
    height: 45,
    width: 120,
    marginRight: 7,
    borderRadius: 30,
    alignItems: 'center',
    paddingHorizontal: 5,
    flexDirection: 'row',
  },
  categoryBtnImgCon: {
    height: 35,
    width: 35,
    backgroundColor: Colors.required.white,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    height: 170,
    width: cardWidth,
    marginHorizontal: 5,
    marginBottom: 20,
    alignItems: 'center', 
    marginTop: 40,
    borderRadius: 15,
    elevation: 13,
    backgroundColor: Colors.required.white,
  },
  addToCartBtn: {
    height: 30,
    width: 30,
    borderRadius: 20,
    backgroundColor: Colors.required.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const modalStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modal: {
    width: '85%',
    backgroundColor: Colors.required.white,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: Colors.required.grey,
    borderBottomWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
});

export default HomeScreen;