import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  /* ========================================= */
  /* STYLES GÉNÉRAUX DE LA VUE                 */
  /* ========================================= */
  container: { flex: 1 },
  scrollContainer: { padding: 20, paddingBottom: 50 },

  /* ========================================= */
  /* EN-TÊTE ET BARRE DE PROGRESSION           */
  /* ========================================= */
  headerContainer: { 
    paddingTop: 50, 
    paddingHorizontal: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
    zIndex: 10,
  },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  backButton: { marginRight: 15, padding: 4 },
  title: { fontSize: 22, fontWeight: '800' },
  
  stepperContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 5, paddingHorizontal: 10 },
  step: { alignItems: 'center', flex: 1 },
  stepCircle: { width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginBottom: 6 },
  stepNumber: { fontSize: 14, fontWeight: '800' },
  stepLabel: { fontSize: 11, fontWeight: '600' },
  stepLine: { flex: 1, height: 3, borderRadius: 1.5, marginHorizontal: 5, marginTop: -20 },

  /* ========================================= */
  /* TITRES DES SECTIONS                       */
  /* ========================================= */
  sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 15 },
  subLabel: { fontSize: 13, fontWeight: '600', marginBottom: 6, marginLeft: 2 },
  
  /* ========================================= */
  /* SÉLECTEUR DE MÉTHODE DE RETRAIT (MTN/Moov)*/
  /* ========================================= */
  paymentMethodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 16,
    borderWidth: 1.5,
  },
  paymentLogo: {
    width: 44,
    height: 44,
    borderRadius: 12,
  },
  paymentName: {
    fontSize: 16,
    fontWeight: '700',
  },
  radioCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* ========================================= */
  /* GROUPES D'ENTRÉE DU FORMULAIRE DE RETRAIT */
  /* ========================================= */
  formSection: { marginTop: 15, paddingHorizontal: 10 },
  inputWrapper: {
    marginBottom: 10,
  },
  minimalInputGroup: { 
    borderWidth: 1, 
    borderRadius: 14,
    padding: 12,
  },
  minimalLabel: { 
    fontSize: 13, 
    fontWeight: '400', 
    marginBottom: 8,
    marginLeft: 4,
  },
  minimalInput: { 
    fontSize: 16, 
    fontWeight: '400', 
    padding: 0,
  },
  
  /* ========================================= */
  /* BOUTON DE SOUMISSION DU FORMULAIRE        */
  /* ========================================= */
  submitButton: { padding: 16, borderRadius: 16, alignItems: 'center', marginTop: 15 },
  submitText: { fontSize: 16, fontWeight: '700' },

  /* ========================================= */
  /* MODALE PREMIUM (Design Bottom Sheet Fintech)*/
  /* ========================================= */
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalPremium: { 
    width: '100%', 
    borderTopLeftRadius: 32, 
    borderTopRightRadius: 32, 
    paddingTop: 12, 
    paddingBottom: 40,
    alignItems: 'center', 
    overflow: 'hidden' 
  },
  modalHandle: { width: 40, height: 5, backgroundColor: 'rgba(150,150,150,0.3)', borderRadius: 3, marginBottom: 20 },
  modalPremiumTitle: { fontSize: 20, fontWeight: '800', marginBottom: 20, textAlign: 'center' },
  modalBody: { paddingHorizontal: 25, paddingBottom: 25, width: '100%' },
  
  detailRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: 'rgba(150,150,150,0.1)' },
  detailLabel: { fontSize: 14, fontWeight: '500' },
  detailValue: { fontSize: 14, fontWeight: '700', textAlign: 'right', flexShrink: 1, marginLeft: 20 },

  modalActionsColumn: { width: '100%', paddingHorizontal: 25, gap: 12 },
  modalActionBtnPrimary: { width: '100%', paddingVertical: 18, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  modalActionBtnSecondary: { width: '100%', paddingVertical: 18, borderRadius: 16, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(150,150,150,0.1)' },
  modalActionTextPrimary: { fontWeight: '700', fontSize: 16 },
  modalActionTextSecondary: { fontWeight: '700', fontSize: 16 },
  
  // Succès
  iconCircleWrapper: { marginBottom: 20 },
  iconCircle: { width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center' },
  modalPremiumDesc: { fontSize: 15, lineHeight: 22, textAlign: 'center' }
});
