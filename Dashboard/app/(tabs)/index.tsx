import React, { useState, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, StatusBar, ScrollView, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../../src/theme/ThemeContext';
import { BalanceCard } from '../../src/components/BalanceCard';
import { getBitcoinPriceInXOF } from '../../src/services/cryptoService';
import { Header } from '../../src/components/Headers';
import { DashboardSchema } from '@/src/utils/validation';
import { TransactionItem } from '../../src/components/TransactionItem';

export default function DashboardScreen() {
  const { theme, mode } = useTheme();
  const [btcPrice, setBtcPrice] = useState(0);
  const [loading, setLoading] = useState(true);

const fetchPrice = async () => {
  try {
    setLoading(true);
    const price = await getBitcoinPriceInXOF();
    
    // VALIDATION AVEC ZOD
    const result = DashboardSchema.safeParse({
      btcBalance: 0.5, // Ton solde fixe pour le test
      btcPrice: price
    });

    if (!result.success) {
      console.error("Données invalides :", result.error.format());
      return;
    }

    setBtcPrice(result.data.btcPrice);
  } catch (error) {
    console.error("Erreur API", error);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchPrice();
  }, []);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={mode === 'dark' ? 'light-content' : 'dark-content'} />
      <ScrollView contentContainerStyle={styles.container}>
        <Header />
        <BalanceCard 
          btcBalance={0.5} 
          btcPrice={btcPrice} 
          loading={loading} 
        />
        <View style={styles.historySection}>
  <View style={styles.historyHeader}>
    <Text style={[styles.historyTitle, { color: theme.text }]}>
      Activités récentes
    </Text>
    <TouchableOpacity>
      <Text style={[styles.viewAllText, { color: theme.primary }]}>
        Voir tout
      </Text>
    </TouchableOpacity>
  </View>

  {/* Simulation de liste */}
  <TransactionItem type="retrait" amount="15 000" date="Aujourd'hui, 14:30" status="terminé" />
  <TransactionItem type="depot" amount="45 000" date="Hier, 09:15" status="terminé" />
</View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { paddingBottom: 20 },
  historySection: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: '800',
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
