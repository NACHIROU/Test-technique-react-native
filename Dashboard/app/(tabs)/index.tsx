import React, { useState, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, StatusBar, ScrollView, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../../src/theme/ThemeContext';
import { BalanceCard } from '../../src/components/BalanceCard';
import { getBitcoinPriceInXOF } from '../../src/services/cryptoService';
import { Header } from '../../src/components/Headers';
import { DashboardSchema } from '@/src/utils/validation';
import { TransactionItem } from '../../src/components/TransactionItem';
import { Ionicons } from '@expo/vector-icons';

export default function DashboardScreen() {
  const { theme, mode } = useTheme();
  const [btcPrice, setBtcPrice] = useState(0);
  const [loading, setLoading] = useState(true);


  const [transactions, setTransactions] = useState([
  { id: 1, type: 'retrait_mtn', amount: '15 000', date: '14:30', status: 'terminé' },
  { id: 2, type: 'depot_btc', amount: '45 000', date: 'Hier', status: 'terminé' },
]);

const fetchPrice = async () => {
  try {
    setLoading(true);
    const price = await getBitcoinPriceInXOF();
    
    /* --- API & Validation --- */
    const result = DashboardSchema.safeParse({
      btcBalance: 0.5, 
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
    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text style={[styles.viewAllText, { color: theme.primary, marginRight: 2 }]}>
        Voir tout
      </Text>
      <Ionicons name="chevron-forward" size={14} color={theme.primary} />
    </TouchableOpacity>
  </View>

  {/* --- Composants Transactions --- */}
  <TransactionItem type="retrait" amount="5 000" date="Aujourd'hui, 10:45" status="succès" />
  <TransactionItem type="depot" amount="120 000" date="Aujourd'hui, 09:12" status="succès" />
  <TransactionItem type="retrait" amount="2 500" date="Hier, 18:30" status="succès" />
  <TransactionItem type="frais_reseau" amount="450" date="Hier, 18:30" status="terminé" />
  <TransactionItem type="achat" amount="7 500" date="14 Avril, 08:15" status="terminé" />
  <TransactionItem type="depot" amount="15 000" date="12 Avril, 15:45" status="succès" />
  <TransactionItem type="achat" amount="50 000" date="12 Avril, 14:00" status="terminé" />
  <TransactionItem type="transfert" amount="10 000" date="10 Avril, 11:20" status="succès" />
  
</View>
      </ScrollView>

      {/* ======================================= */}
      {/* COMPOSANT : Navigation (Tab Bar)        */}
      {/* ======================================= */}
      <View style={[styles.floatingTabBar, { backgroundColor: theme.surface, borderColor: 'rgba(150,150,150,0.1)' }]}>
        <TouchableOpacity style={styles.tabItem} activeOpacity={0.7}>
          <Ionicons name="home" size={20} color={theme.primary} />
          <Text style={[styles.tabLabel, { color: theme.primary }]}>Accueil</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.tabItem} activeOpacity={0.7}>
          <Ionicons name="pie-chart-outline" size={20} color={theme.textMuted} />
          <Text style={[styles.tabLabel, { color: theme.textMuted }]}>Marchés</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.tabItem} activeOpacity={0.7}>
          <Ionicons name="wallet-outline" size={20} color={theme.textMuted} />
          <Text style={[styles.tabLabel, { color: theme.textMuted }]}>Portefeuille</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem} activeOpacity={0.7}>
          <Ionicons name="person-outline" size={20} color={theme.textMuted} />
          <Text style={[styles.tabLabel, { color: theme.textMuted }]}>Profil</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { paddingBottom: 130 }, 

  /* --- SECTION HISTORIQUE --- */
  historySection: {
    paddingHorizontal: 20,
    marginTop: 32,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: '500',
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '600',
  },

  /* --- SECTION TAB BAR --- */
  floatingTabBar: {
    position: 'absolute',
    bottom: 25,
    left: 20,
    right: 20,
    height: 65,
    borderRadius: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '700',
    marginTop: 4,
  }
});
