import React, { useEffect, useRef } from "react";
import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, Animated } from "react-native";
import { useTheme } from "../theme/ThemeContext";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface BalanceCardProps {
    btcBalance: number | null;
    btcPrice: number | null;
    loading: boolean;
}


import { styles } from "./BalanceCard.styles";

export const BalanceCard = ({ btcBalance, btcPrice , loading }: BalanceCardProps) => {
    const { theme } = useTheme();
    const router = useRouter();

    // Le fond de la carte étant toujours jaune (theme.primary), on force une couleur de texte très sombre pour un contraste parfait.
    const cardTextColor = '#0F172A';

    const floatAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(floatAnim, {
                    toValue: 1,
                    duration: 1500,
                    useNativeDriver: true,
                }),
                Animated.timing(floatAnim, {
                    toValue: 0,
                    duration: 1500,
                    useNativeDriver: true,
                })
            ])
        ).start();
    }, [floatAnim]);

    const translateY = floatAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -8]
    });

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

      {/* Ligne du haut : Label et Icône */}
      <View style={styles.topRow}>
        <View style={styles.labelContainer}>
          <Text style={[styles.label, { color: cardTextColor }]}>SOLDE TOTAL</Text>
          <TouchableOpacity style={styles.eyeButton}>
            <Ionicons name="eye-outline" size={20} color={cardTextColor} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.middleRow}>
        {/* Bloc des montants empilés (à gauche) */}
        <View style={styles.amountContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
            <Text style={[styles.btcAmount, { color: cardTextColor }]}>
              {btcBalance} BTC
            </Text>
            {/* Badge d'évolution en exposant */}
            <View style={[styles.trendBadge, { marginTop: 6, marginLeft: 6 }]}>
              <Ionicons name="trending-up" size={14} color="#065F46" />
              <Text style={styles.trendText}>+5.2%</Text>
            </View>
          </View>
          
          {loading ? (
            <ActivityIndicator size="small" color={cardTextColor} style={{ alignSelf: 'flex-start', marginTop: 5 }} />
          ) : (
            <Text style={[styles.fiatAmount, { color: cardTextColor }]}>
              ≈ {fiatValue}
            </Text>
          )}

        </View>

        {/* Bloc à droite du montant */}
        <View style={styles.rightColumn}>

          
          <Animated.View style={[styles.floatingCoin, { transform: [{ translateY }] }]}>
            <FontAwesome5 name="bitcoin" size={42} color="rgba(0,0,0,0.15)" />
          </Animated.View>
        </View>
      </View>

      {/* Ligne des boutons d'actions solides (CTAs principaux) */}
      <View style={styles.actionRow}>
        <TouchableOpacity style={[styles.ctaButton, { backgroundColor: cardTextColor }]}>
          <Ionicons name="arrow-down" size={16} color={theme.primary} />
          <Text style={[styles.ctaText, { color: theme.primary }]}>Dépôt</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.ctaButton, { backgroundColor: cardTextColor }]} onPress={() => router.push('/withdraw')}>
          <Ionicons name="arrow-up" size={16} color={theme.primary} />
          <Text style={[styles.ctaText, { color: theme.primary }]}>Retrait</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.ctaButton, { backgroundColor: 'rgba(0,0,0,0.1)' }]}>
          <Ionicons name="swap-horizontal" size={16} color={cardTextColor} />
          <Text style={[styles.ctaText, { color: cardTextColor }]}>Échange</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

