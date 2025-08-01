import React from "react";
import { useState } from "react";
import axios from "axios";

const UrlShortenerForm = () => {
  const [originalUrl, setOriginalUrl] = useState("https://simplysaad.github.io");
  const [preferredText, setPreferredText] = useState("saad idris");
  const [shortenedUrl, setShortenedUrl] = useState({});

  function handleSubmit(e) {
    e.preventDefault();

    console.log("hello world");
    axios
      .post("http://localhost:5000/", {
        originalUrl,
        preferredText,
      })
      .then((response) =>
        setShortenedUrl(response.data.data.newLink)
      )
      .catch((err) => console.error(err));
  }

  return (
    <form
      // onSubmit={handleSubmit}
      className="my-5 flex flex-col gap-3 col-auto mx-auto"
    >
      <p className="">{shortenedUrl.shortLink}</p>
      <div className="rounded flex flex-col gap-1">
        <label htmlFor="inputLink" className="text-gray-600">
          Enter the Original Link
        </label>
        <input
          className="rounded border p-2"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
        />
      </div>
      <div className="rounded flex flex-col gap-1">
        <label htmlFor="inputLink" className="text-gray-600">
          Enter the Preferred Text
        </label>
        <input
          className="rounded border p-2"
          value={preferredText}
          placeholder="(Optional)"
          onChange={(e) => setPreferredText(e.target.value)}
        />
      </div>
      <div className="rounded flex flex-col gap-1">
        <span className="text-black me-3">
          Your short url: 
        </span>
        <a
          className=""
          target="_blank"
          href={shortenedUrl.shortLink}
        >
          {shortenedUrl.shortLink}
        </a>
      </div>
      <button
        type="submit"
        onClick={handleSubmit}
        className="my-5 bg-green-600 rounded px-6 p-2 text-white shadow col-12"
      >
        Shorten Link
      </button>
    </form>
  );
};

export default UrlShortenerForm;
