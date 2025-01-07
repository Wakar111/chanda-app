import React, { useRef } from 'react';
import { View, StyleSheet, ScrollView, Linking } from 'react-native';
import { Title, Card, Paragraph, Button, List } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';

export default function ContactScreen() {
  const scrollViewRef = useRef(null);

  useFocusEffect(
    React.useCallback(() => {
      // Scroll to top when screen comes into focus
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    }, [])
  );

  const handleCall = () => {
    Linking.openURL('tel:+4917612345678');
  };

  const handleEmail = () => {
    Linking.openURL('mailto:finance@mka-germany.de');
  };

  return (
    <ScrollView 
      ref={scrollViewRef}
      style={styles.scrollView}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <Title style={styles.title}>Contact Us</Title>

        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>MKA Finance Secretary</Title>
            <List.Item
              title="Muhammad Ahmad"
              description="Finance Secretary"
              titleStyle={styles.listTitle}
              descriptionStyle={styles.listDescription}
              left={props => <List.Icon {...props} icon="account" color="#000000" />}
            />
            <List.Item
              title="+49 176 1234 5678"
              description="Mobile"
              titleStyle={styles.listTitle}
              descriptionStyle={styles.listDescription}
              left={props => <List.Icon {...props} icon="phone" color="#000000" />}
              onPress={handleCall}
            />
            <List.Item
              title="finance@mka-germany.de"
              description="Email"
              titleStyle={styles.listTitle}
              descriptionStyle={styles.listDescription}
              left={props => <List.Icon {...props} icon="email" color="#000000" />}
              onPress={handleEmail}
            />
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>Office Hours</Title>
            <Paragraph style={styles.paragraph}>Monday - Friday: 9:00 - 17:00</Paragraph>
            <Paragraph style={styles.paragraph}>Saturday: 10:00 - 14:00</Paragraph>
            <Paragraph style={styles.paragraph}>Sunday: Closed</Paragraph>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>Location</Title>
            <Paragraph style={styles.paragraph}>MKA Germany</Paragraph>
            <Paragraph style={styles.paragraph}>Genfer Straße 11</Paragraph>
            <Paragraph style={styles.paragraph}>60437 Frankfurt am Main</Paragraph>
          </Card.Content>
        </Card>

        <Button
          mode="contained"
          onPress={handleCall}
          style={styles.button}
          icon="phone"
          color="#000000"
          labelStyle={styles.buttonLabel}
        >
          Call Now
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#000000',
  },
  card: {
    marginBottom: 20,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#000000',
  },
  cardTitle: {
    color: '#000000',
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#000000',
  },
  buttonLabel: {
    color: '#ffffff',
  },
  listTitle: {
    color: '#000000',
  },
  listDescription: {
    color: '#666666',
  },
  paragraph: {
    color: '#000000',
  },
});
