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
      {/* Cercles décoratifs en arrière-plan */}
      <View style={styles.decorationCircle1} />
      <View style={styles.decorationCircle2} />

      {/* Ligne du haut : Label et Icône */}
      <View style={styles.topRow}>
        <View style={styles.labelContainer}>
          <Text style={[styles.label, { color: theme.background }]}>Solde Total</Text>
          <TouchableOpacity style={styles.eyeButton}>
            <Ionicons name="eye-outline" size={20} color={theme.background} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.optionsButton}>
            <Ionicons name="ellipsis-horizontal" size={20} color={theme.background} />
        </TouchableOpacity>
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

          
          <Animated.View style={[styles.floatingCoin, { transform: [{ translateY }] }]}>
            <FontAwesome5 name="bitcoin" size={42} color="rgba(255,255,255,0.4)" />
          </Animated.View>
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

