import React, { useRef } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Surface, Title, Text, Card, Divider } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { chandaRates } from '../data/chandaInfo';

const InfoScreen = () => {
  const scrollViewRef = useRef(null);

  useFocusEffect(
    React.useCallback(() => {
      // Scroll to top when screen comes into focus
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    }, [])
  );

  const renderSection = (title, content) => (
    <View style={styles.section}>
      <Title style={styles.sectionTitle}>{title}</Title>
      <Text style={styles.sectionContent}>{content}</Text>
    </View>
  );

  return (
    <ScrollView 
      ref={scrollViewRef}
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Surface style={styles.heroSection}>
        <Title style={styles.heroTitle}>Chanda Information</Title>
        <Text style={styles.heroSubtitle}>Information über die Spenden der Jamaat Ahmadiyya Muslim Gemeinschaft</Text>
      </Surface>

      <View style={styles.content}>
        <Card style={[styles.infoCard, styles.ratesCard]}>
          <Card.Content>
            <Title style={styles.ratesTitle}>Chanda Übersicht</Title>
            <Divider style={styles.divider} />
            
            {chandaRates.map((item, index) => (
              <View key={index} style={styles.rateItem}>
                <Text style={styles.rateLabel}>{item.name}</Text>
                <Text style={styles.rateValue}>{item.rate}</Text>
                <Text style={styles.rateDescription}>{item.description}</Text>
              </View>
            ))}
          </Card.Content>
        </Card>

        <Card style={styles.infoCard}>
          <Card.Content>
            <Title style={styles.infoTitle}>Übersicht der Spenden</Title>
            <Text style={styles.introText}>
              In der Ahmadiyya Muslim Gemeinschaft gibt es sowohl verpflichtende als auch freiwillige Spenden, 
              die von den Mitgliedern geleistet werden.
            </Text>
            
            <View style={styles.categorySection}>
              <Title style={styles.categoryTitle}>Verpflichtende Spenden</Title>
              <Divider style={styles.categoryDivider} />
              
              {/* Chanda Aam */}
              {renderSection("1. Chanda Aam", 
                "Initiator: Eingeführt von Hazrat Mirza Ghulam Ahmad, dem Gründer der Ahmadiyya Muslim Gemeinschaft.\n\n" +
                "Zweck: Dient zur Deckung der allgemeinen Ausgaben der Gemeinschaft, einschließlich Verwaltung, Bildung und Missionsarbeit."
              )}
              
              {/* Chanda Jalsa Salana */}
              {renderSection("2. Chanda Jalsa Salana",
                "Initiator: Eingeführt von Hazrat Mirza Ghulam Ahmad.\n\n" +
                "Zweck: Finanzierung der jährlichen Versammlung (Jalsa Salana) der Gemeinschaft, die der spirituellen Erbauung und Gemeinschaftsförderung dient."
              )}
              
              {/* Chanda Wasiyyat */}
              {renderSection("3. Chanda Wasiyyat",
                "Initiator: Eingeführt von Hazrat Mirza Ghulam Ahmad im Rahmen des \"Nizam-e-Wasiyyat\" (System des Testaments).\n\n" +
                "Zweck: Unterstützung von Missionsarbeit, Bau von Moscheen und humanitären Projekten."
              )}
              
              {/* Khuddam-ul-Ahmadiyya */}
              {renderSection("4. Chanda Khuddam-ul-Ahmadiyya",
                "Initiator: Eingeführt von Hazrat Mirza Bashiruddin Mahmud Ahmad, dem zweiten Kalifen der Ahmadiyya Muslim Gemeinschaft.\n\n" +
                "Zweck: Unterstützung der Aktivitäten der Jugendorganisation Khuddam-ul-Ahmadiyya, einschließlich Bildungs- und Sozialprogramme."
              )}
              
              {/* Zakat */}
              {renderSection("5. Zakat",
                "Initiator: Eine der fünf Säulen des Islam, von Prophet Muhammad (Friede sei auf ihm) etabliert.\n\n" +
                "Zweck: Reinigung des Vermögens und Unterstützung der Bedürftigen."
              )}
            </View>

            <View style={styles.categorySection}>
              <Title style={styles.categoryTitle}>Freiwillige Spenden</Title>
              <Divider style={styles.categoryDivider} />
              
              {/* Tehrik-e-Jadid */}
              {renderSection("1. Tehrik-e-Jadid",
                "Initiator: Eingeführt 1934 von Hazrat Mirza Bashiruddin Mahmud Ahmad, dem zweiten Kalifen.\n\n" +
                "Zweck: Förderung der weltweiten Missionsarbeit und Verbreitung der islamischen Lehre."
              )}
              
              {/* Waqf-e-Jadid */}
              {renderSection("2. Waqf-e-Jadid",
                "Initiator: Eingeführt 1957 von Hazrat Mirza Bashiruddin Mahmud Ahmad.\n\n" +
                "Zweck: Stärkung der religiösen Bildung und Missionsarbeit in ländlichen Gebieten, insbesondere in Südasien."
              )}
              
              {/* Sadqa */}
              {renderSection("3. Sadqa",
                "Initiator: Basierend auf islamischer Tradition.\n\n" +
                "Zweck: Unterstützung Bedürftiger und Förderung sozialer Gerechtigkeit."
              )}
            </View>

            <View style={styles.noteSection}>
              <Title style={styles.noteTitle}>Hinweis</Title>
              <Text style={styles.noteText}>
                Es ist ratsam, sich bei Unsicherheiten oder Fragen bezüglich der Beitragssätze und Verpflichtungen 
                an die lokalen Vertreter oder Finanzsekretäre der Gemeinschaft zu wenden, um genaue und aktuelle 
                Informationen zu erhalten.
              </Text>
            </View>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  heroSection: {
    padding: 24,
    backgroundColor: '#333333',
    elevation: 4,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#cccccc',
    textAlign: 'center',
    marginTop: 8,
  },
  content: {
    padding: 16,
  },
  infoCard: {
    borderRadius: 12,
    elevation: 4,
    backgroundColor: '#ffffff',
    marginBottom: 16,
  },
  infoTitle: {
    fontSize: 22,
    color: '#2c3e50',
    marginBottom: 16,
  },
  introText: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 24,
    marginBottom: 24,
  },
  categorySection: {
    marginTop: 24,
  },
  categoryTitle: {
    fontSize: 20,
    color: '#2c3e50',
    marginBottom: 12,
  },
  categoryDivider: {
    backgroundColor: '#e0e0e0',
    height: 1,
    marginBottom: 16,
  },
  section: {
    marginBottom: 24,
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#2c3e50',
  },
  sectionTitle: {
    fontSize: 18,
    color: '#2c3e50',
    marginBottom: 12,
  },
  sectionContent: {
    fontSize: 15,
    color: '#666666',
    lineHeight: 22,
  },
  noteSection: {
    marginTop: 24,
    padding: 16,
    backgroundColor: '#fff3cd',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#ffc107',
  },
  noteTitle: {
    fontSize: 18,
    color: '#856404',
    marginBottom: 8,
  },
  noteText: {
    fontSize: 15,
    color: '#856404',
    lineHeight: 22,
  },
  ratesCard: {
    marginTop: 16,
  },
  ratesTitle: {
    fontSize: 20,
    color: '#2c3e50',
    marginBottom: 8,
  },
  divider: {
    backgroundColor: '#e0e0e0',
    height: 1,
    marginVertical: 12,
  },
  rateItem: {
    marginVertical: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  rateLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  rateValue: {
    fontSize: 14,
    color: '#28a745',
    marginBottom: 2,
  },
  rateDescription: {
    fontSize: 14,
    color: '#666666',
  },
});

export default InfoScreen;
