// src/components/TransactionItem.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';

interface TransactionProps {
  type: string;
  amount: string;
  date: string;
  status: string;
}

export const TransactionItem = ({ type, amount, date, status }: TransactionProps) => {
  const { theme } = useTheme();

  // Mapping dynamique en fonction du type de transaction
  let title = "Transaction";
  let isNegative = true;
  let iconName: any = "arrow-up";
  let rotate = '45deg';

  if (type.includes('retrait')) {
    title = "Retrait Mobile Money";
    isNegative = true;
    iconName = "arrow-up";
  } else if (type.includes('depot')) {
    title = "Dépôt BTC";
    isNegative = false;
    iconName = "arrow-down";
  } else if (type === 'frais_reseau') {
    title = "Frais de réseau";
    isNegative = true;
    iconName = "swap-horizontal";
    rotate = '0deg';
  } else if (type.includes('achat')) {
    title = "Achat Crypto";
    isNegative = true;
    iconName = "cart";
    rotate = '0deg';
  } else if (type.includes('transfert')) {
    title = "Transfert à un proche";
    isNegative = true;
    iconName = "send";
    rotate = '-45deg'; // L'icône send d'Ionicons pointe vers la droite, on l'incline un peu vers le haut
  } else {
    // Fallback générique
    title = type.replace(/_/g, ' ');
    title = title.charAt(0).toUpperCase() + title.slice(1);
    isNegative = true;
    iconName = "ellipse";
    rotate = '0deg';
  }

  return (
    <View style={styles.container}>
      {/* Icône simplifiée */}
      <View style={styles.iconWrapper}>
        <Ionicons 
          name={iconName} 
          size={20} 
          color={theme.text} 
          style={{ transform: [{ rotate: rotate }] }}
        />
      </View>

      <View style={styles.details}>
        <Text style={[styles.title, { color: theme.text }]}>
          {title}
        </Text>
        <Text style={[styles.date, { color: theme.textMuted }]}>{date}</Text>
      </View>

      <View style={styles.amountContainer}>
        <Text style={[styles.amount, { color: isNegative ? theme.error : theme.success }]}>
          {isNegative ? '-' : '+'}{amount} FCFA
        </Text>
        <Text style={[styles.status, { color: theme.textMuted }]}>{status}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 10, // Espace réduit entre les lignes
    alignItems: 'center',
    // Pas de background, pas de borderRadius ici pour enlever le cadre
  },
  iconWrapper: {
    width: 30,
    marginRight: 10,
  },
  details: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '500', // Moins gras
  },
  date: {
    fontSize: 11,
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 14,
    fontWeight: '600',
  },
  status: {
    fontSize: 9,
    opacity: 0.6,
  },
});