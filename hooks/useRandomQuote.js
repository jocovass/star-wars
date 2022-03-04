import React from "react";

export const useRandomQuote = () => {
  const [quote, setQuote] = React.useState();

  async function fetchQuote() {
    const res = await fetch(
      "https://swquotesapi.digitaljedi.dk/api/SWQuote/RandomStarWarsQuote"
    );
    const data = await res.json();
    setQuote(data);
  }

  React.useEffect(() => {
    fetchQuote();
  }, []);

  return quote;
};
