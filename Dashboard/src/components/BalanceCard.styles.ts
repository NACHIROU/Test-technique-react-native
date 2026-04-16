import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  /* ========================================= */
  /* STYLES GÉNÉRAUX DE LA CARTE DE SOLDE      */
  /* ========================================= */
  card: {
    borderRadius: 28,
    padding: 18,
    marginHorizontal: 20,
    marginTop: 10,
    overflow: 'hidden', 
    borderWidth: 1, 
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 10,
  },

  /* ========================================= */
  /* ÉLÉMENTS DÉCORATIFS EN ARRIÈRE-PLAN       */
  /* ========================================= */
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

  /* ========================================= */
  /* ORGANISATION DU CONTENU HAUT ET MILIEU    */
  /* ========================================= */
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  middleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },

  /* ========================================= */
  /* STYLES SPÉCIFIQUES AUX LABELS ET MONTANTS */
  /* ========================================= */
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    opacity: 0.9,
  },
  amountContainer: {
    marginBottom: 0,
  },
  btcAmount: {
    fontSize: 34,
    fontWeight: '800',
    letterSpacing: -1,
  },
  fiatAmount: {
    fontSize: 16,
    fontWeight: '600',
    opacity: 0.9,
    marginTop: 2,
  },

  /* ========================================= */
  /* SECTION FOOTER ET BADGES DE VARIATION     */
  /* ========================================= */
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    marginTop: 12, 
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

  /* ========================================= */
  /* STYLES DES DIFFÉRENTS BOUTONS D'ICÔNES    */
  /* ========================================= */
  eyeButton: {
    marginLeft: 8,
    opacity: 0.8,
    padding: 4,
  },
  optionsButton: {
    opacity: 0.8,
    padding: 4,
  },
  floatingCoin: {
    marginTop: 10,
    marginRight: 5,
  },

  /* ========================================= */
  /* BOUTONS D'ACTION (DÉPÔT, RETRAIT, ÉCHANGE)*/
  /* ========================================= */
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 16,
    marginTop: 12,
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
