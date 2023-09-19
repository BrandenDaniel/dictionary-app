"use client";

import { useFontFamilyContext } from "@/contexts/font-family-context";
import { useWordContentContext } from "@/contexts/word-content-context";
import React, { MouseEvent } from "react";
import { fontFamilyCondition } from "./Search";

const WordContent = () => {
  const { wordContent, setSearchedWord, wordSearch } = useWordContentContext();

  const { fontFamily } = useFontFamilyContext();

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

  if (wordContent.title) {
    return <span>erroed</span>;
  } else {
    return (
      <section className={`word ${fontFamilyCondition(fontFamily)}`}>
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
                      <div className="word__item-header-audio" key={index}>
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
              {item.meanings.map((item: any, index: number) => (
                <div className="word__item-meanings" key={index}>
                  <h2>{item.partOfSpeech}</h2>

                  <div className="word__item-meanings-definition">
                    <h3>Meaning</h3>
                    <ul>
                      {item.definitions.map((item: any, index: number) => (
                        <li key={index}>{item.definition}</li>
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
  }
};

export default WordContent;
