"use client";

import { useFontFamilyContext } from "@/contexts/font-family-context";
import { useWordContentContext } from "@/contexts/word-content-context";
import React, { MouseEvent } from "react";
import { fontFamilyCondition } from "./Search";
import Link from "next/link";
import NoDefinition from "./NoDefinition";
import Loader from "./Loader";

const WordContent = () => {
  const { wordContent, setSearchedWord, apiCall, isLoading } =
    useWordContentContext();

  const { fontFamily } = useFontFamilyContext();

  const playAudio = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const button = document.getElementById("word-audio") as HTMLAudioElement;
    button.play();
  };

  const buttonSearch = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSearchedWord(e.currentTarget.value);
    apiCall(e.currentTarget.value);
    window.scrollTo({ top: 0 });
  };

  if (wordContent.title) {
    return <NoDefinition />;
  } else {
    return (
      <section className={`word ${fontFamilyCondition(fontFamily)}`}>
        {isLoading ? (
          <Loader />
        ) : (
          wordContent.map((item: any, index: number) => {
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
                          <>
                            <li key={item.definition}>{item.definition}</li>

                            {item.example && (
                              <li
                                key={item.example}
                                className="word__item-meanings-example"
                              >
                                {`"${item.example}"`}
                              </li>
                            )}
                          </>
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
                                className={`${fontFamilyCondition(fontFamily)}`}
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
                {item.sourceUrls && (
                  <div className="word__item-source">
                    <h3>Source</h3>
                    <div>
                      {item.sourceUrls.map((item: string, index: number) => (
                        <Link href={item} key={index} target="_blank">
                          {item}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </section>
    );
  }
};

export default WordContent;
