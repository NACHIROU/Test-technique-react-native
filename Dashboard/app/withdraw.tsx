import React from "react";
import {View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert} from "react-native";
import { useForm, Controller} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTheme } from '../src/theme/ThemeContext';
import { WithdrawSchema, WithdrawData } from '../src/utils/validation';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function WithdrawScreen() {
  const { theme } = useTheme();
  const router = useRouter();

  // Initialisation du formulaire avec Zod
  const { control, handleSubmit, watch, formState: { errors } } = useForm<WithdrawData>({
    resolver: zodResolver(WithdrawSchema),
    defaultValues: { amountXOF: 0, phoneNumber: '229', provider: 'MTN' }
  });

  // On surveille le montant pour calculer les frais en temps réel
  const amount = watch('amountXOF');
  const fees = amount * 0.02;
  const totalToDeduct = amount + fees;

  const onSubmit = (data: WithdrawData) => {
    Alert.alert(
      "Confirmation", 
      `Retrait de ${data.amountXOF} FCFA vers le ${data.phoneNumber} (${data.provider}) confirmé.`
    );
    router.back();
  };

return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.text }]}>Retrait</Text>
      </View>

      <View style={styles.form}>
        {/* Champ Montant */}
        <Text style={[styles.label, { color: theme.textMuted }]}>Montant à retirer (FCFA)</Text>
        <Controller
          control={control}
          name="amountXOF"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={[styles.input, { backgroundColor: theme.surface, color: theme.text, borderColor: errors.amountXOF ? theme.error : 'transparent' }]}
              keyboardType="numeric"
              placeholder="Ex: 5000"
              placeholderTextColor={theme.textMuted}
              onChangeText={(val) => onChange(Number(val))}
            />
          )}
        />
        {errors.amountXOF && <Text style={{ color: theme.error }}>{errors.amountXOF.message}</Text>}

        {/* Résumé des frais (Calcul automatique) */}
        <View style={[styles.feesBox, { backgroundColor: theme.surface }]}>
          <View style={styles.feeRow}>
            <Text style={{ color: theme.textMuted }}>Frais (2%) :</Text>
            <Text style={{ color: theme.text }}>{fees} FCFA</Text>
          </View>
          <View style={styles.feeRow}>
            <Text style={{ color: theme.text, fontWeight: 'bold' }}>Total à déduire :</Text>
            <Text style={{ color: theme.primary, fontWeight: 'bold' }}>{totalToDeduct} FCFA</Text>
          </View>
        </View>

        {/* Champ Numéro de Téléphone */}
        <Text style={[styles.label, { color: theme.textMuted, marginTop: 20 }]}>Numéro Mobile Money</Text>
        <Controller
          control={control}
          name="phoneNumber"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={[styles.input, { backgroundColor: theme.surface, color: theme.text, borderColor: errors.phoneNumber ? theme.error : 'transparent' }]}
              keyboardType="phone-pad"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.phoneNumber && <Text style={{ color: theme.error }}>{errors.phoneNumber.message}</Text>}

        {/* Bouton de validation */}
        <TouchableOpacity 
          style={[styles.submitButton, { backgroundColor: theme.primary }]} 
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={[styles.submitText, { color: theme.background }]}>Confirmer le retrait</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { flexDirection: 'row', alignItems: 'center', marginTop: 40, marginBottom: 30 },
  backButton: { padding: 8, borderRadius: 12, marginRight: 10 },
  title: { fontSize: 20, fontWeight: '800' },
  form: { marginTop: 10 },
  label: { fontSize: 14, fontWeight: '600', marginBottom: 8 },
  input: { padding: 16, borderRadius: 16, fontSize: 16, borderWidth: 2, marginBottom: 5 },
  feesBox: { padding: 15, borderRadius: 16, marginTop: 15 },
  feeRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  submitButton: { padding: 18, borderRadius: 16, alignItems: 'center', marginTop: 40 },
  submitText: { fontSize: 16, fontWeight: '800' },
});