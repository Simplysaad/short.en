import React from "react";
import UrlShortenerForm from "./Components/UrlShortenerForm.jsx";
import ConfirmationForm from "./Components/ConfirmationForm.jsx";

const App = () => {
  return (
    <main className="container flex justify-center align-middle flex-col">
      <UrlShortenerForm />
      {/* <ConfirmationForm /> */}
    </main>
  );
};

export default App;
