import React, { useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { Surface, Title, Text, Card, Menu, Button, Portal, Modal, Divider } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { mitglieder } from '../data/mitglieder';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const HomeScreen = () => {
  const scrollViewRef = useRef(null);
  const currentYear = new Date().getFullYear().toString();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [yearMenuVisible, setYearMenuVisible] = useState(false);
  const [selectedChanda, setSelectedChanda] = useState(null);
  
  const availableYears = Object.keys(mitglieder?.chandaData || {}).sort((a, b) => b - a);

  useFocusEffect(
    React.useCallback(() => {
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    }, [])
  );

  const chandaItems = mitglieder?.chandaData?.[selectedYear] || [];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.idYearContainer}>
        <View style={styles.idContainer}>
          <Text style={styles.label}>ID:</Text>
          <Text style={styles.value}>{mitglieder?.jamaatID}</Text>
        </View>
        <View style={styles.yearContainer}>
          <Text style={styles.label}>Jahr:</Text>
          <Menu
            visible={yearMenuVisible}
            onDismiss={() => setYearMenuVisible(false)}
            anchor={
              <Button
                mode="outlined"
                onPress={() => setYearMenuVisible(true)}
                style={styles.yearButton}
                labelStyle={styles.yearButtonLabel}
              >
                {selectedYear}
              </Button>
            }
          >
            {availableYears.map((year) => (
              <Menu.Item
                key={year}
                onPress={() => {
                  setSelectedYear(year);
                  setYearMenuVisible(false);
                }}
                title={year}
              />
            ))}
          </Menu>
        </View>
      </View>

      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <Title style={styles.sectionTitle}>Dein Jahres Übersicht</Title>

        {chandaItems.map((chanda, index) => {
          const hasPromise = chanda.promise !== "" && chanda.promise !== undefined && chanda.promise !== null;
          
          return (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedChanda(chanda)}
            >
              <Card style={styles.card}>
                <Card.Content>
                  <Title style={styles.chandaTitle}>{chanda.name}</Title>
                  <View style={styles.chandaDetails}>
                    <View>
                      <Text style={styles.detailLabel}>
                        {hasPromise ? 'Versprochen' : 'Spende'}: {hasPromise ? chanda.promise : 'Freiwillig'}
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.detailLabel}>Bezahlt: {chanda.paid_in}</Text>
                    </View>
                  </View>
                  {hasPromise && (
                    <View style={styles.progressContainer}>
                      <View 
                        style={[
                          styles.progressBar, 
                          { width: `${(chanda.paid_in / chanda.promise) * 100}%` }
                        ]} 
                      />
                    </View>
                  )}
                </Card.Content>
              </Card>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <Portal>
        <Modal
          visible={selectedChanda !== null}
          onDismiss={() => setSelectedChanda(null)}
          contentContainerStyle={styles.modalContainer}
        >
          {selectedChanda && (
            <Surface style={styles.modalSurface}>
              <Title style={styles.modalTitle}>{selectedChanda.name}</Title>
              <Divider style={styles.divider} />
              
              <View style={styles.modalContent}>
                <View style={styles.modalRow}>
                  <Text style={styles.modalLabel}>Beschreibung</Text>
                  <Text style={styles.modalValue}>{selectedChanda.description}</Text>
                </View>
                
                <View style={styles.modalInfoGrid}>
                  <View style={styles.modalInfoItem}>
                    <Text style={styles.modalInfoLabel}>Versprochen</Text>
                    <Text style={styles.modalInfoValue}>
                      {selectedChanda.promise || 'Freiwillig'}
                    </Text>
                  </View>
                  
                  <View style={styles.modalInfoItem}>
                    <Text style={styles.modalInfoLabel}>Bezahlt</Text>
                    <Text style={styles.modalInfoValue}>{selectedChanda.paid_in}</Text>
                  </View>
                  
                  <View style={[styles.modalInfoItem, styles.modalInfoItemFull]}>
                    <Text style={styles.modalInfoLabel}>Enddatum</Text>
                    <Text style={styles.modalInfoValue}>
                      {formatDate(selectedChanda.spende_ends)}
                    </Text>
                  </View>
                </View>

                <Button
                  mode="contained"
                  onPress={() => setSelectedChanda(null)}
                  style={styles.closeButton}
                  labelStyle={styles.closeButtonLabel}
                >
                  Schließen
                </Button>
              </View>
            </Surface>
          )}
        </Modal>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  idYearContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#333',
  },
  idContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  yearContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    color: '#fff',
    fontSize: 16,
    marginRight: 8,
  },
  value: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  yearButton: {
    backgroundColor: '#fff',
    borderColor: '#333',
    height: 35,
    marginLeft: 8,
    minWidth: 120,
    justifyContent: 'center',
  },
  yearButtonLabel: {
    fontSize: 16,
    marginVertical: 0,
    color: '#333',
    textAlign: 'center',
  },
  yearMenu: {
    minWidth: 150,
  },
  yearMenuItem: {
    textAlign: 'center',
    fontSize: 16,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 24,
    marginBottom: 16,
    color: '#333',
  },
  card: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 2,
  },
  chandaTitle: {
    fontSize: 20,
    marginBottom: 8,
  },
  chandaDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
  },
  progressContainer: {
    height: 8,
    backgroundColor: '#eee',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4CAF50',
  },
  modalContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    margin: 24,
    marginTop: 80,
    marginBottom: 80,
  },
  modalSurface: {
    backgroundColor: 'white',
    borderRadius: 15,
    elevation: 4,
    maxWidth: 400,
    alignSelf: 'center',
    width: '100%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 12,
    textAlign: 'center',
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  modalContent: {
    padding: 16,
  },
  modalRow: {
    marginBottom: 16,
  },
  modalLabel: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  modalValue: {
    fontSize: 15,
    color: '#333',
    lineHeight: 22,
  },
  modalInfoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 12,
    justifyContent: 'space-between',
  },
  modalInfoItem: {
    width: '48%',
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  modalInfoItemFull: {
    width: '100%',
    marginBottom: 0,
  },
  modalInfoLabel: {
    fontSize: 11,
    color: '#666',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  modalInfoValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#333',
    borderRadius: 8,
    elevation: 0,
  },
  closeButtonLabel: {
    fontSize: 15,
    textTransform: 'none',
    paddingVertical: 2,
  },
});

export default HomeScreen;
