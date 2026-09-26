import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import { COLORS } from "../../constants";
import { playSound } from "../../services/soundHandler";
import MyWords from "../../dummyData";

export default function Play({ words }) {
  const [myWords, setMyWords] = useState(() =>
    (words ?? MyWords).map((word) => ({ ...word }))
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpened, setIsOpened] = useState(false);

  const wordsToLearn = myWords.filter((word) => word.status < 2);

  if (wordsToLearn.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.congrats}>Congrats!</Text>
        <Text style={styles.message}>
          For now you have learned all the words
        </Text>
      </View>
    );
  }

  const currentWord =
    wordsToLearn[currentIndex % wordsToLearn.length];

  function showNextWord() {
    setIsOpened(false);

    if (wordsToLearn.length > 1) {
      setCurrentIndex(
        (prevIndex) => (prevIndex + 1) % wordsToLearn.length
      );
    }
  }

  function onKnewIt() {
    setMyWords((prevWords) =>
      prevWords.map((word) =>
        word.word === currentWord.word
          ? { ...word, status: word.status + 1 }
          : word
      )
    );

    setIsOpened(false);
    setCurrentIndex((prevIndex) => prevIndex + 1);
  }

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.card}
        onPress={() => setIsOpened(true)}
      >
        <Text style={styles.word}>{currentWord.word}</Text>

        {isOpened && (
          <>
            <View style={styles.phoneticsContainer}>
              <Text style={styles.phonetics}>
                {currentWord.phonetics}
              </Text>

              {currentWord.audio && (
                <Pressable
                  onPress={() => playSound(currentWord.audio)}
                >
                  <Ionicons
                    name="volume-medium-outline"
                    size={28}
                    color={COLORS.primary900}
                  />
                </Pressable>
              )}
            </View>

            <Text style={styles.partOfSpeech}>
              {currentWord.partOfSpeech}
            </Text>

            <Text style={styles.meaning}>
              {currentWord.meaning}
            </Text>
          </>
        )}
      </Pressable>

      {isOpened && (
        <View style={styles.buttons}>
          <Pressable
            style={styles.button}
            onPress={showNextWord}
          >
            <Text style={styles.buttonText}>
              Didn't know it
            </Text>
          </Pressable>

          <Pressable
            style={styles.button}
            onPress={onKnewIt}
          >
            <Text style={styles.buttonText}>
              Knew it
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },

  card: {
    width: "100%",
    minHeight: 180,
    backgroundColor: COLORS.fontInverse,
    borderRadius: 8,
    elevation: 4,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  word: {
    fontSize: 32,
    fontWeight: "800",
    color: COLORS.fontMain,
  },

  phoneticsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },

  phonetics: {
    fontSize: 20,
    color: COLORS.fontMain,
    marginRight: 20,
  },

  partOfSpeech: {
    fontSize: 18,
    color: COLORS.fontMain,
    marginTop: 10,
  },

  meaning: {
    fontSize: 16,
    color: COLORS.fontMain,
    textAlign: "center",
    marginTop: 10,
  },

  buttons: {
    width: "100%",
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
  },

  button: {
    flex: 1,
    height: 45,
    backgroundColor: COLORS.primary900,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: COLORS.fontInverse,
    fontSize: 16,
    fontWeight: "600",
  },

  congrats: {
    color: COLORS.primary900,
    fontSize: 32,
    fontWeight: "800",
    marginBottom: 15,
  },

  message: {
    color: COLORS.fontMain,
    fontSize: 18,
    textAlign: "center",
  },
});
