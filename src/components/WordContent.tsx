"use client";

import { useWordContentContext } from "@/contexts/word-content-context";
import React from "react";

const WordContent = () => {
  const { wordContent } = useWordContentContext();

  console.log(wordContent);
  return (
    <section className="word">
      {wordContent ? "exists" : "not found"}
      {/* {wordContent.map((item: any, index: number) => (
        <div key={index}>{item.word}</div>
      ))} */}
    </section>
  );
};

export default WordContent;
