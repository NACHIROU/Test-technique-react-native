# Test Technique React Native - Crypto Dashboard Premium

Ce projet est une application mobile de tableau de bord cryptographique développée avec **React Native** et **Expo**. L'objectif était de créer une interface utilisateur moderne, fluide et typée "Fintech Haute Performance"

## 🚀 Fonctionnalités Clés

### 1. Tableau de bord interactif
- **Carte de solde dynamique** : Affichage du solde en BTC et conversion automatique en FCFA.
- **Indicateur de tendance** : Tendance positive affichée en exposant avec une icône de croissance (`trending-up`) pour un look épuré.
- **Badge de notification** : Indicateur visuel (pastille rouge) sur l'icône de notification pour signaler des alertes.

### 2. Historique des Transactions (Activités Récentes)
- **Reçu Digital Interactif** : Chaque transaction est cliquable et ouvre un **Bottom Sheet**.
- **Détails complets** : Visualisation du montant, de la date précise, des frais de réseau et d'un ID de transaction unique (TXID).
- **Design Adaptatif** : Icônes et couleurs variant selon le type de transaction (Dépôt, Retrait, Échange, Transfert).

### 3. Tunnel de Retrait sécurisé
- **Formulaire optimisé** : Validation des champs et gestion intelligente du clavier pour éviter tout masquage des entrées.
- **Confirmation Native** : Modale de confirmation avant exécution affichant le bénéficiaire final pour sécuriser les fonds.
- **Feedback visuel** : Animation de succès après chaque opération réussie.

### 4. Expérience Utilisateur (UX/UI)
- **Mode Sombre & Clair** : Thémage complet de l'application respectant les préférences système ou utilisateur.
- **Navigation Moderne** : Utilisation de **Expo Router** pour une navigation par onglets (Tabs) et des routes dynamiques fluides.
- **Performance** : Interface ultra-légère sans bibliothèques de composants lourdes.

## 🛠 Stack Technique

- **Framework** : React Native (Expo SDK 54)
- **Langage** : TypeScript
- **Navigation** : Expo Router (File-based routing)
- **Icônes** : Ionicons & FontAwesome5 (@expo/vector-icons)
- **Design** : Styles personnalisés (StyleSheet) pour une flexibilité maximale et un rendu premium.

## 📦 Installation et Lancement

1. **Cloner le dépôt**
   ```bash
   git clone [https://github.com/NACHIROU/Test-technique-react-native.git](https://github.com/NACHIROU/Test-technique-react-native.git)
   cd Test-technique-react-native/Dashboard
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Lancer l'application**
   ```bash
   npx expo start
   ```

Utilisez l'application **Expo Go** sur iOS/Android pour scanner le QR Code et tester sur votre appareil réel.

---
*Réalisé dans le cadre d'un test technique React Native.*
