import React, { useState, useEffect } from "react";
import QuoteBlock from "../pages/pickDate";
import colorList from "../helpers/colors";
import "../styles.css";

const api_url =
    "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

const Quote = props => {
    const [quotesList, setQuotesList] = useState([]);
    const [quote, setQuote] = useState({});
    const [appColor, setAppColor] = useState("336699");
    const [error, setError] = useState({ status: false, message: "" });

    const generateRandomNumber = max => {
        return Math.floor(Math.random() * max);
    };

    const changeAppColor = list => {
        let randomIndex = generateRandomNumber(list.length);
        while (list[randomIndex] === appColor) {
            randomIndex = generateRandomNumber(list.length);
        }
        setAppColor(list[randomIndex]);
    };

    const setRandomQuote = list => {
        let randomIndex = generateRandomNumber(list.length);
        while (list[randomIndex].quote === quote.quote) {
            randomIndex = generateRandomNumber(list.length);
        }
        setQuote(quotesList[randomIndex]);
        changeAppColor(colorList);
    };

    // reach to the api to grab a list of quotes from the server
    useEffect(() => {
        // reset error state before reaching out
        setError({ status: false, message: "" });
        // check if quotes has been already fetched
        if (quotesList.length === 0) {
            fetch(api_url)
                .then(res => res.json())
                .then(res => setQuotesList(res.quotes))
                .catch(err => useState({ error: true, message: err.message }));
        } else {
            setRandomQuote(quotesList);
        }
    }, [quotesList]);

    return (
        <div className="App" style={{ "--app-background": `#${appColor}` }}>
            {error.status ? (
                <h1>{error.message}</h1>
            ) : (
                <QuoteBlock
                    value={quote}
                    onQuoteChange={() => setRandomQuote(quotesList)}
                />
            )}
        </div>
    );
};

export default Quote;
