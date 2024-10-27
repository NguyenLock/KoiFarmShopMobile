import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Image } from 'react-native-elements';

const DetailNews = ({ route }) => {
    const { item } = route.params;

    return (
        <View style={styles.detailContainer}>
            <Image source={{ uri: item.image }} style={styles.detailImage} />
            <Text style={styles.detailTitle}>{item.title}</Text>
            <Text style={styles.detailAuthor}>
                By <Text style={styles.author}>{item.author}</Text> on {item.date}
            </Text>
            <Text style={styles.detailDescription}>{item.description}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    detailContainer: {
        padding: 10,
    },
    detailImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 10,
    },
    detailTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    detailAuthor: {
        fontSize: 14,
        color: '#555',
        marginBottom: 10,
    },
    detailDescription: {
        fontSize: 17,
        color: '#333',
    },
    author: {
        fontSize: 15,
        color: '#802b00',
        marginLeft: 3,
        fontWeight:'bold'
    },
});

export default DetailNews;