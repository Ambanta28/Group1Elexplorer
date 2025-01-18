import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    Image,
    Button,
    TextInput,
    Alert,
    ScrollView,
    Dimensions,
} from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import styles from './styles';

const { width, height } = Dimensions.get('window');

const elementSize = Math.min(width / 10, height / 10); 

const colors = ['#FFCDD2', '#F8BBD0', '#E1BEE7', '#D1C4E9', '#C5CAE9', '#BBDEFB', '#B3E5FC', '#B2EBF2', '#B2DFDB', '#C8E6C9', '#DCEDC8', '#F0F4C3', '#FFECB3', '#FFE0B2', '#FFCCBC', '#D7CCC8', '#CFD8DC'];

const Learning = () => {
    const [selectedElement, setSelectedElement] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [selectedGroup, setSelectedGroup] = useState('');

    useEffect(() => {
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);

        return () => {
            ScreenOrientation.unlockAsync();
        };
    }, []);

    const elements = [
        { symbol: 'H', name: 'Hydrogen', number: 1, description: 'Hydrogen is the lightest and most abundant element in the universe, playing a crucial role in stars and the water we drink.', trivia: 'Did you know? Hydrogen makes up about 75% of the universe by mass!', image: 'https://marcobeveragesystems.com/wp-content/uploads/sites/2/2024/02/pexels-pixabay-416528-1.jpg', application: 'Used in fuel cells and rocket fuel.', group: "Nonmetals", row: 1, col: 1 },
        { symbol: 'He', name: 'Helium', number: 2, description: 'Helium is a noble gas often used in balloons and deep-sea diving tanks due to its low density and inert properties.', trivia: 'Fun fact: Helium makes your voice sound funny when inhaled!', image: 'https://periodictable.com/Samples/002.9/s7s.JPG', application: 'Used in MRI scanners and cooling superconductors.', group: "Noble Gases", row: 1, col: 18 },
        { symbol: 'Li', name: 'Lithium', number: 3, description: 'Lithium is a soft, silvery metal used in rechargeable batteries, essential for modern technology.', trivia: 'Lithium is so soft you can cut it with a knife!', image: 'https://periodictable.com/Samples/003.3/s9s.JPG', application: 'Powers smartphones, laptops, and electric cars.', group: "Alkali Metals" ,row: 2, col: 1 },
        { symbol: 'Be', name: 'Beryllium', number: 4, description: 'Beryllium is a rare metal that is essential for plant growth and has unique properties in high-tech materials.', trivia: 'Did you know? Beryllium is used in aerospace components for its lightweight properties!', image: 'https://periodictable.com/Samples/004.1/s9s.JPG', application: 'Used in aerospace and nuclear reactors.', group: "Alkaline Earth Metals", row: 2, col: 2 },
        { symbol: 'B', name: 'Boron', number: 5, description: 'Boron is a rare element that is essential for plant growth and has unique properties in high-tech materials.', trivia: 'Did you know? Boron is used in borosilicate glass, which is highly heat resistant!', image: 'https://periodictable.com/Samples/005.6/s12s.JPG', application: 'Used in detergents, semiconductors, and glassmaking.', group: "Metalloids", row: 2, col: 13 },
        { symbol: 'C', name: 'Carbon', number: 6, description: 'Carbon is the basis of all known life on Earth, forming the backbone of complex molecules like DNA.', trivia: 'Carbon exists as diamond, one of the hardest substances, and graphite, one of the softest.', image: 'https://periodictable.com/Samples/006.x4/s9s.JPG', application: 'Found in fuels, plastics, and advanced materials like graphene.', group: "Nonmetals", row: 2, col: 14 },
        { symbol: 'N', name: 'Nitrogen', number: 7, description: 'Nitrogen is a major component of the atmosphere, vital for the production of proteins and DNA in living organisms.', trivia: "Nitrogen makes up about 78% of Earth's atmosphere but is inert in its natural form.", image: 'https://periodictable.com/Samples/007.8/s9s.JPG', application: 'Used in fertilizers, cryogenics, and industrial processes.', group: "Nonmetals", row: 2, col: 15 },
        { symbol: 'O', name: 'Oxygen', number: 8, description: 'Oxygen is essential for respiration in most life forms and is a major component of water.', trivia: 'Oxygen makes up around 21% of Earth\'s atmosphere.', image: 'https://periodictable.com/Samples/008.8/s12s.JPG', application: 'Vital for respiration and combustion.', group: "Nonmetals", row: 2, col: 16 },
        { symbol: 'F', name: 'Fluorine', number: 9, description: 'Fluorine is a highly reactive element, most commonly found in compounds such as fluoride, which is used in toothpaste.', trivia: 'Fluorine is the most reactive element on the periodic table!', image: 'https://periodictable.com/Samples/009.6/s9s.JPG', application: 'Used in toothpaste, Teflon, and water fluoridation.', group: "Halogens", row: 2, col: 17 },
        { symbol: 'Ne', name: 'Neon', number: 10, description: 'Neon is a noble gas used primarily in neon signs, producing a bright red-orange glow when electrified.', trivia: 'Neon signs have been used for advertising since the early 20th century!', image: 'https://periodictable.com/Samples/010.10/s7s.JPG', application: 'Used in neon signs, high-voltage indicators, and lasers.', group: "Noble Gases", row: 2, col: 18 },
        { symbol: 'Na', name: 'Sodium', number: 11, description: 'Sodium is an alkali metal known for its role in salt, an essential compound for life and human health.', trivia: 'Sodium reacts explosively with water!', image: 'https://periodictable.com/Samples/011.9/s9s.JPG', application: 'Used in street lights, soaps, and as table salt.', group: "Alkali Metals", row: 3, col: 1 },
        { symbol: 'Mg', name: 'Magnesium', number: 12, description: 'Magnesium is a light metal used in many alloys, especially in the automotive and aerospace industries.', trivia: 'Magnesium burns with a bright white light!', image: 'https://periodictable.com/Samples/012.15/s9s.JPG', application: 'Used in alloys for aircraft, cars, and in fireworks.', group: "Alkaline Earth Metals", row: 3, col: 2 },
        { symbol: 'Al', name: 'Aluminum', number: 13, description: 'Aluminum is a lightweight, corrosion-resistant metal commonly used in manufacturing and construction.', trivia: 'Aluminum is the most abundant metal in the Earth\'s crust!', image: 'https://periodictable.com/Samples/013.21/s9s.JPG', application: 'Used in packaging, construction, and aerospace.', group: "Post-Transition Metals", row: 3, col: 13 },
        { symbol: 'Si', name: 'Silicon', number: 14, description: 'Silicon is a semiconductor material critical in electronics and computing.', trivia: 'Silicon chips are used in almost all modern electronic devices!', image: 'https://periodictable.com/Samples/014.12/s9s.JPG', application: 'Used in computer chips, solar panels, and glassmaking.', group: "Metalloids", row: 3, col: 14 },
        { symbol: 'P', name: 'Phosphorus', number: 15, description: 'Phosphorus is a non-metal essential for life, especially for energy storage in cells as ATP.', trivia: 'Phosphorus glows in the dark when exposed to air!', image: 'https://periodictable.com/Samples/015.6/s9s.JPG', application: 'Used in fertilizers, detergents, and in steel production.', group: "Nonmetals", row: 3, col: 15 },
        { symbol: 'S', name: 'Sulfur', number: 16, description: 'Sulfur is an essential element for life and is commonly found in proteins and enzymes.', trivia: 'Sulfur compounds are responsible for the characteristic smell of rotten eggs!', image: 'https://periodictable.com/Samples/NativeSulfur/s9s.JPG', application: 'Used in sulfuric acid production, fertilizers, and vulcanized rubber.', group: "Nonmetals", row: 3, col: 16 },
        { symbol: 'Cl', name: 'Chlorine', number: 17, description: 'Chlorine is a halogen element often used in disinfectants and bleach due to its strong oxidative properties.', trivia: 'Chlorine gas was used as a chemical weapon during World War I!', image: 'https://periodictable.com/Samples/017.9/s7s.JPG', application: 'Used in water purification, disinfectants, and bleach.', group: "Halogens", row: 3, col: 17 },
        { symbol: 'Ar', name: 'Argon', number: 18, description: 'Argon is a noble gas used in light bulbs and as an inert atmosphere in welding and other processes.', trivia: 'Argon is the third most abundant gas in the Earth\'s atmosphere!', image: 'https://periodictable.com/Samples/018.13/s7s.JPG', application: 'Used in light bulbs, welding, and in the production of steel.', group: "Noble Gases", row: 3, col: 18 },
        { symbol: 'K', name: 'Potassium', number: 19, description: 'Potassium is a soft, silvery metal that is essential for the proper function of cells and is found in many foods.', trivia: 'Potassium is highly reactive, especially with water!', image: 'https://periodictable.com/Samples/019.6/s9s.JPG', application: 'Used in fertilizers, salt production, and fireworks.', group: "Alkali Metals", row: 4, col: 1 },
        { symbol: 'Ca', name: 'Calcium', number: 20, description: 'Calcium is a key element in bones and teeth, crucial for human health.', trivia: 'Calcium is the most abundant metal in the human body!', image: 'https://periodictable.com/Samples/020.6/s9s.JPG', application: 'Used in cement, calcium supplements, and in steel production.', group: "Alkaline Earth Metals", row: 4, col: 2 },
        { symbol: 'Sc', name: 'Scandium', number: 21, description: 'Scandium is a rare metal often used in lightweight alloys for aerospace applications.', trivia: 'Scandium is one of the rarest elements in the Earth\'s crust!', image: 'https://periodictable.com/Samples/021.8/s9s.JPG', application: 'Used in aerospace components and sports equipment.', group: "Transition Metals", row: 4, col: 3 },
        { symbol: 'Ti', name: 'Titanium', number: 22, description: 'Titanium is a strong, corrosion-resistant metal used in aerospace, medical implants, and jewelry.', trivia: 'Titanium is as strong as steel but much lighter!', image: 'https://periodictable.com/Samples/022.18/s9s.JPG', application: 'Used in aircraft, medical devices, and jewelry.', group: "Transition Metals", row: 4, col: 4 },
        { symbol: 'V', name: 'Vanadium', number: 23, description: 'Vanadium is used to strengthen steel and in the production of batteries for renewable energy storage.', trivia: 'Vanadium can withstand high temperatures, making it useful for certain engines.', image: 'https://periodictable.com/Samples/023.10/s9s.JPG', application: 'Used in steel production, batteries, and chemical manufacturing.', group: "Transition Metals", row: 4, col: 5 },
        { symbol: 'Cr', name: 'Chromium', number: 24, description: 'Chromium is a metal known for its use in stainless steel and for producing shiny, reflective surfaces.', trivia: 'Chromium is used to make chrome plating and is essential for the production of stainless steel!', image: 'https://periodictable.com/Samples/024.27/s7s.JPG', application: 'Used in chrome plating, stainless steel production, and in dyes.', group: "Transition Metals", row: 4, col: 6 },
        { symbol: 'Mn', name: 'Manganese', number: 25, description: 'Manganese is a metal important in steelmaking and is used in various industrial applications.', trivia: 'Manganese is essential for human health, playing a role in bone formation and metabolism.', image: 'https://periodictable.com/Samples/025.7/s9s.JPG', application: 'Used in steel production, batteries, and as a catalyst in chemical processes.', group: "Transition Metals", row: 4, col: 7 },
        { symbol: 'Fe', name: 'Iron', number: 26, description: 'Iron is the most commonly used metal in the world, crucial for manufacturing steel and essential for life.', trivia: 'Iron makes up about 5% of the Earth\'s crust!', image: 'https://periodictable.com/Samples/026.32/s9s.JPG', application: 'Used in steel manufacturing, construction, and in hemoglobin for oxygen transport.', group: "Transition Metals", row: 4, col: 8 },
        { symbol: 'Co', name: 'Cobalt', number: 27, description: 'Cobalt is a metal used in the production of batteries, superalloys, and catalysts for chemical reactions.', trivia: 'Cobalt gives blue glass and ceramics their bright color!', image: 'https://periodictable.com/Samples/027.14/s9s.JPG', application: 'Used in batteries, magnets, and aerospace components.', group: "Transition Metals", row: 4, col: 9 },
        { symbol: 'Ni', name: 'Nickel', number: 28, description: 'Nickel is a corrosion-resistant metal commonly used in batteries, coinage, and stainless steel.', trivia: 'Nickel is found in many everyday items, from coins to rechargeable batteries!', image: 'https://periodictable.com/Samples/028.9/s9s.JPG', application: 'Used in batteries, coinage, and stainless steel alloys.', group: "Transition Metals", row: 4, col: 10 },
        { symbol: 'Cu', name: 'Copper', number: 29, description: 'Copper is a metal known for its excellent electrical conductivity and is used extensively in electrical wiring and plumbing.', trivia: 'Copper has been used by humans for over 10,000 years!', image: 'https://periodictable.com/Samples/029.65/s7s.JPG', application: 'Used in electrical wiring, plumbing, and as a component in alloys.', group: "Transition Metals", row: 4, col: 11 },
        { symbol: 'Zn', name: 'Zinc', number: 30, description: 'Zinc is an essential metal used in galvanizing iron and steel to prevent rusting, and is found in various alloys.', trivia: 'Zinc is essential for human health, contributing to immune function and wound healing.', image: 'https://periodictable.com/Samples/030.7/s9s.JPG', application: 'Used in galvanization, batteries, and as an alloy in brass.', group: "Transition Metals", row: 4, col: 12 },
        { symbol: 'Ga', name: 'Gallium', number: 31, description: 'Gallium is a soft, silvery metal used in semiconductors and LED technology.', trivia: 'Gallium can melt in your hand as its melting point is just above room temperature!', image: 'https://periodictable.com/Samples/031.7/s9s.JPG', application: 'Used in semiconductors, LEDs, and solar panels.', group: "Post-Transition Metals", row: 4, col: 13 },
        { symbol: 'Ge', name: 'Germanium', number: 32, description: 'Germanium is a semiconductor material used in transistors and fiber optics.', trivia: 'Germanium was once used in early computer chips before being replaced by silicon!', image: 'https://periodictable.com/Samples/032.10/s9s.JPG', application: 'Used in semiconductors, fiber optics, and infrared optics.', group: "Metalloids",  row: 4, col: 14 },
        { symbol: 'As', name: 'Arsenic', number: 33, description: 'Arsenic is a metalloid element often associated with toxic compounds.', trivia: 'Arsenic is highly toxic and was historically used in poison!', image: 'https://periodictable.com/Samples/033.7/s9s.JPG', application: 'Used in semiconductors and as a preservative in wood.', group: "Metalloids", row: 4, col: 15 },
        { symbol: 'Se', name: 'Selenium', number: 34, description: 'Selenium is a non-metal used in electronics, glassmaking, and as a dietary supplement.', trivia: 'Selenium is essential for human health but can be toxic in high amounts!', image: 'https://periodictable.com/Samples/034.12/s9s.JPG', application: 'Used in electronics, glass production, and as a nutritional supplement.', group: "Nonmetals", row: 4, col: 16 },
        { symbol: 'Br', name: 'Bromine', number: 35, description: 'Bromine is a halogen element found in seawater and used in various chemical applications.', trivia: 'Bromine is one of only two elements that are liquids at room temperature!', image: 'https://periodictable.com/Samples/035.2/s9s.JPG', application: 'Used in flame retardants, pharmaceuticals, and in water treatment.', group: "Halogens", row: 4, col: 17 },
        { symbol: 'Kr', name: 'Krypton', number: 36, description: 'Krypton is a noble gas used in lighting and high-performance electrical equipment.', trivia: 'Krypton is used in some photographic flash lamps and in some types of neon signs!', image: 'https://periodictable.com/Samples/036.7/s7s.JPG', application: 'Used in lighting, photography, and in lasers.', group: "Noble Gases", row: 4, col: 18 },
        { symbol: 'Rb', name: 'Rubidium', number: 37, description: 'Rubidium is a soft, silvery-white metallic element that is highly reactive and belongs to the alkali metal group.', trivia: 'Rubidium is one of the least abundant alkali metals on Earth!', image: 'https://periodictable.com/Samples/037.5/s9s.JPG', application: 'Used in research and in the production of special glasses and atomic clocks.', group: "Alkali Metals", row: 5, col: 1 },
        { symbol: 'Sr', name: 'Strontium', number: 38, description: 'Strontium is a soft, silvery metal that is highly reactive and is commonly used in fireworks and in the production of magnets.', trivia: 'Strontium compounds produce a bright red flame when burned!', image: 'https://periodictable.com/Samples/038.5/s9s.JPG', application: 'Used in fireworks, magnets, and in the production of ferrite ceramics.', group: "Alkaline Earth Metals", row: 5, col: 2 },
        { symbol: 'Y', name: 'Yttrium', number: 39, description: 'Yttrium is a rare, silvery metal used in superconductors and in the production of phosphors for color television tubes.', trivia: 'Yttrium is often found in rare earth minerals!', image: 'https://periodictable.com/Samples/039.11/s9s.JPG', application: 'Used in superconductors, phosphors, and in various metal alloys.', group: "Transition Metals", row: 5, col: 3 },
        { symbol: 'Zr', name: 'Zirconium', number: 40, description: 'Zirconium is a corrosion-resistant metal used in nuclear reactors and in the production of high-performance ceramics.', trivia: 'Zirconium is highly resistant to corrosion and heat!', image: 'https://periodictable.com/Samples/040.17/s9s.JPG', application: 'Used in nuclear reactors, in high-performance ceramics, and in various alloys.', group: "Transition Metals", row: 5, col: 4 },
        { symbol: 'Nb', name: 'Niobium', number: 41, description: 'Niobium is a soft, grey, crystalline metal used in steel production and in high-temperature superalloys.', trivia: 'Niobium is named after the Greek goddess Niobe, due to its affinity for tantalum!', image: 'https://periodictable.com/Samples/041.13/s9s.JPG', application: 'Used in steel alloys, superconducting magnets, and in aerospace applications.', group: "Transition Metals", row: 5, col: 5 },
        { symbol: 'Mo', name: 'Molybdenum', number: 42, description: 'Molybdenum is a refractory metal used in high-strength alloys and as a catalyst in various industrial processes.', trivia: 'Molybdenum is a key component in steel production due to its high melting point!', image: 'https://periodictable.com/Samples/042.2/s9s.JPG', application: 'Used in steel production, high-strength alloys, and as a catalyst in chemical processes.', group: "Transition Metals", row: 5, col: 6 },
        { symbol: 'Tc', name: 'Technetium', number: 43, description: 'Technetium is a radioactive metal and the lightest element with no stable isotopes. It is commonly used in medical imaging.', trivia: 'Technetium was the first artificially produced element!', image: 'https://periodictable.com/Samples/043.1/s9s.JPG', application: 'Used in nuclear medicine for diagnostic imaging and as a tracer in medical studies.', group: "Transition Metals", row: 5, col: 7 },
        { symbol: 'Ru', name: 'Ruthenium', number: 44, description: 'Ruthenium is a rare transition metal that is part of the platinum group. It is known for its high resistance to wear and corrosion.', trivia: 'Adding a small amount of ruthenium to titanium makes it much more resistant to corrosion.', image: 'https://periodictable.com/Samples/044.5/s9s.JPG', application: 'Used in electronics, electrical contacts, and as a catalyst in chemical reactions.', group: "Transition Metals", row: 5, col: 8 },
        { symbol: 'Rh', name: 'Rhodium', number: 45, description: 'Rhodium is a rare and valuable transition metal that is highly reflective and corrosion-resistant.', trivia: 'Rhodium is often used to give jewelry its shiny, reflective surface!', image: 'https://periodictable.com/Samples/045.11/s7s.JPG', application: 'Used in catalytic converters, jewelry plating, and reflective surfaces.', group: "Transition Metals", row: 5, col: 9 },
        { symbol: 'Pd', name: 'Palladium', number: 46, description: 'Palladium is a shiny, silvery-white metal that is part of the platinum group and widely used in catalytic converters.', trivia: 'Palladium can absorb up to 900 times its own volume of hydrogen!', image: 'https://periodictable.com/Samples/046.10/s9s.JPG', application: 'Used in catalytic converters, electronics, and hydrogen storage.', group: "Transition Metals", row: 5, col: 10 },   
        { symbol: 'Ag', name: 'Silver', number: 47, description: 'Silver is a highly conductive, malleable, and ductile metal known for its lustrous appearance.', trivia: 'Silver is the best conductor of electricity of all metals!', image: 'https://periodictable.com/Samples/047.26/s9s.JPG', application: 'Used in jewelry, electronics, photography, and as an antibacterial agent.', group: "Transition Metals", row: 5, col: 11 },
        { symbol: 'Cd', name: 'Cadmium', number: 48, description: 'Cadmium is a soft, bluish-white metal that is toxic and primarily used in batteries and pigments.', trivia: 'Cadmium is often used in rechargeable nickel-cadmium batteries.', image: 'https://periodictable.com/Samples/048.20/s7s.JPG', application: 'Used in batteries, pigments, and coatings.', group: "Transition Metals", row: 5, col: 12 },
        { symbol: 'In', name: 'Indium', number: 49, description: 'Indium is a soft, malleable metal often used in electronics and touchscreens.', trivia: 'Indium makes a high-pitched "scream" when bent!', image: 'https://periodictable.com/Samples/049.7/s9s.JPG', application: 'Used in touchscreens, semiconductors, and coatings.', group: "Post-Transition Metals", row: 5, col: 13 },
        { symbol: 'Sn', name: 'Tin', number: 50, description: 'Tin is a malleable metal often used as a protective coating and in alloys like bronze.', trivia: 'Tin has been used by humans for over 3,500 years!', image: 'https://periodictable.com/Samples/050.22/s9s.JPG', application: 'Used in soldering, plating, and making alloys such as bronze.', group: "Post-Transition Metals", row: 5, col: 14 },
        { symbol: 'Sb', name: 'Antimony', number: 51, description: 'Antimony is a brittle metalloid commonly used in flame retardants and semiconductors.', trivia: 'The ancient Egyptians used antimony compounds in cosmetics.', image: 'https://periodictable.com/Samples/051.15/s9s.JPG', application: 'Used in flame retardants, semiconductors, and alloys.', group: "Metalloids", row: 5, col: 15 },
        { symbol: 'Te', name: 'Tellurium', number: 52, description: 'Tellurium is a brittle metalloid used in alloys and as a semiconductor material.', trivia: 'Tellurium is one of the rarest stable elements on Earth!', image: 'https://periodictable.com/Samples/052.4/s9s.JPG', application: 'Used in thermoelectric devices, alloys, and semiconductors.', group: "Metalloids", row: 5, col: 16 },
        { symbol: 'I', name: 'Iodine', number: 53, description: 'Iodine is a dark purple, non-metallic element essential for thyroid health in humans.', trivia: 'Iodine sublimates directly from solid to gas when heated!', image: 'https://periodictable.com/Samples/053.8/s9s.JPG', application: 'Used in disinfectants, photography, and as a dietary supplement.', group: "Halogens", row: 5, col: 17 },
        { symbol: 'Xe', name: 'Xenon', number: 54, description: 'Xenon is a noble gas used in lighting, medical imaging, and anesthesia.', trivia: 'Xenon is used in high-performance car headlights and strobe lights!', image: 'https://periodictable.com/Samples/054.15/s7s.JPG', application: 'Used in lighting, lasers, and medical imaging.', group: "Noble Gases", row: 5, col: 18 },
        { symbol: 'Cs', name: 'Cesium', number: 55, description: 'Cesium is a soft, gold-colored alkali metal that is highly reactive and used in atomic clocks.', trivia: 'Cesium-based atomic clocks are so precise that they lose only one second every 300 million years!', image: 'https://periodictable.com/Samples/055.4/s9s.JPG', application: 'Used in atomic clocks, photoelectric cells, and drilling fluids.', group: "Alkali Metals", row: 6, col: 1 },
        { symbol: 'Ba', name: 'Barium', number: 56, description: 'Barium is a soft, silvery alkaline earth metal often used in X-ray imaging and fireworks.', trivia: 'Barium compounds give fireworks their bright green color!', image: 'https://periodictable.com/Samples/056.1/s9s.JPG', application: 'Used in X-ray imaging, fireworks, and drilling fluids.', group: "Alkaline Earth Metals", row: 6, col: 2 },
        { symbol: 'La', name: 'Lanthanum', number: 57, description: 'Lanthanum is a soft, silvery-white rare earth metal used in optics and catalysts.', trivia: 'Lanthanum is used in camera lenses to improve their clarity.', image: 'https://periodictable.com/Samples/057.1/s9s.JPG', application: 'Used in camera lenses, catalysts, and rechargeable batteries.', group: "Lanthanides", row: 6, col: 3 },
        { symbol: 'Ce', name: 'Cerium', number: 58, description: 'Cerium is a soft, silvery metal that is the most abundant of the rare earth elements.', trivia: 'Cerium is used in catalytic converters and as a glass polishing agent.', image: 'https://periodictable.com/Samples/058.7/s9s.JPG', application: 'Used in catalytic converters, glass polishing, and alloys.', group: "Lanthanides", row: 8.5, col: 4 },
        { symbol: 'Pr', name: 'Praseodymium', number: 59, description: 'Praseodymium is a rare earth metal used to create strong magnets and specialized glasses.', trivia: 'Praseodymium gives welder’s goggles their yellow-green color!', image: 'https://periodictable.com/Samples/059.1/s9s.JPG', application: 'Used in magnets, aircraft engines, and glass coloring.', group: "Lanthanides", row: 8.5, col: 5 },
        { symbol: 'Nd', name: 'Neodymium', number: 60, description: 'Neodymium is a rare earth metal widely known for its use in powerful permanent magnets.', trivia: 'Neodymium magnets are the strongest type of permanent magnets!', image: 'https://periodictable.com/Samples/060.2/s9s.JPG', application: 'Used in magnets, lasers, and headphones.', group: "Lanthanides", row: 8.5, col: 6 },
        { symbol: 'Pm', name: 'Promethium', number: 61, description: 'Promethium is a radioactive rare earth element used in glow-in-the-dark paints and nuclear batteries.', trivia: 'Promethium does not occur naturally on Earth and is produced artificially!', image: 'https://periodictable.com/Samples/061.1/s9s.JPG', application: 'Used in nuclear batteries and luminous paints.', group: "Lanthanides", row: 8.5, col: 7 },
        { symbol: 'Sm', name: 'Samarium', number: 62, description: 'Samarium is a rare earth metal used in magnets and as a neutron absorber in nuclear reactors.', trivia: 'Samarium-cobalt magnets are highly resistant to heat!', image: 'https://periodictable.com/Samples/062.6/s9s.JPG', application: 'Used in magnets, nuclear reactors, and lasers.', group: "Lanthanides", row: 8.5, col: 8 },
        { symbol: 'Eu', name: 'Europium', number: 63, description: 'Europium is a soft, silvery metal used to produce red and blue phosphors in TV and LED screens.', trivia: 'Europium is responsible for the red color in TV and LED screens!', image: 'https://periodictable.com/Samples/063.9/s9s.JPG', application: 'Used in TV screens, LED lights, and anti-counterfeiting measures.', group: "Lanthanides", row: 8.5, col: 9 },
        { symbol: 'Gd', name: 'Gadolinium', number: 64, description: 'Gadolinium is a rare earth metal with unique magnetic properties, used in MRI contrast agents.', trivia: 'Gadolinium can remain magnetic even at very low temperatures!', image: 'https://periodictable.com/Samples/064.1/s9s.JPG', application: 'Used in MRI contrast agents, magnets, and neutron shielding.', group: "Lanthanides", row: 8.5, col: 10 },
        { symbol: 'Tb', name: 'Terbium', number: 65, description: 'Terbium is a rare earth metal used in green phosphors for displays and solid-state devices.', trivia: 'Terbium is essential for producing bright green light in displays!', image: 'https://periodictable.com/Samples/065.5/s9s.JPG', application: 'Used in displays, lasers, and solid-state devices.',group: "Lanthanides",  row: 8.5, col: 11 },
        { symbol: 'Dy', name: 'Dysprosium', number: 66, description: 'Dysprosium is a rare earth metal used in high-performance magnets and nuclear reactor control rods.', trivia: 'Dysprosium is highly resistant to demagnetization!', image: 'https://periodictable.com/Samples/066.2/s9s.JPG', application: 'Used in magnets, nuclear reactors, and lasers.', group: "Lanthanides", row: 8.5, col: 12 },
        { symbol: 'Ho', name: 'Holmium', number: 67, description: 'Holmium is a rare earth metal with the highest magnetic strength of any element.', trivia: 'Holmium is used in creating the strongest magnetic fields possible!', image: 'https://periodictable.com/Samples/067.4/s9s.JPG', application: 'Used in magnets, lasers, and nuclear reactors.', group: "Lanthanides", row: 8.5, col: 13 },
        { symbol: 'Er', name: 'Erbium', number: 68, description: 'Erbium is a rare earth metal used in fiber-optic communication systems and lasers.', trivia: 'Erbium gives glass and ceramics a pink hue!', image: 'https://periodictable.com/Samples/068.5/s9s.JPG', application: 'Used in fiber-optics, lasers, and coloring glass.', group: "Lanthanides", row: 8.5, col: 14 },
        { symbol: 'Tm', name: 'Thulium', number: 69, description: 'Thulium is a rare earth metal used in portable X-ray devices and lasers.', trivia: 'Thulium is the least abundant of the rare earth elements!', image: 'https://periodictable.com/Samples/069.1/s9s.JPG', application: 'Used in X-ray devices and lasers.', group: "Lanthanides", row: 8.5, col: 15 },
        { symbol: 'Yb', name: 'Ytterbium', number: 70, description: 'Ytterbium is a rare earth metal used in atomic clocks and as a doping agent in fiber lasers.', trivia: 'Ytterbium is named after the Swedish village of Ytterby, like several other rare earth elements.', image: 'https://periodictable.com/Samples/070.3/s9s.JPG', application: 'Used in atomic clocks, lasers, and alloys.', group: "Lanthanides", row: 8.5, col: 16 },
        { symbol: 'Lu', name: 'Lutetium', number: 71, description: 'Lutetium is a hard, dense metal used in catalysts and cancer treatment.', trivia: 'Lutetium is one of the most expensive rare earth elements!', image: 'https://periodictable.com/Samples/071.3/s9s.JPG', application: 'Used in catalysts, cancer therapy, and PET scans.', group: "Lanthanides", row: 8.5, col: 17 },
        {symbol: 'Hf', name: 'Hafnium', number: 72, description: 'Hafnium is a transition metal used in nuclear reactors and as an alloy in jet engines.', trivia: 'Hafnium is named after Hafnia, the Latin name for Copenhagen, where it was discovered.', image: 'https://periodictable.com/Samples/072.2/s9s.JPG', application: 'Used in nuclear reactors, jet engines, and semiconductors.', group: "Transition Metals", row: 6, col: 4}, 
        {symbol: 'Ta', name: 'Tantalum', number: 73, description: 'Tantalum is a corrosion-resistant metal used in electronics and medical implants.', trivia: 'Tantalum was named after the Greek mythological figure Tantalus, due to its resistance to corrosion.', image: 'https://periodictable.com/Samples/073.8/s9s.JPG', application: 'Used in electronics, medical implants, and aerospace components.', group: "Transition Metals", row: 6, col: 5},
        {symbol: 'W', name: 'Wolfram', number: 74, description: 'Wolfram, also known as Tungsten, is a dense metal used in lightbulb filaments and in heavy machinery.', trivia: 'Wolfram was named after the German word for "wolf\'s foam" due to its mineral origins.', image: 'https://periodictable.com/Samples/074.5/s9s.JPG', application: 'Used in lightbulb filaments, electronics, and heavy machinery.', group: "Transition Metals", row: 6, col: 6},
        {symbol: 'Re', name: 'Rhenium', number: 75, description: 'Rhenium is a rare, dense metal used in high-temperature superalloys and catalytic converters.', trivia: 'Rhenium is one of the rarest elements on Earth.', image: 'https://periodictable.com/Samples/075.10/s9s.JPG', application: 'Used in jet engines, catalysts, and electrical contacts.', group: "Transition Metals", row: 6, col: 7},
        {symbol: 'Os', name: 'Osmium', number: 76, description: 'Osmium is a hard, blue-gray metal used in electrical contacts and fountain pen tips.', trivia: 'Osmium is the densest naturally occurring element.', image: 'https://periodictable.com/Samples/076.8/s9s.JPG', application: 'Used in electrical contacts, fountain pen tips, and alloys.', group: "Transition Metals", row: 6, col: 8},
        {symbol: 'Ir', name: 'Iridium', number: 77, description: 'Iridium is a dense, corrosion-resistant metal used in spark plugs, thermocouples, and aircraft engines.', trivia: 'Iridium is one of the rarest elements on Earth, and has the highest density of any stable element.', image: 'https://periodictable.com/Samples/077.4/s9s.JPG', application: 'Used in spark plugs, thermocouples, and aircraft engines.', group: "Transition Metals", row: 6, col: 9},
        {symbol: 'Pt', name: 'Platinum', number: 78, description: 'Platinum is a precious metal used in jewelry, catalysts, and in hydrogen fuel cells.', trivia: 'Platinum is known for its resistance to corrosion and its catalytic properties.', image: 'https://periodictable.com/Samples/078.6/s9s.JPG', application: 'Used in jewelry, catalysts, and hydrogen fuel cells.', group: "Transition Metals", row: 6, col: 10},
        {symbol: 'Au', name: 'Gold', number: 79, description: 'Gold is a yellow precious metal used in jewelry, electronics, and as a form of currency.', trivia: 'Gold has been used by humans for thousands of years due to its beauty and rarity.', image: 'https://periodictable.com/Samples/079.2/s9s.JPG', application: 'Used in jewelry, electronics, and as a store of value.', group: "Transition Metals", row: 6, col: 11},
        {symbol: 'Hg', name: 'Mercury', number: 80, description: 'Mercury is a toxic liquid metal used in thermometers and electrical switches.', trivia: 'Mercury is the only metal that is liquid at room temperature.', image: 'https://periodictable.com/Samples/080.14/s9s.JPG', application: 'Used in thermometers, barometers, and electrical switches.', group: "Transition Metals", row: 6, col: 12},
        {symbol: 'Tl', name: 'Thallium', number: 81, description: 'Thallium is a soft metal used in electronics, semiconductors, and as a pesticide.', trivia: 'Thallium is highly toxic and was once used as a poison.', image: 'https://periodictable.com/Samples/081.5/s9s.JPG', application: 'Used in electronics, semiconductors, and pesticides.', group: "Post-Transition Metals", row: 6, col: 13},
        {symbol: 'Pb', name: 'Lead', number: 82, description: 'Lead is a toxic metal historically used in paints, pipes, and batteries.', trivia: 'Lead has been phased out in many applications due to its toxicity.', image: 'https://periodictable.com/Samples/082.27/s9s.JPG', application: 'Used in batteries, shielding from radiation, and in leaded glass.', group: "Post-Transition Metals", row: 6, col: 14},
        {symbol: 'Bi', name: 'Bismuth', number: 83, description: 'Bismuth is a brittle metal used in cosmetics, pharmaceuticals, and low-melting alloys.', trivia: 'Bismuth has a low toxicity and is often used as a safer alternative to lead in products.', image: 'https://periodictable.com/Samples/083.23/s9s.JPG', application: 'Used in cosmetics, pharmaceuticals, and low-melting alloys.', group: "Post-Transition Metals", row: 6, col: 15},
        {symbol: 'Po', name: 'Polonium', number: 84, description: 'Polonium is a highly radioactive metal used in nuclear applications and as an alpha emitter.', trivia: 'Polonium was famously used to poison former Russian spy Alexander Litvinenko.', image: 'https://periodictable.com/Samples/084.8/s9s.JPG', application: 'Used in nuclear applications and as an alpha emitter.', group: "Post-Transition Metals", row: 6, col: 16},
        {symbol: 'At', name: 'Astatine', number: 85, description: 'Astatine is a highly radioactive halogen used in cancer treatment research.', trivia: 'Astatine is one of the rarest naturally occurring elements on Earth.', image: 'https://periodictable.com/Samples/085.4/s9s.JPG', application: 'Used in cancer treatment research and radiotherapy.', group: "Halogens", row: 6, col: 17},
        {symbol: 'Rn', name: 'Radon', number: 86, description: 'Radon is a radioactive gas used in cancer treatment, but is also a health hazard.', trivia: 'Radon is a leading cause of lung cancer in non-smokers.', image: 'https://periodictable.com/Samples/086.4/s9s.JPG', application: 'Used in cancer treatment, but a health hazard when inhaled.', group: "Noble Gases", row: 6, col: 18},
        {symbol: 'Fr', name: 'Francium', number: 87, description: 'Francium is a highly radioactive alkali metal, one of the rarest naturally occurring elements.', trivia: 'Francium is so rare that only small amounts have been synthesized in laboratories.', image: 'https://periodictable.com/Samples/087.4/s9s.JPG', application: 'Mainly used in scientific research due to its rarity and radioactivity.', group: "Alkali Metals", row: 7, col: 1},
        {symbol: 'Ra', name: 'Radium', number: 88, description: 'Radium is a radioactive metal used in luminous paints, but is now mostly replaced due to health risks.', trivia: 'Radium was once used in medicine and as a source of radiation for cancer treatment.', image: 'https://periodictable.com/Samples/088.15/s9s.JPG', application: 'Historically used in luminous paints and medical treatments.', group: "Alkaline Earth Metals", row: 7, col: 2},
        {symbol: 'Ac', name: 'Actinium', number: 89, description: 'Actinium is a radioactive metal used in radiation therapy and in neutron sources.', trivia: 'Actinium was the first non-primordial radioactive element discovered.', image: 'https://periodictable.com/Samples/089.4/s9s.JPG', application: 'Used in radiation therapy and neutron sources.',  group: "Actinides", row: 7, col: 3},
        {symbol: 'Th', name: 'Thorium', number: 90, description: 'Thorium is a radioactive metal used as a nuclear fuel and in high-temperature applications.', trivia: 'Thorium is considered a potential alternative to uranium for nuclear energy.', image: 'https://periodictable.com/Samples/090.6/s9s.JPG', application: 'Used as nuclear fuel and in high-temperature applications.',  group: "Actinides", row: 9.5, col: 4},
        {symbol: 'Pa', name: 'Protactinium', number: 91, description: 'Protactinium is a radioactive metal used in research and nuclear fuel cycles.', trivia: 'Protactinium is one of the rarest naturally occurring elements.', image: 'https://periodictable.com/Samples/091.5/s9s.JPG', application: 'Used in nuclear research and fuel cycles.',  group: "Actinides", row: 9.5, col: 5},
        {symbol: 'U', name: 'Uranium', number: 92, description: 'Uranium is a radioactive metal used as nuclear fuel and in the production of nuclear weapons.', trivia: 'Uranium is the heaviest naturally occurring element that is still fissile.', image: 'https://periodictable.com/Samples/092.19/s9s.JPG', application: 'Used as nuclear fuel and in nuclear weapons.',  group: "Actinides", row: 9.5, col: 6},
        {symbol: 'Np', name: 'Neptunium', number: 93, description: 'Neptunium is a radioactive element used in nuclear reactors and research.', trivia: 'Neptunium was the first transuranic element to be synthesized.', image: 'https://periodictable.com/Samples/093.2/s9s.JPG', application: 'Used in nuclear reactors and scientific research.',  group: "Actinides", row: 9.5, col: 7},
        {symbol: 'Pu', name: 'Plutonium', number: 94, description: 'Plutonium is a highly radioactive metal used in nuclear reactors and nuclear weapons.', trivia: 'Plutonium was named after the planet Pluto.', image: 'https://periodictable.com/Samples/094.3/s9s.JPG', application: 'Used in nuclear reactors, weapons, and energy generation.',  group: "Actinides", row: 9.5, col: 8},
        {symbol: 'Am', name: 'Americium', number: 95, description: 'Americium is a radioactive metal used in smoke detectors and nuclear batteries.', trivia: 'Americium was named after the Americas, following the tradition of naming elements after continents.', image: 'https://periodictable.com/Samples/095.1/s9s.JPG', application: 'Used in smoke detectors, nuclear batteries, and research.',  group: "Actinides", row: 9.5, col: 9},
        {symbol: 'Cm', name: 'Curium', number: 96, description: 'Curium is a radioactive element used in scientific research and in nuclear reactors.', trivia: 'Curium was named after Marie and Pierre Curie for their pioneering work in radioactivity.', image: 'https://periodictable.com/Samples/096.3/s7s.JPG', application: 'Used in research and nuclear reactors.',  group: "Actinides", row: 9.5, col: 10},
        {symbol: 'Bk', name: 'Berkelium', number: 97, description: 'Berkelium is a radioactive element used in scientific research.', trivia: 'Berkelium was named after the city of Berkeley, California, where it was first synthesized.', image: 'https://periodictable.com/Samples/097.2/s9s.JPG', application: 'Used in scientific research and as a neutron source.',  group: "Actinides", row: 9.5, col: 11},
        {symbol: 'Cf', name: 'Californium', number: 98, description: 'Californium is a radioactive element used in nuclear reactors and as a neutron source.', trivia: 'Californium was named after the state of California, where it was first synthesized.', image: 'https://periodictable.com/Samples/098.2/s9s.JPG', application: 'Used in nuclear reactors and neutron sources.',  group: "Actinides", row: 9.5, col: 12},
        {symbol: 'Es', name: 'Einsteinium', number: 99, description: 'Einsteinium is a synthetic, radioactive element used in scientific research.', trivia: 'Einsteinium was named after Albert Einstein in recognition of his contributions to physics.', image: 'https://periodictable.com/Samples/099.3/s9s.JPG', application: 'Used in scientific research, particularly in the study of nuclear reactions.',  group: "Actinides", row: 9.5, col: 13},
        {symbol: 'Fm', name: 'Fermium', number: 100, description: 'Fermium is a radioactive element used in scientific research and nuclear applications.', trivia: 'Fermium was named after Enrico Fermi, a physicist known for his work in nuclear reactions.', image: 'https://periodictable.com/Samples/100.3/s9s.JPG', application: 'Used in scientific research and nuclear applications.',  group: "Actinides", row: 9.5, col: 14},
        {symbol: 'Md', name: 'Mendelevium', number: 101, description: 'Mendelevium is a radioactive element used in scientific research.', trivia: 'Mendelevium was named after Dmitri Mendeleev, the creator of the periodic table.', image: 'https://periodictable.com/Samples/101.3/s9s.JPG', application: 'Used in scientific research and particle physics.',  group: "Actinides", row: 9.5, col: 15},
        {symbol: 'No', name: 'Nobelium', number: 102, description: 'Nobelium is a synthetic radioactive element used in scientific research.', trivia: 'Nobelium was named after Alfred Nobel, the founder of the Nobel Prize.', image: 'https://periodictable.com/Samples/102.2/s9s.JPG', application: 'Used in scientific research and nuclear chemistry.',  group: "Actinides", row: 9.5, col: 16},
        {symbol: 'Lr', name: 'Lawrencium', number: 103, description: 'Lawrencium is a synthetic, radioactive element used in scientific research.', trivia: 'Lawrencium was named after Ernest O. Lawrence, the inventor of the cyclotron.', image: 'https://periodictable.com/Samples/103.2/s9s.JPG', application: 'Used in scientific research, particularly in particle physics.',  group: "Actinides", row: 9.5, col: 17},
        {symbol:"Rf",name:"Rutherfordium","number":104,description:"Rutherfordium is a synthetic element with a very short half-life, making it highly unstable.",trivia:"Named after physicist Ernest Rutherford, known as the father of nuclear physics.",image:"https://periodictable.com/Samples/104.2/s9s.JPG", group: "Transition Metals", row:7,col:4},
        {symbol:"Db",name:"Dubnium","number":105,description:"Dubnium is a synthetic and highly radioactive element, with no known biological role.",trivia:"Named after Dubna, Russia, where it was first synthesized.",image:"https://periodictable.com/Items/105.2/index.html",application:"Primarily used in scientific research.", group: "Transition Metals", row:7,col:5},
        {symbol: "Sg", name: "Seaborgium", number: 106, description: "Seaborgium is a synthetic element, named in honor of Glenn T. Seaborg.", trivia: "It was one of the first elements named after a living person.", image: "https://periodictable.com/Samples/106.4/s9s.JPG", application: "Primarily used in scientific research.", group: "Transition Metals", row: 7, col: 6}, 
        {symbol: "Bh", name: "Bohrium", number: 107, description: "Bohrium is a synthetic, radioactive element that decays rapidly.", trivia: "Named after physicist Niels Bohr, who contributed to atomic theory.", image: "https://periodictable.com/Samples/107.2/s9s.JPG", application: "Primarily used in scientific research.", group: "Transition Metals", row: 7, col: 7}, 
        {symbol: "Hs", name: "Hassium", number: 108, description: "Hassium is a synthetic, radioactive element with a very short half-life.", trivia: "Named after the German state of Hesse, where it was discovered.", image: "https://periodictable.com/Samples/108.2/s9s.JPG", application: "Primarily used in scientific research.", group: "Transition Metals", row: 7, col: 8}, 
        {symbol: "Mt", name: "Meitnerium", number: 109, description: "Meitnerium is a synthetic element named in honor of physicist Lise Meitner.", trivia: "It was first synthesized in 1982 at the GSI Helmholtz Centre in Germany.", image: "https://periodictable.com/Samples/109.1/s9s.JPG", application: "Primarily used in scientific research.", group: "Unknown Properties", row: 7, col: 9}, 
        {symbol: "Ds", name: "Darmstadtium", number: 110, description: "Darmstadtium is a synthetic element with no stable isotopes.", trivia: "Named after Darmstadt, Germany, where it was first synthesized.", image: "https://periodictable.com/Samples/110.1/s9s.JPG", application: "Primarily used in scientific research.", group: "Unknown Properties", row: 7, col: 10}, 
        {symbol: "Rg", name: "Roentgenium", number: 111, description: "Roentgenium is a synthetic element named after Wilhelm Roentgen, the discoverer of X-rays.", trivia: "Roentgenium is highly unstable and radioactive, with only a few atoms ever created.", image: "https://periodictable.com/Samples/111.1/s9s.JPG", application: "Primarily used in scientific research.", group: "Unknown Properties", row: 7, col: 11}, 
        {symbol: "Cn", name: "Copernicium", number: 112, description: "Copernicium is a synthetic element named after astronomer Nicolaus Copernicus.", trivia: "Copernicium is highly radioactive, with a half-life of just a few minutes.", image: "https://periodictable.com/Samples/112.1/s9s.JPG", application: "Primarily used in scientific research.", group: "Unknown Properties", row: 7, col: 12}, 
        {symbol: "Nh", name: "Nihonium", number: 113, description: "Nihonium is a synthetic element, first created in Japan.", trivia: "Named after Japan (Nihon), where it was discovered in 2004.", image: "https://periodictable.com/Samples/113.1/s9s.JPG", application: "Primarily used in scientific research.", group: "Unknown Properties", row: 7, col: 13}, 
        {symbol: "Fl", name: "Flerovium", number: 114, description: "Flerovium is a synthetic element named after the Flerov Laboratory of Nuclear Reactions in Russia.", trivia: "Flerovium is highly unstable and has a very short half-life.", image: "https://periodictable.com/Samples/114.1/s12s.JPG", application: "Primarily used in scientific research.", group: "Unknown Properties", row: 7, col: 14}, 
        {symbol: "Mc", name: "Moscovium", number: 115, description: "Moscovium is a synthetic element named after Moscow, Russia.", trivia: "Moscovium was first synthesized in 2004 by a team of Russian scientists.", image: "https://periodictable.com/Samples/115.1/s9s.JPG", application: "Primarily used in scientific research.", group: "Unknown Properties", row: 7, col: 15}, 
        {symbol: "Lv", name: "Livermorium", number: 116, description: "Livermorium is a synthetic element named after the Lawrence Livermore National Laboratory in California.", trivia: "Livermorium was first synthesized in 2000 by Russian and American scientists.", image: "https://periodictable.com/Samples/116.1/s9s.JPG", application: "Primarily used in scientific research.", group: "Unknown Properties", row: 7, col: 16}, 
        {symbol: "Ts", name: "Tennessine", number: 117, description: "Tennessine is a synthetic element named after the U.S. state of Tennessee.", trivia: "Tennessine was first synthesized in 2010 by a team of Russian and American scientists.", image: "https://periodictable.com/Samples/117.1/s9s.JPG", application: "Primarily used in scientific research.", group: "Unknown Properties", row: 7, col: 17}, 
        {symbol: "Og", name: "Oganesson", number: 118, description: "Oganesson is a synthetic element named after physicist Yuri Oganessian.", trivia: "Oganesson is the heaviest known element with the highest atomic number.", image: "https://periodictable.com/Samples/118.1/s9s.JPG", application: "Primarily used in scientific research.", group: "Unknown Properties", row: 7, col: 18}
    ];
    
    const filteredElements = elements.filter((item) => {
        const matchesSearch = item.name.toLowerCase().includes(searchText.toLowerCase()) || item.symbol.toLowerCase().includes(searchText.toLowerCase());
        return matchesSearch; 
    });

    const handleFunInteraction = (element) => {
        Alert.alert('Fun Interaction', `Hey! Did you know? ${element.trivia}`, [{ text: 'Cool!', style: 'default' }]);
    };

    const renderItem = (item, index) => {
        const left = (item.col - 1) * elementSize; 
        const top = (item.row - 1) * elementSize; 

        const isFaded = selectedGroup !== '' && item.group !== selectedGroup;
        const elementOpacity = isFaded ? 0.2 : 1; 

        return (
            <TouchableOpacity
                key={index}
                style={[
                    styles.element,
                    {
                        backgroundColor: colors[index % colors.length],
                        left,
                        top,
                        width: elementSize,
                        height: elementSize,
                        position: 'absolute',
                        opacity: elementOpacity, 
                    },
                ]}
                onPress={() => setSelectedElement(item)}
                onLongPress={() => handleFunInteraction(item)}
                accessible={true}
                accessibilityLabel={`Element ${item.name}`}
            >
                <Text style={styles.symbol}>{item.symbol}</Text>
                <Text style={styles.number}>{item.number}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <ScrollView
            contentContainerStyle={styles.scrollContainer}
            horizontal={true} 
            showsHorizontalScrollIndicator={true}  
            showsVerticalScrollIndicator={true} 
            style={{ flex: 1 }} 
        >
            <View style={styles.container}>
                <TextInput
                    style={styles.searchBar}
                    placeholder="Search elements..."
                    value={searchText}
                    onChangeText={setSearchText}
                />
                <View style={styles.groupFilterContainer}>
                {['All', 'Halogens', 'Noble Gases', 'Lanthanides', 'Actinides', 'Metalloids', 'Nonmetals', 'Alkali Metals', 'Alkaline Earth Metals', 'Transition Metals', 'Post-Transition Metals', 'Unknown Properties'].map((group, index) => (
                    <TouchableOpacity
                        key={group}
                        style={[
                            styles.groupButton,
                            { backgroundColor: colors[index % colors.length] }, 
                            selectedGroup === group ? styles.selectedGroupButton : null
                        ]}
                        onPress={() => setSelectedGroup(group === 'All' ? '' : group)}
                    >
                        <Text style={styles.groupButtonText}>{group}</Text>
                    </TouchableOpacity>
                ))}

                </View>

                {}
                <ScrollView
                    contentContainerStyle={[styles.gridContainer, { width: width, minHeight: height * 2 }]} // Enable space for multiple rows
                    horizontal={false}  
                    showsVerticalScrollIndicator={true}
                    style={{ flex: 1 }}
                >
                    {filteredElements.map((item, index) => renderItem(item, index))}
                </ScrollView>

                {}
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
                            </View>
                        </View>
                    </Modal>
                )}
            </View>
        </ScrollView>
    );
};

export default Learning;
