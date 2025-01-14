import React, { useState } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Modal,
    Image,
    Button,
    TextInput,
    Alert,
} from 'react-native';

const elements = [
    { 
        symbol: 'H', 
        name: 'Hydrogen', 
        number: 1, 
        description: 'Hydrogen is the lightest and most abundant element in the universe, playing a crucial role in stars and the water we drink.', 
        trivia: 'Did you know? Hydrogen makes up about 75% of the universe by mass!', 
        image: 'https://www.climatecouncil.org.au/wp-content/uploads/2021/01/hydrogen.png', 
        application: 'Used in fuel cells and rocket fuel.' 
    },
    { 
        symbol: 'He', 
        name: 'Helium', 
        number: 2, 
        description: 'Helium is a noble gas often used in balloons and deep-sea diving tanks due to its low density and inert properties.', 
        trivia: 'Fun fact: Helium makes your voice sound funny when inhaled!', 
        image: 'https://www.thoughtco.com/thmb/WjJCGpnJuSx3xprsfEgIdwBdoGc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/186450350-56a132cb5f9b58b7d0bcf751.jpg', 
        application: 'Used in MRI scanners and cooling superconductors.' 
    },
    { 
        symbol: 'Li', 
        name: 'Lithium', 
        number: 3, 
        description: 'Lithium is a soft, silvery metal used in rechargeable batteries, essential for modern technology.', 
        trivia: 'Lithium is so soft you can cut it with a knife!', 
        image: 'https://www.chemistrylearner.com/wp-content/uploads/2018/09/Lithium-Metal.jpg', 
        application: 'Powers smartphones, laptops, and electric cars.' 
    },
    { 
        symbol: 'B', 
        name: 'Boron', 
        number: 5, 
        description: 'Boron is a rare element that is essential for plant growth and has unique properties in high-tech materials.', 
        trivia: 'Did you know? Boron is used in borosilicate glass, which is highly heat resistant!', 
        image: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Boron.jpg', 
        application: 'Used in detergents, semiconductors, and glassmaking.' 
    },
    { 
        symbol: 'C', 
        name: 'Carbon', 
        number: 6, 
        description: 'Carbon is the basis of all known life on Earth, forming the backbone of complex molecules like DNA.', 
        trivia: 'Carbon exists as diamond, one of the hardest substances, and graphite, one of the softest.', 
        image: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Carbon_Sample.jpg', 
        application: 'Found in fuels, plastics, and advanced materials like graphene.' 
    },
    { 
        symbol: 'N', 
        name: 'Nitrogen', 
        number: 7, 
        description: 'Nitrogen is a major component of the atmosphere, vital for the production of proteins and DNA in living organisms.', 
        trivia: "Nitrogen makes up about 78% of Earth's atmosphere but is inert in its natural form.", 
        image: 'https://upload.wikimedia.org/wikipedia/commons/6/65/Liquidnitrogen.jpg', 
        application: 'Used in fertilizers, cryogenics, and industrial processes.' 
    },
    { 
        symbol: 'O', 
        name: 'Oxygen', 
        number: 8, 
        description: 'Oxygen is essential for respiration in most life forms and is a major component of water.', 
        trivia: 'Most of the oxygen we breathe is produced by marine phytoplankton.', 
        image: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Liquid_oxygen_in_a_beaker.jpg', 
        application: 'Used in medicine, welding, and water purification.' 
    },
    { 
        symbol: 'F', 
        name: 'Fluorine', 
        number: 9, 
        description: 'Fluorine is the most reactive and electronegative element, forming compounds with nearly all other elements.', 
        trivia: 'Fluorine is used to make Teflon, the nonstick coating on cookware.', 
        image: 'https://upload.wikimedia.org/wikipedia/commons/9/9c/Fluorine_Sample.jpg', 
        application: 'Used in toothpaste, refrigerants, and nonstick coatings.' 
    },
    { 
        symbol: 'Ne', 
        name: 'Neon', 
        number: 10, 
        description: 'Neon is a noble gas famous for its use in colorful neon signs due to its bright glow when electrified.', 
        trivia: 'Neon glows red-orange in neon lights but can produce other colors with different gases or coatings.', 
        image: 'https://upload.wikimedia.org/wikipedia/commons/f/f0/Neon_lights.jpg', 
        application: 'Used in advertising signs and high-voltage indicators.' 
    },
    { 
        symbol: 'Na', 
        name: 'Sodium', 
        number: 11, 
        description: 'Sodium is a highly reactive metal that plays a key role in nerve function and fluid balance in living organisms.', 
        trivia: 'Sodium reacts explosively with water, producing hydrogen gas!', 
        image: 'https://upload.wikimedia.org/wikipedia/commons/3/3b/Sodium.jpg', 
        application: 'Used in table salt, streetlights, and industrial chemicals.' 
    },
    { 
        symbol: 'Mg', 
        name: 'Magnesium', 
        number: 12, 
        description: 'Magnesium is a lightweight metal essential for many biological processes and used in strong, lightweight alloys.', 
        trivia: 'Magnesium burns with an intense, bright white flame.', 
        image: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Magnesium.jpg', 
        application: 'Used in fireworks, airplanes, and as a dietary supplement.' 
    },
    { 
        symbol: 'Al', 
        name: 'Aluminum', 
        number: 13, 
        description: 'Aluminum is a lightweight, corrosion-resistant metal widely used in packaging, transportation, and construction.', 
        trivia: 'Aluminum is the most abundant metal in the Earth’s crust.', 
        image: 'https://upload.wikimedia.org/wikipedia/commons/6/60/Aluminium-4.jpg', 
        application: 'Used in cans, aircraft, and kitchen utensils.' 
    },
    { 
        symbol: 'Si', 
        name: 'Silicon', 
        number: 14, 
        description: 'Silicon is a metalloid critical for the electronics industry and a major component of sand and glass.', 
        trivia: 'Silicon is the second most abundant element in the Earth’s crust, after oxygen.', 
        image: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Silicon.jpg', 
        application: 'Used in semiconductors, solar cells, and glassmaking.' 
    },
    { 
        symbol: 'P', 
        name: 'Phosphorus', 
        number: 15, 
        description: 'Phosphorus is a reactive nonmetal that is crucial for life, forming part of DNA, RNA, and ATP molecules.', 
        trivia: 'Phosphorus exists in several forms, including white phosphorus, which glows in the dark.', 
        image: 'https://upload.wikimedia.org/wikipedia/commons/c/cd/Phosphorus_sublimed_dendritic.jpg', 
        application: 'Used in fertilizers, detergents, and safety matches.' 
    },
    { 
        symbol: 'S', 
        name: 'Sulfur', 
        number: 16, 
        description: 'Sulfur is a bright yellow, brittle nonmetal used in various industrial processes and found in amino acids.', 
        trivia: 'Sulfur has been used since ancient times, often referred to as brimstone in historical texts.', 
        image: 'https://upload.wikimedia.org/wikipedia/commons/1/1c/Sulfur-sample.jpg', 
        application: 'Used in rubber vulcanization, fertilizers, and gunpowder.' 
        },
        { 
        symbol: 'Cl', 
        name: 'Chlorine', 
        number: 17, 
        description: 'Chlorine is a highly reactive halogen used to disinfect water and as a component in various compounds.', 
        trivia: 'Chlorine was one of the first elements used in chemical warfare during World War I.', 
        image: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Chlorine_gas_in_bottle.jpg', 
        application: 'Used in water purification, bleach, and PVC plastic.' 
    },
    { 
        symbol: 'Ar', 
        name: 'Argon', 
        number: 18, 
        description: 'Argon is a noble gas commonly used in welding and lighting due to its inert properties.', 
        trivia: 'Argon makes up about 1% of Earth’s atmosphere.', 
        image: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Argon_Discharge_Tube.jpg', 
        application: 'Used in light bulbs, welding, and preserving historical documents.' 
    }
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

    const handleNavigation = (route) => {
        Alert.alert(`Navigate to ${route}`, `You pressed the ${route} button!`);
    };

    const renderItem = ({ item, index }) => (
        <TouchableOpacity
            style={[styles.element, { backgroundColor: colors[index % colors.length] }]}
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
            <FlatList
                data={filteredElements}
                renderItem={renderItem}
                keyExtractor={(item) => item.number.toString()}
                numColumns={4}
                contentContainerStyle={styles.list}
            />
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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 16,
    },
    navButton: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        flex: 1,
        marginHorizontal: 5,
    },
    navButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    list: {
        justifyContent: 'center',
    },
    element: {
        flex: 1,
        margin: 6,
        padding: 10,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    symbol: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    number: {
        fontSize: 14,
        color: '#888',
    },
    name: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
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