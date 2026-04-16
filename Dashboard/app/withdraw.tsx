import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Modal, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { useTheme } from '../src/theme/ThemeContext';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { styles } from "./withdraw.styles";

export default function WithdrawScreen() {
  const { theme } = useTheme();
  
  // États
  const [provider, setProvider] = useState<'MTN' | 'Moov' | null>(null);
  const [amountXOF, setAmountXOF] = useState('');
  const [debitXOF, setDebitXOF] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [confirmPhone, setConfirmPhone] = useState('');
  
  // Modale
  const [isProcessing, setIsProcessing] = useState(false);

  // --- LOGIQUE DE CALCUL BIDIRECTIONNEL ---
  const handleAmountChange = (val: string) => {
    setAmountXOF(val);
    const num = Number(val);
    if (!isNaN(num) && num > 0) {
      // Si je veux retirer 1000, le débit doit être 1000 + 2% = 1020
      setDebitXOF((num * 1.02).toFixed(0).toString());
    } else {
      setDebitXOF('');
    }
  };

  const handleDebitChange = (val: string) => {
    setDebitXOF(val);
    const num = Number(val);
    if (!isNaN(num) && num > 0) {
      // Si je veux être débité de 1020, j'aurai 1020 / 1.02 = 1000
      setAmountXOF((num / 1.02).toFixed(0).toString());
    } else {
      setAmountXOF('');
    }
  };

  // Logique de validation
  const amount = Number(amountXOF) || 0;
  const isPhoneValid = phoneNumber.length >= 8;
  const phoneMatch = isPhoneValid && phoneNumber === confirmPhone;
  const canSubmit = phoneMatch && amount > 0 && provider !== null;

  // Calcul de la barre de progression circulaire
  let currentStep = 1;
  if (isProcessing) {
    currentStep = 3; // Validation finale
  } else if (provider) {
    currentStep = 2; // Formulaire affiché
  }

  const onSubmit = () => {
    if (!canSubmit) return;
    setIsProcessing(true);
  };

  return (
    <KeyboardAvoidingView 
      style={[styles.container, { backgroundColor: theme.background }]} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      
      {/* HEADER FIXE */}
      <View style={[styles.headerContainer, { backgroundColor: theme.background }]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={theme.text} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: theme.text }]}>Retrait</Text>
        </View>

        {/* PROGRESSION AVEC CERCLES */}
        <View style={styles.stepperContainer}>
          <View style={styles.step}>
            <View style={[styles.stepCircle, currentStep >= 1 ? { backgroundColor: theme.primary } : { backgroundColor: theme.surface }]}>
              <Text style={[styles.stepNumber, currentStep >= 1 ? { color: '#FFF' } : { color: theme.textMuted }]}>1</Text>
            </View>
            <Text style={[styles.stepLabel, currentStep >= 1 ? { color: theme.text } : { color: theme.textMuted }]}>Opérateur</Text>
          </View>

          <View style={[styles.stepLine, currentStep >= 2 ? { backgroundColor: theme.primary } : { backgroundColor: theme.surface }]} />

          <View style={styles.step}>
            <View style={[styles.stepCircle, currentStep >= 2 ? { backgroundColor: theme.primary } : { backgroundColor: theme.surface }]}>
              <Text style={[styles.stepNumber, currentStep >= 2 ? { color: '#FFF' } : { color: theme.textMuted }]}>2</Text>
            </View>
            <Text style={[styles.stepLabel, currentStep >= 2 ? { color: theme.text } : { color: theme.textMuted }]}>Détails</Text>
          </View>

          <View style={[styles.stepLine, currentStep === 3 ? { backgroundColor: theme.primary } : { backgroundColor: theme.surface }]} />

          <View style={styles.step}>
            <View style={[styles.stepCircle, currentStep === 3 ? { backgroundColor: theme.primary } : { backgroundColor: theme.surface }]}>
              <Text style={[styles.stepNumber, currentStep === 3 ? { color: '#FFF' } : { color: theme.textMuted }]}>3</Text>
            </View>
            <Text style={[styles.stepLabel, currentStep === 3 ? { color: theme.text } : { color: theme.textMuted }]}>Validation</Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        {/* ÉTAPE 1: CHOIX OPÉRATEUR (Design Premium Revolut-style) */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Méthode de retrait</Text>
        
        <View style={{ gap: 12 }}>
          
          <TouchableOpacity 
            style={[
              styles.paymentMethodCard, 
              { backgroundColor: theme.surface, borderColor: provider === 'MTN' ? '#FFCC00' : 'rgba(150,150,150,0.1)' }
            ]} 
            onPress={() => setProvider('MTN')}
            activeOpacity={0.7}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={require('../assets/images/mtn.jpeg')} style={styles.paymentLogo} />
              <View style={{ marginLeft: 16 }}>
                <Text style={[styles.paymentName, { color: theme.text }]}>MTN Mobile Money</Text>
                <Text style={{ color: theme.textMuted, fontSize: 12, marginTop: 4 }}>2% de frais</Text>
              </View>
            </View>
            <View style={[
              styles.radioCircle, 
              { borderColor: provider === 'MTN' ? '#FFCC00' : theme.textMuted },
              provider === 'MTN' && { backgroundColor: '#FFCC00', borderColor: '#FFCC00' }
            ]}>
              {provider === 'MTN' && <Ionicons name="checkmark-sharp" size={16} color="#000" />}
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[
              styles.paymentMethodCard, 
              { backgroundColor: theme.surface, borderColor: provider === 'Moov' ? '#0066B3' : 'rgba(150,150,150,0.1)' }
            ]} 
            onPress={() => setProvider('Moov')}
            activeOpacity={0.7}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={require('../assets/images/moov.png')} style={styles.paymentLogo} />
              <View style={{ marginLeft: 16 }}>
                <Text style={[styles.paymentName, { color: theme.text }]}>Moov Money</Text>
                <Text style={{ color: theme.textMuted, fontSize: 12, marginTop: 4 }}>2% de frais</Text>
              </View>
            </View>
            <View style={[
              styles.radioCircle, 
              { borderColor: provider === 'Moov' ? '#0066B3' : theme.textMuted },
              provider === 'Moov' && { backgroundColor: '#0066B3', borderColor: '#0066B3' }
            ]}>
              {provider === 'Moov' && <Ionicons name="checkmark-sharp" size={16} color="#FFF" />}
            </View>
          </TouchableOpacity>

        </View>

        {/* ÉTAPE 2: FORMULAIRE COMPLET (Caché si pas d'opérateur) */}
        {provider && (
          <View style={styles.formSection}>
            
            {/* MONTANTS */}
            <View style={styles.inputWrapper}>
              <Text style={[styles.minimalLabel, { color: theme.text, opacity: 0.8 }]}>Montant à retirer (FCFA)</Text>
              <View style={[styles.minimalInputGroup, { borderColor: theme.textMuted }]}>
                <TextInput
                  style={[styles.minimalInput, { color: theme.text }]}
                  keyboardType="numeric"
                  placeholder="0"
                  placeholderTextColor={theme.textMuted}
                  value={amountXOF}
                  onChangeText={handleAmountChange}
                />
              </View>
            </View>

            <View style={styles.inputWrapper}>
              <Text style={[styles.minimalLabel, { color: theme.text, opacity: 0.8 }]}>Débit de votre compte (frais inclus)</Text>
              <View style={[styles.minimalInputGroup, { borderColor: theme.textMuted }]}>
                <TextInput
                  style={[styles.minimalInput, { color: theme.primary }]}
                  keyboardType="numeric"
                  placeholder="0"
                  placeholderTextColor={theme.textMuted}
                  value={debitXOF}
                  onChangeText={handleDebitChange}
                />
              </View>
            </View>

            {/* NUMÉROS */}
            <View style={[styles.inputWrapper, { marginTop: 5 }]}>
              <Text style={[styles.minimalLabel, { color: theme.text, opacity: 0.8 }]}>Numéro de réception</Text>
              <View style={[styles.minimalInputGroup, { borderColor: theme.textMuted }]}>
                <TextInput
                  style={[styles.minimalInput, { color: theme.text }]}
                  keyboardType="phone-pad"
                  maxLength={10}
                  placeholder="0197010203"
                  placeholderTextColor={theme.textMuted}
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                />
              </View>
            </View>

            <View style={styles.inputWrapper}>
              <Text style={[styles.minimalLabel, { color: confirmPhone.length > 0 && !phoneMatch ? theme.error : theme.text, opacity: confirmPhone.length > 0 && !phoneMatch ? 1 : 0.8 }]}>
                Confirmez le numéro
              </Text>
              <View style={[
                styles.minimalInputGroup, 
                { borderColor: theme.textMuted },
                confirmPhone.length > 0 && !phoneMatch ? { borderColor: theme.error } : {}
              ]}>
                <TextInput
                  style={[styles.minimalInput, { color: confirmPhone.length > 0 && !phoneMatch ? theme.error : theme.text }]}
                  keyboardType="phone-pad"
                  maxLength={10}
                  placeholder="0197010203"
                  placeholderTextColor={theme.textMuted}
                  value={confirmPhone}
                  onChangeText={setConfirmPhone}
                />
              </View>
            </View>
            
            {/* WARNING SI NUMÉRO MISMATCH */}
            {confirmPhone.length > 0 && !phoneMatch && (
                <Text style={{ color: theme.error, marginTop: -5, marginBottom: 15, fontSize: 13, textAlign: 'center' }}>⚠️ Les numéros ne sont pas identiques.</Text>
            )}

            {/* BOUTON SOUMETTRE */}
            <TouchableOpacity 
              style={[
                styles.submitButton, 
                { backgroundColor: canSubmit ? theme.primary : theme.surface }
              ]} 
              onPress={onSubmit}
              disabled={!canSubmit}
            >
              <Text style={[styles.submitText, { color: canSubmit ? theme.background : theme.textMuted }]}>Valider la transaction</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* MODALE DE SUCCÈS PREMIUM */}
      <Modal visible={isProcessing} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalPremium, { backgroundColor: theme.surface }]}>
            
            <View style={styles.iconCircleWrapper}>
              <View style={[styles.iconCircle, { backgroundColor: 'rgba(34, 197, 94, 0.15)' }]}>
                <Ionicons name="checkmark-done" size={40} color="#22C55E" />
              </View>
            </View>

            <Text style={[styles.modalPremiumTitle, { color: theme.text }]}>Demande enregistrée !</Text>
            
            <View style={styles.modalBody}>
               <Text style={[styles.modalPremiumDesc, { color: theme.textMuted }]}>
                  Votre retrait de <Text style={{fontWeight: '700', color: theme.text}}>{amount} FCFA</Text> vers le <Text style={{fontWeight: '700', color: theme.text}}>{phoneNumber}</Text> ({provider}) a été pris en compte.
               </Text>
               <Text style={[styles.modalPremiumDesc, { color: theme.textMuted, marginTop: 15 }]}>
                  Il est actuellement <Text style={{fontWeight: '600', color: theme.primary}}>en cours de traitement</Text> par l'opérateur et sera validé sous peu.
               </Text>
            </View>

            <TouchableOpacity 
              style={[styles.modalCloseBtn, { backgroundColor: theme.primary }]}
              onPress={() => { setIsProcessing(false); router.replace('/(tabs)'); }}
            >
              <Text style={{ color: theme.background, fontWeight: '700', fontSize: 16 }}>Fermer et retourner à l'accueil</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>

    </KeyboardAvoidingView>
  );
}

