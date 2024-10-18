"use client";
import React, { useState } from "react";
import { marked } from "marked";
import parse from "html-react-parser";

const ActivityReport = () => {
  const [text, setText] = useState("");
  console.log("text rendred:", text);
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div
        className="prose card w-2/3 h-96 p-3 bg-white text-black"
        contentEditable={true}
        onInput={async (e) => {
        }}
      >
        {parse(marked(text))}
      </div>
    </div>
  );
};

export default ActivityReport;

// setText(marked(e.target.innerHTML))
