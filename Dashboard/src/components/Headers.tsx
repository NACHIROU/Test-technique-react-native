import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

export const Header = () => {
  const { theme, mode, toggleTheme } = useTheme();
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        {/* L'Avatar devient cliquable */}
        <TouchableOpacity 
          style={[styles.avatar, { backgroundColor: theme.surface }]}
          onPress={() => setMenuVisible(true)}
        >
           <Ionicons name="person" size={20} color={theme.primary} />
        </TouchableOpacity>
        
        <View style={styles.textContainer}>
          <Text style={[styles.userName, { color: theme.text }]}>Somad NACHIROU</Text>
        </View>
      </View>

      {/* MODALE DU MENU PROFIL */}
      <Modal
        visible={menuVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        {/* TouchableWithoutFeedback permet de fermer le menu en cliquant n'importe où ailleurs */}
        <TouchableWithoutFeedback onPress={() => setMenuVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={[styles.menuCard, { backgroundColor: theme.surface }]}>
              
              {/* Option Profil */}
              <TouchableOpacity style={styles.menuItem} onPress={() => setMenuVisible(false)}>
                <Ionicons name="person-outline" size={18} color={theme.text} />
                <Text style={[styles.menuText, { color: theme.text }]}>Mon Profil</Text>
              </TouchableOpacity>

              {/* Option Paramètres */}
              <TouchableOpacity style={styles.menuItem} onPress={() => setMenuVisible(false)}>
                <Ionicons name="settings-outline" size={18} color={theme.text} />
                <Text style={[styles.menuText, { color: theme.text }]}>Paramètres</Text>
              </TouchableOpacity>

              {/* Option Thème */}
              <TouchableOpacity style={styles.menuItem} onPress={() => { toggleTheme(); setMenuVisible(false); }}>
                <Ionicons name={mode === 'dark' ? 'sunny-outline' : 'moon-outline'} size={18} color={theme.text} />
                <Text style={[styles.menuText, { color: theme.text }]}>{mode === 'dark' ? 'Mode Clair' : 'Mode Sombre'}</Text>
              </TouchableOpacity>

              {/* Séparateur */}
              <View style={[styles.separator, { backgroundColor: theme.textMuted + '22' }]} />

              {/* Option Déconnexion */}
              <TouchableOpacity style={styles.menuItem} onPress={() => setMenuVisible(false)}>
                <Ionicons name="log-out-outline" size={18} color={theme.error} />
                <Text style={[styles.menuText, { color: theme.error }]}>Déconnexion</Text>
              </TouchableOpacity>

            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <TouchableOpacity style={[styles.iconButton, { borderColor: theme.textMuted + '33' }]}>
        <Ionicons name="notifications-outline" size={24} color={theme.text} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    zIndex: 10,
  },
  userInfo: { flexDirection: 'row', alignItems: 'center' },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textContainer: { justifyContent: 'center' },
  welcomeText: { fontSize: 12, fontWeight: '500' },
  userName: { fontSize: 16, fontWeight: '700' },
  iconButton: { padding: 10, borderRadius: 12, borderWidth: 1 },
  
  // Styles de la Modale Menu
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.1)', // Fond très légèrement grisé
  },
  menuCard: {
    position: 'absolute',
    top: 70, // Juste en dessous du header
    left: 20,
    width: 180,
    borderRadius: 20,
    padding: 10,
    // Ombre premium
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  menuText: {
    marginLeft: 10,
    fontSize: 14,
    fontWeight: '500',
  },
  separator: {
    height: 1,
    marginVertical: 5,
    marginHorizontal: 10,
  }
});