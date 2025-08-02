import React from "react";
import { useState } from "react";
import axios from "axios";

const UrlShortenerForm = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [preferredText, setPreferredText] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [copySuccess, setCopySuccess] = useState("");
  const api = import.meta.env.VITE_API_URL;

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post(api, {
        originalUrl,
        preferredText,
      })
      .then((response) => setShortenedUrl(response.data.data.newLink.shortLink))
      .catch((err) => console.error(err));
  }
  function handleCopy(e) {
    e.preventDefault();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shortenedUrl);
      setCopySuccess("Shortened link copied successfully!");
      setTimeout(() => setCopySuccess(""), 2000);
    }
  }
  function handlePaste(e) {
    e.preventDefault();
    if (navigator.clipboard) {
      navigator.clipboard.readText().then((text) => {
        setOriginalUrl(text);
      });
    }
  }

  return (
    <form className="my-5 flex flex-col gap-3 col-auto mx-auto">
      <div className="rounded flex flex-col gap-1">
        <label htmlFor="inputLink" className="text-gray-600">
          Enter the Original Link
        </label>
        <div className="flex">
          <input
            className="rounded border p-2"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
          />
          <button
            className="p-1 border rounded col-span-2"
            onClick={handlePaste}
          >
            <i className="fa fa-clipboard"></i>
            <span className="">Paste</span>
          </button>
        </div>
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
      <div className="gap-1">
        <span className="text-black me-3 block">Your short url:</span>
        <div className="flex gap-1">
          <a
            className=""
            target="_blank"
            rel="noopener noreferrer "
            href={shortenedUrl}
          >
            {shortenedUrl}
          </a>
          <button
            className="col-span-2 bg-auto rounded border p-1"
            onClick={handleCopy}
          >
            <i className="fa fa-clipboard"></i>
            <span className="">Copy</span>
          </button>
        </div>
        {copySuccess && (
          <span className="text-green-600 text-sm">{copySuccess}</span>
        )}
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
