import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useTheme } from "../theme/ThemeContext";
import { Ionicons } from "@expo/vector-icons";

export const Header = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <View style={styles.container}>

            <View style={styles.userInfo}>
                <View style={[styles.avatar, {backgroundColor: theme.surface}]}>
                        <Ionicons name="person" size={20} color={theme.primary}/>
                </View>

                <View style={styles.textContainer}>
                    <Text style={[styles.welcomeText, { color: theme.textMuted }]}>Bonjour </Text>
                    <Text style={[styles.userName, { color: theme.text }]}>Somad NACHIROU</Text>
                </View>
            </View> 

            <TouchableOpacity style={[styles.iconButton, { borderColor: theme.textMuted + '33' }]}>
                <Ionicons name="notifications" size={20} color={theme.text} />
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
        marginBottom: 20,   
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    textContainer: {
        justifyContent: 'center',
    },
    welcomeText: {
        fontSize: 12,
        fontWeight: '500',
    },
    userName: {
        fontSize: 16,
        fontWeight: '500',
    },
    iconButton: {
        padding: 10,
        width: 40,
        height: 40,
        borderRadius: 12,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});