import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Image, FlatList, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '@/constants/Colors';
import { SecondaryButton } from '../../components/Button';
import axios from 'axios'; // Make sure axios is installed via npm or yarn

const VendorListScreen = ({ navigation, route }) => {
  const { foodItem } = route.params;  // Get the selected food item
  const [vendors, setVendors] = useState([]); // State to store fetched vendors
  const [loading, setLoading] = useState(true); // State to show loading indicator

  // Fetch vendors when the component mounts
  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/vendors/vendors-by-item-title/${foodItem}`);
        setVendors(response.data); // Assuming the API returns an array of vendors
        setLoading(false); // Stop loading after fetching data
      } catch (error) {
        console.error('Error fetching vendors:', error);
        setLoading(false); // Stop loading even if there is an error
      }
    };

    fetchVendors();
  }, [foodItem]);

  // Vendor card component
  const VendorCard = ({ vendor }) => {
    // Constructing the full address from addressData
    const fullAddress = `${vendor.addressData.house_no}, ${vendor.addressData.street_name}, ${vendor.addressData.landmark}, ${vendor.addressData.pincode}, ${vendor.addressData.state}, ${vendor.addressData.country}`;

    return (
      <View style={styles.card}>
        <Image source={{ uri: vendor.items[0]?.image || 'https://via.placeholder.com/100' }} style={styles.cardImage} />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{vendor.personalData.firstname || 'Vendor Name N/A'}</Text>
          <Text style={styles.cardSubtitle}>Contact: {vendor.personalData.contact_no || 'Contact N/A'}</Text>
          <Text style={styles.cardAddress}>Address: {fullAddress || 'Address N/A'}</Text>
          <SecondaryButton 
            title="View Details" 
            onPress={() => navigation.navigate('VendorDetailScreen', { vendor })} 
          />
        </View>
      </View>
    );
  };

  // Render vendor card
  const renderVendorCard = ({ item }) => <VendorCard vendor={item} />;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
        <Text style={styles.headerTitle}>{foodItem}</Text>
      </View>

      <View style={styles.details}>
        {loading ? (
          <ActivityIndicator size="large" color={Colors.required.primary} />
        ) : (
          <View style={styles.cardContainer}>
            {vendors.length > 0 ? (
              <FlatList
                data={vendors}
                renderItem={renderVendorCard}
                keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}  // Fallback to index if id is not available
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.cardList}
              />
            ) : (
              <Text style={styles.noVendorsText}>No vendors found for {foodItem}.</Text>
            )}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  details: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 60,
    backgroundColor: Colors.required.primary,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  cardContainer: {
    flex: 1,
  },
  cardList: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#d0d0d0',
    marginVertical: 10,
    marginHorizontal: 20,
    padding: 15,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardImage: {
    height: 100,
    width: 100,
    resizeMode: 'contain',
    marginRight: 15,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardSubtitle: {
    fontSize: 14,
    color: Colors.required.grey,
  },
  cardAddress: {
    fontSize: 14,
    color: Colors.required.grey,
    marginBottom: 10,
  },
  noVendorsText: {
    fontSize: 16,
    color: Colors.required.grey,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default VendorListScreen;
