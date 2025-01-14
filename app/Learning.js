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
    { symbol: 'O', name: 'Oxygen', number: 8, description: 'Oxygen is essential for respiration in most life forms and is a major component of water.', trivia: 'Oxygen makes up around 21% of Earth\'s atmosphere.', image: 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Oxygen_molecule_model.png', application: 'Vital for respiration and combustion.', row: 2, col: 16 },
    { symbol: 'F', name: 'Fluorine', number: 9, description: 'Fluorine is a highly reactive element, most commonly found in compounds such as fluoride, which is used in toothpaste.', trivia: 'Fluorine is the most reactive element on the periodic table!', image: 'https://upload.wikimedia.org/wikipedia/commons/4/47/Fluorine-Element-Image.jpg', application: 'Used in toothpaste, Teflon, and water fluoridation.', row: 2, col: 17 },
    { symbol: 'Ne', name: 'Neon', number: 10, description: 'Neon is a noble gas used primarily in neon signs, producing a bright red-orange glow when electrified.', trivia: 'Neon signs have been used for advertising since the early 20th century!', image: 'https://upload.wikimedia.org/wikipedia/commons/e/e6/Neon_sign.jpg', application: 'Used in neon signs, high-voltage indicators, and lasers.', row: 2, col: 18 },
    { symbol: 'Na', name: 'Sodium', number: 11, description: 'Sodium is an alkali metal known for its role in salt, an essential compound for life and human health.', trivia: 'Sodium reacts explosively with water!', image: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Sodium_Metal.jpg', application: 'Used in street lights, soaps, and as table salt.', row: 3, col: 1 },
    { symbol: 'Mg', name: 'Magnesium', number: 12, description: 'Magnesium is a light metal used in many alloys, especially in the automotive and aerospace industries.', trivia: 'Magnesium burns with a bright white light!', image: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Magnesium_metal.jpg', application: 'Used in alloys for aircraft, cars, and in fireworks.', row: 3, col: 2 },
    { symbol: 'Al', name: 'Aluminum', number: 13, description: 'Aluminum is a lightweight, corrosion-resistant metal commonly used in manufacturing and construction.', trivia: 'Aluminum is the most abundant metal in the Earth\'s crust!', image: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Aluminium_Foil.jpg', application: 'Used in packaging, construction, and aerospace.', row: 3, col: 13 },
    { symbol: 'Si', name: 'Silicon', number: 14, description: 'Silicon is a semiconductor material critical in electronics and computing.', trivia: 'Silicon chips are used in almost all modern electronic devices!', image: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Silicon-Crystal-Structure.jpg', application: 'Used in computer chips, solar panels, and glassmaking.', row: 3, col: 14 },
    { symbol: 'P', name: 'Phosphorus', number: 15, description: 'Phosphorus is a non-metal essential for life, especially for energy storage in cells as ATP.', trivia: 'Phosphorus glows in the dark when exposed to air!', image: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Phosphorus.jpg', application: 'Used in fertilizers, detergents, and in steel production.', row: 3, col: 15 },
    { symbol: 'S', name: 'Sulfur', number: 16, description: 'Sulfur is an essential element for life and is commonly found in proteins and enzymes.', trivia: 'Sulfur compounds are responsible for the characteristic smell of rotten eggs!', image: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Sulfur-Element.jpg', application: 'Used in sulfuric acid production, fertilizers, and vulcanized rubber.', row: 3, col: 16 },
    { symbol: 'Cl', name: 'Chlorine', number: 17, description: 'Chlorine is a halogen element often used in disinfectants and bleach due to its strong oxidative properties.', trivia: 'Chlorine gas was used as a chemical weapon during World War I!', image: 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Chlorine-element.jpg', application: 'Used in water purification, disinfectants, and bleach.', row: 3, col: 17 },
    { symbol: 'Ar', name: 'Argon', number: 18, description: 'Argon is a noble gas used in light bulbs and as an inert atmosphere in welding and other processes.', trivia: 'Argon is the third most abundant gas in the Earth\'s atmosphere!', image: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Argon_Gas.jpg', application: 'Used in light bulbs, welding, and in the production of steel.', row: 3, col: 18 },
    { symbol: 'K', name: 'Potassium', number: 19, description: 'Potassium is a soft, silvery metal that is essential for the proper function of cells and is found in many foods.', trivia: 'Potassium is highly reactive, especially with water!', image: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Potassium_Metal.jpg', application: 'Used in fertilizers, salt production, and fireworks.', row: 4, col: 1 },
    { symbol: 'Ca', name: 'Calcium', number: 20, description: 'Calcium is a key element in bones and teeth, crucial for human health.', trivia: 'Calcium is the most abundant metal in the human body!', image: 'https://upload.wikimedia.org/wikipedia/commons/7/74/Calcium-Metal.jpg', application: 'Used in cement, calcium supplements, and in steel production.', row: 4, col: 2 },
    { symbol: 'Sc', name: 'Scandium', number: 21, description: 'Scandium is a rare metal often used in lightweight alloys for aerospace applications.', trivia: 'Scandium is one of the rarest elements in the Earth\'s crust!', image: 'https://upload.wikimedia.org/wikipedia/commons/2/21/Scandium_Metal.jpg', application: 'Used in aerospace components and sports equipment.', row: 4, col: 3 },
    { symbol: 'Ti', name: 'Titanium', number: 22, description: 'Titanium is a strong, corrosion-resistant metal used in aerospace, medical implants, and jewelry.', trivia: 'Titanium is as strong as steel but much lighter!', image: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Titanium-Metal.jpg', application: 'Used in aircraft, medical devices, and jewelry.', row: 4, col: 4 },
    { symbol: 'V', name: 'Vanadium', number: 23, description: 'Vanadium is used to strengthen steel and in the production of batteries for renewable energy storage.', trivia: 'Vanadium can withstand high temperatures, making it useful for certain engines.', image: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Vanadium_Metal.jpg', application: 'Used in steel production, batteries, and chemical manufacturing.', row: 4, col: 5 },
    { symbol: 'Cr', name: 'Chromium', number: 24, description: 'Chromium is a metal known for its use in stainless steel and for producing shiny, reflective surfaces.', trivia: 'Chromium is used to make chrome plating and is essential for the production of stainless steel!', image: 'https://upload.wikimedia.org/wikipedia/commons/5/5b/Chromium_Metal.jpg', application: 'Used in chrome plating, stainless steel production, and in dyes.', row: 4, col: 6 },
    { symbol: 'Mn', name: 'Manganese', number: 25, description: 'Manganese is a metal important in steelmaking and is used in various industrial applications.', trivia: 'Manganese is essential for human health, playing a role in bone formation and metabolism.', image: 'https://upload.wikimedia.org/wikipedia/commons/2/2b/Manganese_Metal.jpg', application: 'Used in steel production, batteries, and as a catalyst in chemical processes.', row: 4, col: 7 },
    { symbol: 'Fe', name: 'Iron', number: 26, description: 'Iron is the most commonly used metal in the world, crucial for manufacturing steel and essential for life.', trivia: 'Iron makes up about 5% of the Earth\'s crust!', image: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Iron_Metal.jpg', application: 'Used in steel manufacturing, construction, and in hemoglobin for oxygen transport.', row: 4, col: 8 },
    { symbol: 'Co', name: 'Cobalt', number: 27, description: 'Cobalt is a metal used in the production of batteries, superalloys, and catalysts for chemical reactions.', trivia: 'Cobalt gives blue glass and ceramics their bright color!', image: 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Cobalt_Metal.jpg', application: 'Used in batteries, magnets, and aerospace components.', row: 4, col: 9 },
    { symbol: 'Ni', name: 'Nickel', number: 28, description: 'Nickel is a corrosion-resistant metal commonly used in batteries, coinage, and stainless steel.', trivia: 'Nickel is found in many everyday items, from coins to rechargeable batteries!', image: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Nickel-Metal.jpg', application: 'Used in batteries, coinage, and stainless steel alloys.', row: 4, col: 10 },
    { symbol: 'Cu', name: 'Copper', number: 29, description: 'Copper is a metal known for its excellent electrical conductivity and is used extensively in electrical wiring and plumbing.', trivia: 'Copper has been used by humans for over 10,000 years!', image: 'https://upload.wikimedia.org/wikipedia/commons/8/84/Copper-Metal.jpg', application: 'Used in electrical wiring, plumbing, and as a component in alloys.', row: 4, col: 11 },
    { symbol: 'Zn', name: 'Zinc', number: 30, description: 'Zinc is an essential metal used in galvanizing iron and steel to prevent rusting, and is found in various alloys.', trivia: 'Zinc is essential for human health, contributing to immune function and wound healing.', image: 'https://upload.wikimedia.org/wikipedia/commons/9/97/Zinc_Metal.jpg', application: 'Used in galvanization, batteries, and as an alloy in brass.', row: 4, col: 12 },
    { symbol: 'Ga', name: 'Gallium', number: 31, description: 'Gallium is a soft, silvery metal used in semiconductors and LED technology.', trivia: 'Gallium can melt in your hand as its melting point is just above room temperature!', image: 'https://upload.wikimedia.org/wikipedia/commons/f/ff/Gallium_Metal.jpg', application: 'Used in semiconductors, LEDs, and solar panels.', row: 4, col: 13 },
    { symbol: 'Ge', name: 'Germanium', number: 32, description: 'Germanium is a semiconductor material used in transistors and fiber optics.', trivia: 'Germanium was once used in early computer chips before being replaced by silicon!', image: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Germanium_Metal.jpg', application: 'Used in semiconductors, fiber optics, and infrared optics.', row: 4, col: 14 },
    { symbol: 'As', name: 'Arsenic', number: 33, description: 'Arsenic is a metalloid element often associated with toxic compounds.', trivia: 'Arsenic is highly toxic and was historically used in poison!', image: 'https://upload.wikimedia.org/wikipedia/commons/3/35/Arsenic.jpg', application: 'Used in semiconductors and as a preservative in wood.', row: 4, col: 15 },
    { symbol: 'Se', name: 'Selenium', number: 34, description: 'Selenium is a non-metal used in electronics, glassmaking, and as a dietary supplement.', trivia: 'Selenium is essential for human health but can be toxic in high amounts!', image: 'https://upload.wikimedia.org/wikipedia/commons/9/9b/Selenium_Metal.jpg', application: 'Used in electronics, glass production, and as a nutritional supplement.', row: 4, col: 16 },
    { symbol: 'Br', name: 'Bromine', number: 35, description: 'Bromine is a halogen element found in seawater and used in various chemical applications.', trivia: 'Bromine is one of only two elements that are liquids at room temperature!', image: 'https://upload.wikimedia.org/wikipedia/commons/5/56/Bromine.jpg', application: 'Used in flame retardants, pharmaceuticals, and in water treatment.', row: 4, col: 17 },
    { symbol: 'Kr', name: 'Krypton', number: 36, description: 'Krypton is a noble gas used in lighting and high-performance electrical equipment.', trivia: 'Krypton is used in some photographic flash lamps and in some types of neon signs!', image: 'https://upload.wikimedia.org/wikipedia/commons/c/c0/Krypton_Molecule.jpg', application: 'Used in lighting, photography, and in lasers.', row: 4, col: 18 },
    { symbol: 'Rb', name: 'Rubidium', number: 37, description: 'Rubidium is a soft, silvery-white metallic element that is highly reactive and belongs to the alkali metal group.', trivia: 'Rubidium is one of the least abundant alkali metals on Earth!', image: 'https://upload.wikimedia.org/wikipedia/commons/6/66/Rubidium_Metal.jpg', application: 'Used in research and in the production of special glasses and atomic clocks.', row: 5, col: 1 },
    { symbol: 'Sr', name: 'Strontium', number: 38, description: 'Strontium is a soft, silvery metal that is highly reactive and is commonly used in fireworks and in the production of magnets.', trivia: 'Strontium compounds produce a bright red flame when burned!', image: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Strontium_Metal.jpg', application: 'Used in fireworks, magnets, and in the production of ferrite ceramics.', row: 5, col: 2 },
    { symbol: 'Y', name: 'Yttrium', number: 39, description: 'Yttrium is a rare, silvery metal used in superconductors and in the production of phosphors for color television tubes.', trivia: 'Yttrium is often found in rare earth minerals!', image: 'https://upload.wikimedia.org/wikipedia/commons/1/10/Yttrium_Grain.jpg', application: 'Used in superconductors, phosphors, and in various metal alloys.', row: 5, col: 3 },
    { symbol: 'Zr', name: 'Zirconium', number: 40, description: 'Zirconium is a corrosion-resistant metal used in nuclear reactors and in the production of high-performance ceramics.', trivia: 'Zirconium is highly resistant to corrosion and heat!', image: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Zirconium_metal.jpg', application: 'Used in nuclear reactors, in high-performance ceramics, and in various alloys.', row: 5, col: 4 },
    { symbol: 'Nb', name: 'Niobium', number: 41, description: 'Niobium is a soft, grey, crystalline metal used in steel production and in high-temperature superalloys.', trivia: 'Niobium is named after the Greek goddess Niobe, due to its affinity for tantalum!', image: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Niobium_Metal.jpg', application: 'Used in steel alloys, superconducting magnets, and in aerospace applications.', row: 5, col: 5 },
    { symbol: 'Mo', name: 'Molybdenum', number: 42, description: 'Molybdenum is a refractory metal used in high-strength alloys and as a catalyst in various industrial processes.', trivia: 'Molybdenum is a key component in steel production due to its high melting point!', image: 'https://upload.wikimedia.org/wikipedia/commons/2/28/Molybdenum_metal.jpg', application: 'Used in steel production, high-strength alloys, and as a catalyst in chemical processes.', row: 5, col: 6 },
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
        padding: 90,
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
        padding: '100',
    },
    element: {
        width: 50,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        margin: 10,
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
        fontSize: 8,
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
