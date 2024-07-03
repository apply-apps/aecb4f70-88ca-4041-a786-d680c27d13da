// Filename: index.js
// Combined code from all files

import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, FlatList, View } from 'react-native';
import * as Notifications from 'expo-notifications';

export default function App() {
    const [reminder, setReminder] = useState('');
    const [reminders, setReminders] = useState([]);

    const handleAddReminder = () => {
        if (reminder) {
            const newReminders = [...reminders, reminder];
            setReminders(newReminders);
            setReminder('');
            scheduleNotification(reminder);
        }
    };

    const scheduleNotification = async (reminderText) => {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: 'Important Reminder',
                body: reminderText,
            },
            trigger: { seconds: 5 },
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Important Reminders</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter reminder"
                value={reminder}
                onChangeText={setReminder}
            />
            <TouchableOpacity style={styles.button} onPress={handleAddReminder}>
                <Text style={styles.buttonText}>Add Reminder</Text>
            </TouchableOpacity>
            <FlatList
                data={reminders}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.reminderItem}>
                        <Text style={styles.reminderText}>{item}</Text>
                    </View>
                )}
                contentContainerStyle={styles.reminderList}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    reminderList: {
        alignItems: 'center',
    },
    reminderItem: {
        backgroundColor: '#f9f9f9',
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
        width: '100%',
    },
    reminderText: {
        fontSize: 16,
    },
});