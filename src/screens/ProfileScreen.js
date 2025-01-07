import React, { useRef } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Avatar, Title, Text, Surface } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { mitglieder } from '../data/mitglieder';

const ProfileScreen = () => {
  const scrollViewRef = useRef(null);

  useFocusEffect(
    React.useCallback(() => {
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    }, [])
  );

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
    fontWeight: '500',
    flex: 2,
    textAlign: 'right',
  },
});

export default ProfileScreen;
