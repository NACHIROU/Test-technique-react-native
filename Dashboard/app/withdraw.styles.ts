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
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
    zIndex: 10,
  },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  backButton: { marginRight: 15, padding: 4 },
  title: { fontSize: 22, fontWeight: '800' },
  
  stepperContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10, paddingHorizontal: 10 },
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
    padding: 16,
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
  formSection: { marginTop: 30, paddingHorizontal: 10 },
  inputWrapper: {
    marginBottom: 20,
  },
  minimalInputGroup: { 
    borderWidth: 1, 
    borderRadius: 14,
    padding: 14,
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
  submitButton: { padding: 18, borderRadius: 16, alignItems: 'center', marginTop: 30 },
  submitText: { fontSize: 16, fontWeight: '700' },

  /* ========================================= */
  /* MODALE PREMIUM DE VALIDATION              */
  /* ========================================= */
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalPremium: { width: '100%', padding: 25, borderRadius: 28, alignItems: 'center', overflow: 'hidden' },
  iconCircleWrapper: { marginBottom: 20 },
  iconCircle: { width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center' },
  modalPremiumTitle: { fontSize: 22, fontWeight: '800', marginBottom: 15, textAlign: 'center' },
  modalBody: { width: '100%', backgroundColor: 'rgba(0,0,0,0.15)', padding: 15, borderRadius: 16, marginBottom: 25 },
  modalPremiumDesc: { fontSize: 15, lineHeight: 22, textAlign: 'center' },
  modalCloseBtn: { width: '100%', paddingVertical: 16, borderRadius: 16, alignItems: 'center' }
});
