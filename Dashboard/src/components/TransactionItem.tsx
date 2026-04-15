import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';

interface TransactionProps {
  type: 'retrait' | 'depot';
  amount: string;
  date: string;
  status: string;
}

export const TransactionItem = ({ type, amount, date, status }: TransactionProps) => {
  const { theme } = useTheme();
  const isRetrait = type === 'retrait';

  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      <View style={[styles.iconContainer, { backgroundColor: isRetrait ? 'rgba(239, 68, 68, 0.1)' : 'rgba(34, 197, 94, 0.1)' }]}>
        <Ionicons 
          name={isRetrait ? "arrow-up-outline" : "arrow-down-outline"} 
          size={20} 
          color={isRetrait ? theme.error : theme.success} 
        />
      </View>
      <View style={styles.details}>
        <Text style={[styles.title, { color: theme.text }]}>{isRetrait ? "Retrait Mobile Money" : "Dépôt BTC"}</Text>
        <Text style={[styles.date, { color: theme.textMuted }]}>{date}</Text>
      </View>
      <View style={styles.amountContainer}>
        <Text style={[styles.amount, { color: isRetrait ? theme.error : theme.success }]}>
          {isRetrait ? '-' : '+'}{amount} FCFA
        </Text>
        <Text style={[styles.status, { color: theme.textMuted }]}>{status}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', padding: 16, borderRadius: 20, marginBottom: 12, alignItems: 'center' },
  iconContainer: { width: 45, height: 45, borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  details: { flex: 1 },
  title: { fontSize: 15, fontWeight: '700' },
  date: { fontSize: 12, marginTop: 2 },
  amountContainer: { alignItems: 'flex-end' },
  amount: { fontSize: 15, fontWeight: '800' },
  status: { fontSize: 10, marginTop: 2, textTransform: 'capitalize' },
});