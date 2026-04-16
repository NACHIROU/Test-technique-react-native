# Crypto Dashboard Challenge 📱💰

Bienvenue sur le projet Crypto Dashboard ! Ce dépôt contient une application React Native (construite avec Expo) démontrant la gestion de portefeuilles crypto, le suivi des prix (Bitcoin) en temps réel, un design premium adaptatif (Clair/Sombre) et une modélisation poussée des interfaces de retrait d'argent (Mobile Money).

---

## 🛠 Technologies utilisées

Ce projet s'appuie sur une pile technique moderne et robuste pour garantir performance, sécurité et maintenabilité :

- **React Native & Expo** : Cœur de l'application mobile multiplateformes (iOS et Android).
- **TypeScript** : Typage statique strict garantissant la réduction des bugs relatifs aux propriétés et états.
- **Expo Router (`app/`)** : Architecture de routing basée sur le système de fichiers (File-based routing), offrant une navigation fluide et similaire au Next.js pour fluidifier le développement.
- **Zod** : Validation robuste des schémas de données. Utilisé spécifiquement pour valider les données de l'API externe (comme les prix du Bitcoin) avant de les injecter dans l'application.
- **React Context API** : Système de gestion globale d'état léger pour contrôler le mode Clair/Sombre dynamiquement à la volée.
- **StyleSheet & Animations** : Design "Flat/Premium" totalement personnalisé, incluant des contraintes poussées sur le clavier (`KeyboardAvoidingView`), les barres de progression, et l'API `Animated` pour sublimer l'expérience utilisateur.

---

## 🚀 Procédure d'installation

Afin de pouvoir faire tourner le projet localement sur votre machine, assurez-vous d'avoir [Node.js](https://nodejs.org/) installé, puis suivez ces étapes :

### 1. Cloner ou ouvrir le projet
Si vous n'êtes pas déjà dans le répertoire :
```bash
git clone <url-du-repo>
cd Test-technique-react-native/Dashboard
```

### 2. Installer les dépendances
Utilisez npm (ou yarn) pour installer l'intégralité des paquets nécessaires au fonctionnement du projet :
```bash
npm install
```

### 3. Lancer le serveur de développement Expo
Démarrez l'application localement à l'aide de la commande suivante :
```bash
npx expo start
```
*(ou `npm start`)*

### 4. Visualiser l'application
Une fois le serveur lancé, de multiples options s'offriront à vous via le terminal :
- **Sur votre propre téléphone (Recommandé)** : Installez l'application **Expo Go** (iOS / Android) puis scannez le QR code affiché dans votre terminal.
- **Sur un Émulateur iOS** : Appuyez sur la touche `i` de votre clavier (nécessite Xcode d'installé).
- **Sur un Émulateur Android** : Appuyez sur la touche `a` de votre clavier (nécessite Android Studio / un émulateur actif).

---

## 💡 Fonctionnalités Phares

* **Basculement de thèmes** : Le mode Sombre / Clair est implémenté et agit globalement sur toutes les vues de l'application instantanément sans besoin de rechargement.
* **Architecture modulaire** : Les styles (CSS React Native) très denses sont soigneusement extraits (`*.styles.ts`) pour rendre le JSX épuré et facile à modifier.
* **UX Premium (Retrait)** : L'écran de retrait dispose d'un simulateur de frais automatique (2%), d'une liste de sélection d'opérateur mobile native et moderne (Mtn / Moov) façon Apple Pay/Revolut, avec validation dynamique à l'écran. 

---
Réalisé avec passion. 🚀
