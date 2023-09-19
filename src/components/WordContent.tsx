"use client";

import { useWordContentContext } from "@/contexts/word-content-context";
import React, { MouseEvent } from "react";

const WordContent = () => {
  const { wordContent, setWordContent, setSearchedWord, wordSearch } =
    useWordContentContext();

  const playAudio = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const button = document.getElementById("word-audio") as HTMLAudioElement;
    button.play();
  };

  const buttonSearch = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSearchedWord(e.currentTarget.value);
    wordSearch();
  };

  console.log(wordContent);
  return (
    <section className="word">
      {wordContent.title && "not found"}
      {wordContent.map((item: any, index: number) => {
        let isBroken = false;
        return (
          <div className="word__item" key={index}>
            <div className="word__item-header">
              <div>
                <h1>{item.word}</h1>
                <span>{item.phonetic}</span>
              </div>
              {item.phonetics.map((item: any, index: number) => {
                if (isBroken) {
                  return;
                }
                if (item.audio.length > 0) {
                  isBroken = true;
                  return (
                    <div className="word__item-header-audio">
                      <button onClick={playAudio}></button>
                      <audio
                        id="word-audio"
                        key={index}
                        src={item.audio}
                        controls
                      ></audio>
                    </div>
                  );
                }
              })}
            </div>
            {item.meanings.map((item: any) => (
              <div className="word__item-meanings">
                <h2>{item.partOfSpeech}</h2>

                <div className="word__item-meanings-definition">
                  <h3>Meaning</h3>
                  <ul>
                    {item.definitions.map((item: any) => (
                      <li>{item.definition}</li>
                    ))}
                  </ul>
                  {item.synonyms.length > 0 && (
                    <div>
                      <h3>Synonyms</h3>
                      <div>
                        {item.synonyms.map((item: string) => (
                          <button
                            value={item}
                            key={item}
                            onClick={buttonSearch}
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </section>
  );
};

export default WordContent;
