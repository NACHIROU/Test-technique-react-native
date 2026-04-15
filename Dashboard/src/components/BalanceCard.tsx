import React from "react";
import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity } from "react-native";
import { useTheme } from "../theme/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface BalanceCardProps {
    btcBalance: number | null;
    btcPrice: number | null;
    loading: boolean;
}


export const BalanceCard = ({ btcBalance, btcPrice , loading }: BalanceCardProps) => {
    const { theme } = useTheme();
    const router = useRouter();

    if (loading) {
        return (
            <View style={[styles.card, { backgroundColor: theme.surface }]}>
                <ActivityIndicator size="large" color={theme.primary} />
            </View>
        );
    }

    const fiatValue = ((btcBalance || 0) * (btcPrice || 0)).toLocaleString('fr-FR', {
        style: 'currency',
        currency: 'XOF',
        minimumFractionDigits: 0,
    });

  return (
    <View style={[styles.card, { backgroundColor: theme.primary }]}>
      {/* Cercles décoratifs en arrière-plan */}
      <View style={styles.decorationCircle1} />
      <View style={styles.decorationCircle2} />

      {/* Ligne du haut : Label et Icône */}
      <View style={styles.topRow}>
        <Text style={[styles.label, { color: theme.background }]}>Solde Total</Text>
      </View>

      <View style={styles.middleRow}>
        {/* Bloc des montants empilés (à gauche) */}
        <View style={styles.amountContainer}>
          <Text style={[styles.btcAmount, { color: theme.background }]}>
            {btcBalance} BTC
          </Text>
          
          {loading ? (
            <ActivityIndicator size="small" color={theme.background} style={{ alignSelf: 'flex-start', marginTop: 5 }} />
          ) : (
            <Text style={[styles.fiatAmount, { color: theme.background }]}>
              ≈ {fiatValue}
            </Text>
          )}

        </View>

        {/* Bloc à droite du montant */}
        <View style={styles.rightColumn}>
          <View style={styles.percentageBadge}>
            <Ionicons name="trending-up" size={14} color={theme.background} />
            <Text style={[styles.percentageText, { color: theme.background }]}>2.4%</Text>
          </View>
          
          <TouchableOpacity style={styles.eyeButton}>
            <Ionicons name="eye-outline" size={24} color={theme.background} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Ligne des boutons d'actions rapides pour combler l'espace */}
      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.actionButton}>
          <View style={styles.actionIconContainer}>
            <Ionicons name="arrow-down" size={16} color={theme.primary} />
          </View>
          <Text style={[styles.actionText, { color: theme.background }]}>Dépôt</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/withdraw')}>
          <View style={styles.actionIconContainer}>
            <Ionicons name="arrow-up" size={16} color={theme.primary} />
          </View>
          <Text style={[styles.actionText, { color: theme.background }]}>Retrait</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <View style={styles.actionIconContainer}>
            <Ionicons name="swap-horizontal" size={16} color={theme.primary} />
          </View>
          <Text style={[styles.actionText, { color: theme.background }]}>Échange</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 32,
    padding: 24,
    marginHorizontal: 20,
    marginTop: 10,
    overflow: 'hidden', // IMPORTANT: Permet aux cercles décoratifs de ne pas déborder
    borderWidth: 1, // Bordure premium subtile demandée
    borderColor: 'rgba(255, 255, 255, 0.3)',
    // Ombre pour donner du relief
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 10,
  },
  decorationCircle1: {
    position: 'absolute',
    top: -40,
    right: -20,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  decorationCircle2: {
    position: 'absolute',
    bottom: -50,
    right: 50,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  middleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    opacity: 0.9,
  },
  amountContainer: {
    marginBottom: 10,
  },
  btcAmount: {
    fontSize: 38,
    fontWeight: '800',
    letterSpacing: -1,
  },
  fiatAmount: {
    fontSize: 18,
    fontWeight: '600',
    opacity: 0.9,
    marginTop: 6,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    marginTop: 12, // Écarte un peu le footer des montants
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
    marginRight: 6,
  },
  footerText: {
    fontSize: 10,
    fontWeight: '700',
  },
  rightColumn: {
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
  percentageBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.25)', 
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  percentageText: {
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 4,
  },
  eyeButton: {
    marginTop: 24,
    opacity: 0.8,
  },
  // Nouveaux styles pour les boutons d'actions
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.15)',
  },
  actionButton: {
    alignItems: 'center',
    flex: 1,
  },
  actionIconContainer: {
    backgroundColor: '#FFFFFF',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '600',
  },
});