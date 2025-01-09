import React, { useRef } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Avatar, Title, Text, Surface, Button } from 'react-native-paper';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { mitglieder } from '../data/mitglieder';
import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';

const ProfileScreen = () => {
  const scrollViewRef = useRef(null);
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    }, [])
  );

  const handleLogout = async () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Logout",
          onPress: async () => {
            try {
              await signOut(auth);
              navigation.replace('Login');
            } catch (error) {
              Alert.alert('Error', 'Failed to logout. Please try again.');
            }
          },
          style: 'destructive'
        }
      ]
    );
  };

  return (
    <ScrollView 
      ref={scrollViewRef}
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Surface style={styles.header}>
        <Avatar.Text 
          size={80} 
          label={mitglieder?.jamaat?.charAt(0) || 'M'} 
          style={styles.avatar}
        />
        <Title style={styles.name}>{mitglieder?.jamaat || 'Loading...'}</Title>
        <Text style={styles.subtitle}>Jamaat ID: {mitglieder?.jamaatID}</Text>
      </Surface>

      <Surface style={styles.infoContainer}>
        <Title style={styles.sectionTitle}>Persönliche Informationen</Title>
        
        <View style={styles.infoRow}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{mitglieder?.name || 'N/A'}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Alter:</Text>
          <Text style={styles.value}>{mitglieder?.alter || 'N/A'}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Berufstand:</Text>
          <Text style={styles.value}>{mitglieder?.berufstand || 'N/A'}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Jamaat:</Text>
          <Text style={styles.value}>{mitglieder?.jamaat || 'N/A'}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{mitglieder?.email || 'N/A'}</Text>
        </View>
      </Surface>

      <Surface style={styles.logoutContainer}>
        <Button
          mode="contained"
          onPress={handleLogout}
          style={styles.logoutButton}
          contentStyle={styles.logoutButtonContent}
          labelStyle={styles.logoutButtonLabel}
          color="#ff3b30"
        >
          Logout
        </Button>
      </Surface>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 4,
    backgroundColor: '#fff',
  },
  avatar: {
    marginBottom: 10,
    backgroundColor: '#000',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  infoContainer: {
    padding: 20,
    marginHorizontal: 10,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  label: {
    fontSize: 16,
    color: '#666',
    flex: 1,
  },
  value: {
    fontSize: 16,
    color: '#333',
    flex: 2,
    textAlign: 'right',
  },
  logoutContainer: {
    marginHorizontal: 10,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 2,
    padding: 15,
  },
  logoutButton: {
    borderRadius: 8,
  },
  logoutButtonContent: {
    height: 48,
  },
  logoutButtonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
