"use Strict";
import React from "react";
import { useState } from "react";
const UrlShortenerForm = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [preferredText, setPreferredText] = useState("");
  // function handleSubmit() {
  //   return;
  // }

  return (
    <>
      <form className="border p-3 my-5 mx-auto">
        <div className="form-floating">
          <input
            className="form-control"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
          />
          <label htmlFor="inputLink">Enter the Original Link</label>
        </div>
        <div className="form-floating">
          <input
            className="form-control"
            value={preferredText}
            onChange={(e) => setPreferredText(e.target.value)}
          />
          <label htmlFor="inputText">Enter the Preferred Text</label>
        </div>
        <button className="btn btn-lg btn-outline-danger my-5 col-12">
          Shorten Link
        </button>
      </form>
    </>
  );
};

export default UrlShortenerForm;
