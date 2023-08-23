// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useState, useEffect } from "react";
import Button from "./Button";
import BackButton from "./BackButton";
import styles from "./Form.module.css";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Message from "./Message";
export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [placeDetials, setPlaceDetials] = useState({});
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [lat, lng] = useUrlPosition();
  const [countryEmoji, setCountryEmoji] = useState("");
  const [errorInCode, setErrorInCode] = useState("");
  useEffect(() => {
    async function fetchGeolocationDetials() {
      try {
        setErrorInCode("");
        const res = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
        );

        if (!res.ok)
          throw new Error(
            `Network response was not ok (${res.status} ${res.statusText})`
          );

        const data = await res.json();
        if (!data.countryCode)
          throw new Error("City Does Not Exist, Click Somewhere");
        setCityName(data.name || data.locality || "");
        setCountry(data.countryName || "");
        setCountryEmoji(convertToEmoji(data.countryCode));
      } catch (err) {
        setErrorInCode(err.message);
      }
    }
    fetchGeolocationDetials();
  }, [lat, lng]);

  if (errorInCode) return <Message message={errorInCode} />;

  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{countryEmoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton type="back">&larr; Back</BackButton>
      </div>
    </form>
  );
}

export default Form;
