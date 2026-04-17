import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
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
  const [modalVisible, setModalVisible] = useState(false);

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
    rotate = '-45deg'; 
  } else {
    // Fallback générique
    title = type.replace(/_/g, ' ');
    title = title.charAt(0).toUpperCase() + title.slice(1);
    isNegative = true;
    iconName = "ellipse";
    rotate = '0deg';
  }

  return (
    <>
      <TouchableOpacity 
        style={styles.container} 
        onPress={() => setModalVisible(true)}
        activeOpacity={0.7}
      >
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
          <Text style={[styles.amount, { color: isNegative ? theme.text : theme.success }]}>
            {isNegative ? '-' : '+'}{amount} FCFA
          </Text>
          {['en attente', 'échoué', 'failed', 'pending'].includes(status.toLowerCase()) && (
             <Text style={[styles.status, { color: status.toLowerCase() === 'échoué' ? theme.error : theme.textMuted }]}>{status}</Text>
          )}
        </View>
      </TouchableOpacity>

      {/* MODALE REÇU DIGITAL (Bottom Sheet) */}
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={[styles.modalContent, { backgroundColor: theme.surface }]}>
                {/* Handle (poignée) */}
                <View style={styles.modalHandle} />

                <Text style={[styles.receiptTitle, { color: theme.text }]}>Reçu de transaction</Text>

                <View style={styles.receiptHeader}>
                  <View style={[styles.receiptIconCircle, { backgroundColor: isNegative ? theme.text + '11' : theme.success + '22' }]}>
                    <Ionicons name={iconName} size={32} color={isNegative ? theme.text : theme.success} style={{ transform: [{ rotate: rotate }] }} />
                  </View>
                  <Text style={[styles.receiptAmount, { color: theme.text }]}>
                    {isNegative ? '-' : '+'}{amount} FCFA
                  </Text>
                  <Text style={[styles.receiptStatusText, { color: status.toLowerCase() === 'échoué' ? theme.error : theme.success }]}>
                    {status.toUpperCase()}
                  </Text>
                </View>

                {/* Détails du reçu */}
                <View style={styles.receiptBody}>
                  <View style={styles.detailRow}>
                    <Text style={[styles.detailLabel, { color: theme.textMuted }]}>Type</Text>
                    <Text style={[styles.detailValue, { color: theme.text }]}>{title}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={[styles.detailLabel, { color: theme.textMuted }]}>Date & Heure</Text>
                    <Text style={[styles.detailValue, { color: theme.text }]}>{date} • 14:32</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={[styles.detailLabel, { color: theme.textMuted }]}>ID Transaction</Text>
                    <Text style={[styles.detailValue, { color: theme.text, fontSize: 10 }]}>TXN-98234-AD82-XPQ</Text>
                  </View>
                  <View style={[styles.detailRow, { borderBottomWidth: 0 }]}>
                    <Text style={[styles.detailLabel, { color: theme.textMuted }]}>Frais</Text>
                    <Text style={[styles.detailValue, { color: theme.text }]}>15 FCFA</Text>
                  </View>
                </View>

                {/* Bouton Partager */}
                <TouchableOpacity 
                   style={[styles.shareButton, { backgroundColor: theme.primary }]}
                   onPress={() => setModalVisible(false)}
                >
                  <Ionicons name="share-outline" size={20} color="#0F172A" />
                  <Text style={styles.shareText}>Partager le reçu</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                   style={styles.closeButton}
                   onPress={() => setModalVisible(false)}
                >
                  <Text style={[styles.closeText, { color: theme.textMuted }]}>Fermer</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
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
    fontWeight: '400',
  },
  date: {
    fontSize: 11,
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 14,
    fontWeight: '500',
  },
  status: {
    fontSize: 9,
    opacity: 0.6,
  },

  /* styles modale reçu */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    width: '100%',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: 12,
    paddingBottom: 30,
    alignItems: 'center',
  },
  modalHandle: {
    width: 40,
    height: 5,
    backgroundColor: 'rgba(150,150,150,0.3)',
    borderRadius: 3,
    marginBottom: 20,
  },
  receiptTitle: {
    fontSize: 14,
    fontWeight: '700',
    opacity: 0.6,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 20,
  },
  receiptHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  receiptIconCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  receiptAmount: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 4,
  },
  receiptStatusText: {
    fontSize: 12,
    fontWeight: '700',
  },
  receiptBody: {
    width: '100%',
    paddingHorizontal: 25,
    marginBottom: 25,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(150,150,150,0.1)',
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 16,
    width: '85%',
    gap: 10,
    marginBottom: 15,
  },
  shareText: {
    color: '#0F172A',
    fontWeight: '700',
    fontSize: 16,
  },
  closeButton: {
    paddingVertical: 10,
  },
  closeText: {
    fontSize: 15,
    fontWeight: '600',
  },
});