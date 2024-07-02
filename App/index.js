// Filename: index.js
// Combined code from all files

import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';

const colors = ['red', 'blue', 'green', 'yellow', 'pink', 'purple'];

export default function App() {
    const [selectedColors, setSelectedColors] = useState([]);
    const [showConfetti, setShowConfetti] = useState(false);

    const handleColorPress = (color) => {
        if (!selectedColors.includes(color)) {
            const updatedColors = [...selectedColors, color];

            setSelectedColors(updatedColors);

            if (updatedColors.length === colors.length) {
                setShowConfetti(true);
            }
        }
    };

    const renderColor = ({ item }) => (
        <TouchableOpacity
            style={[styles.colorButton, { backgroundColor: item }]}
            onPress={() => handleColorPress(item)}
            disabled={selectedColors.includes(item)}
        >
            <Text style={styles.colorText}>
                {selectedColors.includes(item) ? '✓' : ''}
            </Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Select All Colors</Text>
            <FlatList
                data={colors}
                renderItem={renderColor}
                keyExtractor={(item) => item}
                contentContainerStyle={styles.colorList}
            />
            {showConfetti && <ConfettiCannon count={200} origin={{x: -10, y: 0}} />}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    colorList: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    colorButton: {
        width: 100,
        height: 100,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    colorText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
});