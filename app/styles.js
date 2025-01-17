import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: 100,
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
        width: '100%',
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        position: 'relative',
        paddingB: '-10%',
        justifyContent: 'center',
        alignItems: 'center',
        left: '5%',
    },
    element: {
        width: 50,
        height: 10,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        position: 'absolute',
        justifyContent: 'center',
    },
    symbol: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    number: {
        fontSize: 12,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '85%',
        height: '80%',
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
        position: 'absolute',
        top: '15%',
        left: '80%',
        width: '60%',
        fontSize: 50,
        fontWeight: 'bold',
    },
    modalName: {
        position: 'absolute',
        top: '15%',
        left: '36%',
        width: '60%',
        fontSize: 50,
        fontFamily: 'Arial',
        marginBottom: 2,
    },
    modalImage: {
        position: 'absolute',
        top: '25',
        left: '20',
        width: '30%',
        height: '80%',
        marginBottom: 8,
        borderRadius: 8,
    },
    modalDescription: {
        position: 'absolute',
        top: '50%',
        left: '35%',
        width: '60%',
        fontSize: 14,
        textAlign: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },
    modalApplication: {
        position: 'absolute',
        top: '70%',
        left: '40%',
        width: '60%',
        fontSize: 12,
        fontStyle: 'italic',
        color: '#555',
        justifyContent: 'center',
        marginBottom: 8,
    },
    modalTrivia: {
        position: 'absolute',
        top: '80%',
        left: '35%',
        width: '60%',
        fontSize: 14,
        fontWeight: 'bold',
        color: '#007BFF',
        textAlign: 'center',
        marginBottom: 16,
    },
    groupFilterContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap', 
        justifyContent: 'center', 
        marginVertical: 1,
        paddingHorizontal: 1,
    },
    groupButton: {
        backgroundColor: (index) => pastelColors[index % pastelColors.length],
        paddingVertical: 1,
        paddingHorizontal: 1,
        margin: 0.5, 
        borderRadius: 3,
        width: '15%', 
        alignItems: 'center', 
    },
    selectedGroupButton: {
        backgroundColor: '#EB7637', 
    },
    
    groupButtonText: {
        color: '#00000',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 12,
    },    
    scrollContainer: {
        flexGrow: 1,
    },
});

export default styles;

