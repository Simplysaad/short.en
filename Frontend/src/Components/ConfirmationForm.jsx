import React, { useState, useEffect } from "react";

const ConfirmationForm = () => {
  const [originalUrl, setOriginalUrl] = useState("https://www.example.com");
  const [shortenedUrl, setShortenedUrl] = useState("short.en/xys");

  return (
    <>
      <div className="border p-3 my-5 mx-auto" action="/" method="post">
        <div className="my-5">
          <label className="text-muted" for="originalUrl">
            Original Url
          </label>
          <div className="input-group py-3">
            <input
              className="muted form-control"
              disabled
              id="originalUrl"
              value={originalUrl}
            />
            <button className="btn btn-danger" id="originalUrlBtn">
              <i className="fa fa-clipboard"></i>
            </button>
          </div>
          <a className="text-break" href={originalUrl}>
            {originalUrl}
          </a>
        </div>

        <div className="my-5">
          <label className="text-muted" for="shortUrl">
            Shortened Url
          </label>
          <div className="input-group py-3">
            <input
              className="muted form-control"
              disabled
              id="shortUrl"
              value={shortenedUrl}
            />
            <button className="btn btn-danger" id="shortUrlBtn">
              <i className="fa fa-clipboard"></i>
            </button>
          </div>
          <a className="text-break" href={shortenedUrl}>
            {shortenedUrl}
          </a>
        </div>
      </div>
    </>
  );
};

export default ConfirmationForm;
