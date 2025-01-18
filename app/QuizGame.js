import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  Animated,
} from 'react-native';

// Sample data for periodic elements
const periodicElements = [
  { symbol: 'H', name: 'Hydrogen', image: 'https://via.placeholder.com/100?text=H' },
  { symbol: 'He', name: 'Helium', image: 'https://via.placeholder.com/100?text=He' },
  { symbol: 'Li', name: 'Lithium', image: 'https://via.placeholder.com/100?text=Li' },
  { symbol: 'Be', name: 'Beryllium', image: 'https://via.placeholder.com/100?text=Be' },
  { symbol: 'B', name: 'Boron', image: 'https://via.placeholder.com/100?text=B' },
  { symbol: 'C', name: 'Carbon', image: 'https://via.placeholder.com/100?text=C' },
  { symbol: 'N', name: 'Nitrogen', image: 'https://via.placeholder.com/100?text=N' },
  { symbol: 'O', name: 'Oxygen', image: 'https://via.placeholder.com/100?text=O' },
];

const shuffledCards = () => {
  const cards = periodicElements.flatMap((element) => [
    { ...element, id: `${element.symbol}-1` },
    { ...element, id: `${element.symbol}-2` },
  ]);
  return cards.sort(() => Math.random() - 0.5);
};

const QuizGame = () => {
  const [mode, setMode] = useState(null); // Modes: 'quiz', 'matching', 'flashcards'
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [flashcardIndex, setFlashcardIndex] = useState(0);

  // Matching Game State
  const [cards, setCards] = useState(shuffledCards());
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);

  // Flashcard Favorites
  const [starred, setStarred] = useState([]);

  // Quiz Logic
  const handleQuizAnswer = (selectedOption) => {
    const currentElement = periodicElements[currentQuestionIndex];
    if (selectedOption === currentElement.name) {
      setScore(score + 1);
    }
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < periodicElements.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setShowScore(true);
    }
  };

  const resetQuiz = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    setShowScore(false);
  };

  // Matching Game Logic
  const handleCardPress = (card) => {
    if (selectedCards.length === 2 || matchedCards.includes(card.id)) return;

    const updatedSelectedCards = [...selectedCards, card];
    setSelectedCards(updatedSelectedCards);

    if (updatedSelectedCards.length === 2) {
      const [firstCard, secondCard] = updatedSelectedCards;
      if (firstCard.symbol === secondCard.symbol) {
        setMatchedCards((prev) => [...prev, firstCard.id, secondCard.id]);
      }
      setTimeout(() => setSelectedCards([]), 1000);
    }
  };

  const resetMatchingGame = () => {
    setCards(shuffledCards());
    setMatchedCards([]);
    setSelectedCards([]);
  };

  // Flashcards Logic
  const toggleStar = (index) => {
    setStarred((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {!mode ? (
          <View>
            <Text style={styles.title}>Choose a Learning Mode:</Text>
            <TouchableOpacity style={styles.modeButton} onPress={() => setMode('quiz')}>
              <Text style={styles.buttonText}>Quiz</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modeButton} onPress={() => setMode('matching')}>
              <Text style={styles.buttonText}>Matching Game</Text>
            </TouchableOpacity>
          </View>
        ) : mode === 'quiz' ? (
          showScore ? (
            <View>
              <Text style={styles.title}>
                Your Score: {score} / {periodicElements.length}
              </Text>
              <TouchableOpacity style={styles.restartButton} onPress={resetQuiz}>
                <Text style={styles.buttonText}>Restart Quiz</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modeButton} onPress={() => setMode(null)}>
                <Text style={styles.buttonText}>Back to Menu</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <Text style={styles.title}>
                What is the name of the element with the symbol "{periodicElements[currentQuestionIndex].symbol}"?
              </Text>
              <View>
                {periodicElements.map((element, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.optionButton}
                    onPress={() => handleQuizAnswer(element.name)}
                  >
                    <Text style={styles.buttonText}>{element.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View style={styles.progressBarContainer}>
                <View
                  style={[
                    styles.progressBar,
                    {
                      width: `${((currentQuestionIndex + 1) / periodicElements.length) * 100}%`,
                    },
                  ]}
                />
              </View>
            </View>
          )
        ) : mode === 'matching' ? (
          <View>
            <Text style={styles.title}>Match the Element Cards:</Text>
            <View style={styles.cardsContainer}>
              {cards.map((card) => (
                <TouchableOpacity
                  key={card.id}
                  style={[
                    styles.card,
                    matchedCards.includes(card.id) || selectedCards.includes(card)
                      ? styles.cardMatched
                      : null,
                  ]}
                  onPress={() => handleCardPress(card)}
                  disabled={matchedCards.includes(card.id)}
                >
                  {matchedCards.includes(card.id) || selectedCards.includes(card) ? (
                    <>
                      <Image source={{ uri: card.image }} style={styles.cardImage} />
                      <Text style={styles.cardText}>{card.name}</Text>
                    </>
                  ) : (
                    <Text style={styles.cardBack}>?</Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
            {matchedCards.length === cards.length && (
              <Text style={styles.congratulations}>Congratulations! You've matched all cards!</Text>
            )}
            <TouchableOpacity style={styles.restartButton} onPress={resetMatchingGame}>
              <Text style={styles.buttonText}>Restart Game</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modeButton} onPress={() => setMode(null)}>
              <Text style={styles.buttonText}>Back to Menu</Text>
            </TouchableOpacity>
          </View>
        ) : mode === 'flashcards' ? (
          <View>
            <Text style={styles.title}>Symbol: {periodicElements[flashcardIndex].symbol}</Text>
            <Text style={styles.subtitle}>Name: {periodicElements[flashcardIndex].name}</Text>
            <Image
              source={{ uri: periodicElements[flashcardIndex].image }}
              style={styles.cardImage}
            />
            <TouchableOpacity
              style={styles.starButton}
              onPress={() => toggleStar(flashcardIndex)}
            >
              <Text>{starred.includes(flashcardIndex) ? '★' : '☆'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modeButton}
              onPress={() =>
                setFlashcardIndex((flashcardIndex + 1) % periodicElements.length)
              }
            >
              <Text style={styles.buttonText}>Next Flashcard</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modeButton} onPress={() => setMode(null)}>
              <Text style={styles.buttonText}>Back to Menu</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  modeButton: {
    backgroundColor: '#6200EE',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: 200,
    alignItems: 'center',
  },
  optionButton: {
    backgroundColor: '#BB86FC',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  progressBarContainer: {
    height: 10,
    width: '100%',
    backgroundColor: '#ddd',
    borderRadius: 5,
    marginTop: 20,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#6200EE',
    borderRadius: 5,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  card: {
    width: 80,
    height: 100,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#BB86FC',
    borderRadius: 10,
  },
  cardImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  cardText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#fff',
  },
  cardBack: {
    fontSize: 24,
    color: '#fff',
  },
  cardMatched: {
    backgroundColor: '#03DAC5',
  },
  restartButton: {
    backgroundColor: '#03DAC5',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: 200,
    alignItems: 'center',
  },
  congratulations: {
    fontSize: 18,
    color: '#6200EE',
    marginVertical: 10,
  },
  starButton: {
    padding: 10,
    alignItems: 'center',
  },
});

export default QuizGame;
