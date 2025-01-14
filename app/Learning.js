import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    Image,
    Button,
    TextInput,
    Alert,
} from 'react-native';

const elements = [
    { symbol: 'H', name: 'Hydrogen', number: 1, description: 'Hydrogen is the lightest and most abundant element in the universe, playing a crucial role in stars and the water we drink.', trivia: 'Did you know? Hydrogen makes up about 75% of the universe by mass!', image: 'https://www.climatecouncil.org.au/wp-content/uploads/2021/01/hydrogen.png', application: 'Used in fuel cells and rocket fuel.', row: 1, col: 1 },
    { symbol: 'He', name: 'Helium', number: 2, description: 'Helium is a noble gas often used in balloons and deep-sea diving tanks due to its low density and inert properties.', trivia: 'Fun fact: Helium makes your voice sound funny when inhaled!', image: 'https://www.thoughtco.com/thmb/WjJCGpnJuSx3xprsfEgIdwBdoGc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/186450350-56a132cb5f9b58b7d0bcf751.jpg', application: 'Used in MRI scanners and cooling superconductors.', row: 1, col: 18 },
    { symbol: 'Li', name: 'Lithium', number: 3, description: 'Lithium is a soft, silvery metal used in rechargeable batteries, essential for modern technology.', trivia: 'Lithium is so soft you can cut it with a knife!', image: 'https://www.chemistrylearner.com/wp-content/uploads/2018/09/Lithium-Metal.jpg', application: 'Powers smartphones, laptops, and electric cars.', row: 2, col: 1 },
    { symbol: 'Be', name: 'Beryllium', number: 4, description: 'Beryllium is a rare metal that is essential for plant growth and has unique properties in high-tech materials.', trivia: 'Did you know? Beryllium is used in aerospace components for its lightweight properties!', image: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Beryllium_Sample.jpg', application: 'Used in aerospace and nuclear reactors.', row: 2, col: 2 },
    { symbol: 'B', name: 'Boron', number: 5, description: 'Boron is a rare element that is essential for plant growth and has unique properties in high-tech materials.', trivia: 'Did you know? Boron is used in borosilicate glass, which is highly heat resistant!', image: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Boron.jpg', application: 'Used in detergents, semiconductors, and glassmaking.', row: 2, col: 13 },
    { symbol: 'C', name: 'Carbon', number: 6, description: 'Carbon is the basis of all known life on Earth, forming the backbone of complex molecules like DNA.', trivia: 'Carbon exists as diamond, one of the hardest substances, and graphite, one of the softest.', image: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Carbon_Sample.jpg', application: 'Found in fuels, plastics, and advanced materials like graphene.', row: 2, col: 14 },
    { symbol: 'N', name: 'Nitrogen', number: 7, description: 'Nitrogen is a major component of the atmosphere, vital for the production of proteins and DNA in living organisms.', trivia: "Nitrogen makes up about 78% of Earth's atmosphere but is inert in its natural form.", image: 'https://upload.wikimedia.org/wikipedia/commons/6/65/Liquidnitrogen.jpg', application: 'Used in fertilizers, cryogenics, and industrial processes.', row: 2, col: 15 },
    // Add more elements, placing them in correct row and col positions
];

const colors = ['#FFCDD2', '#F8BBD0', '#E1BEE7', '#D1C4E9', '#C5CAE9', '#BBDEFB', '#B3E5FC', '#B2EBF2', '#B2DFDB', '#C8E6C9', '#DCEDC8', '#F0F4C3', '#FFECB3', '#FFE0B2', '#FFCCBC', '#D7CCC8', '#CFD8DC'];

const Learning = () => {
    const [selectedElement, setSelectedElement] = useState(null);
    const [searchText, setSearchText] = useState('');

    const filteredElements = elements.filter(
        (item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.symbol.toLowerCase().includes(searchText.toLowerCase())
    );

    const handleFunInteraction = (element) => {
        Alert.alert(
            'Fun Interaction',
            `Hey! Did you know? ${element.trivia}`,
            [{ text: 'Cool!', style: 'default' }]
        );
    };

    const renderItem = (item, index) => {
        const left = (item.col - 1) * 50; // Adjust spacing based on columns
        const top = (item.row - 1) * 60;  // Adjust spacing based on rows

        return (
            <TouchableOpacity
                style={[styles.element, { backgroundColor: colors[index % colors.length], left, top }]}
                onPress={() => setSelectedElement(item)}
                onLongPress={() => handleFunInteraction(item)}
                accessible={true}
                accessibilityLabel={`Element ${item.name}`}
            >
                <Text style={styles.symbol}>{item.symbol}</Text>
                <Text style={styles.number}>{item.number}</Text>
                <Text style={styles.name}>{item.name}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>ELEXPLORER</Text>
            </View>
            <TextInput
                style={styles.searchBar}
                placeholder="Search elements..."
                value={searchText}
                onChangeText={setSearchText}
                accessible={true}
                accessibilityLabel="Search bar"
            />
            <View style={styles.gridContainer}>
                {filteredElements.map((item, index) => renderItem(item, index))}
            </View>
            {selectedElement && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={!!selectedElement}
                    onRequestClose={() => setSelectedElement(null)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={() => setSelectedElement(null)}
                                accessible={true}
                                accessibilityLabel="Close modal"
                            >
                                <Text style={styles.closeButtonText}>X</Text>
                            </TouchableOpacity>
                            <Text style={styles.modalSymbol}>{selectedElement.symbol}</Text>
                            <Text style={styles.modalName}>{selectedElement.name}</Text>
                            <Image
                                source={{ uri: selectedElement.image }}
                                style={styles.modalImage}
                                onError={(e) => console.log('Image failed to load:', e.nativeEvent.error)}
                            />
                            <Text style={styles.modalDescription}>{selectedElement.description}</Text>
                            <Text style={styles.modalApplication}>Real-World Application: {selectedElement.application}</Text>
                            <Text style={styles.modalTrivia}>Trivia: {selectedElement.trivia}</Text>
                            <Button
                                title="Close"
                                onPress={() => setSelectedElement(null)}
                                color="#007BFF"
                            />
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    header: {
        backgroundColor: '#007BFF',
        padding: 16,
        alignItems: 'center',
        marginBottom: 16,
    },
    headerText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    searchBar: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 8,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        position: 'relative',
    },
    element: {
        width: 50,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        margin: 4,
        position: 'absolute',
    },
    symbol: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    number: {
        fontSize: 12,
    },
    name: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '85%',
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
        position: 'relative',
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: '#ddd',
        borderRadius: 15,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalSymbol: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    modalName: {
        fontSize: 20,
        marginBottom: 8,
    },
    modalImage: {
        width: 150,
        height: 150,
        marginBottom: 8,
        borderRadius: 8,
    },
    modalDescription: {
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 8,
    },
    modalApplication: {
        fontSize: 14,
        fontStyle: 'italic',
        color: '#555',
        marginBottom: 8,
    },
    modalTrivia: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#007BFF',
        textAlign: 'center',
        marginBottom: 16,
    },
});

export default Learning;
