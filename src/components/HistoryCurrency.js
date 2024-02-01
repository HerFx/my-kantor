import React, { useState } from "react";

const HistoryCurrency = () => {
  const [currencyData, setCurrencyData] = useState([]);
  const [historyData, setHistoryData] = useState(new Date());
  const [selectedOption, setSelectedOption] = useState("USD");
  const [show, setShow] = useState(false);

  const onSubmit = () => {
    fetch(
      `https://api.nbp.pl/api/exchangerates/rates/C/${selectedOption}/${historyData
        .toISOString()
        .slice(0, 10)}/?format=json`
    )
      .then((response) => response.json())
      .then((data) => {
        const rates = data.rates;
        const formattedData = rates.map((rate) => ({
          id: rate.currency,
          effectiveDate: rate.effectiveDate,
          bid: rate.bid,
          ask: rate.ask,
        }));
        setCurrencyData(formattedData);
      })
      .catch((error) => {
        console.error(error);
      });

    setHistoryData(new Date());
  };

  const toggleShow = () => {
    setShow(!show);
  };

  const onChange = (selectedDate) => {
    if (selectedDate instanceof Date) {
      setHistoryData(selectedDate);
    }
    toggleShow();
  };

  return (
    <div style={styles.container}>
      <div style={styles.form}>
        <div style={styles.label}>Wybierz walutę:</div>
        <select
          id="currency"
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          <option value="USD">Dolar amerykański</option>
          <option value="AUD">Dolar australijski</option>
          <option value="CAD">Dolar kanadyjski</option>
          <option value="EUR">Euro</option>
          <option value="HUF">Forint</option>
          <option value="CHF">Frank Szwajcarski</option>
          <option value="GBP">Funt Szterling</option>
          <option value="JPY">Jen</option>
          <option value="CZK">Korona czeska</option>
          <option value="SEK">Korona szwedzka</option>
          <option value="NOK">Korona norweska</option>
          <option value="DKK">Korona duńska</option>
          <option value="XDR">SDR (MFW)</option>
        </select>
        <label htmlFor="date">Wybierz datę:</label>
        <input
          type="date"
          id="date"
          value={historyData.toISOString().slice(0, 10)}
          onChange={(e) => setHistoryData(new Date(e.target.value))}
        />
        <button onClick={toggleShow} style={styles.input}>
          {historyData.toLocaleDateString()}
        </button>
        <button onClick={onSubmit} style={styles.button}>
          Sprawdź historię kursu
        </button>
      </div>

      <div style={styles.currencyBox}>
        <div style={styles.row}>
          <div style={styles.currency}>Data</div>
          <div style={styles.bid}>Sprzedaż</div>
          <div style={styles.ask}>Kupno</div>
        </div>
        {currencyData.length === 0 && (
          <div style={styles.row}>
            <div style={styles.none}>Brak danych</div>
          </div>
        )}
        {currencyData.map((rate) => (
          <div key={rate.effectiveDate} style={styles.row}>
            <div style={styles.currency}>{rate.effectiveDate}</div>
            <div style={styles.bid}>{rate.bid}</div>
            <div style={styles.ask}>{rate.ask}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#272727",
    alignItems: "center",
    boxSizing: "border-box",
  },
  logoBox: {
    width: "100%",
    height: "12%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    backgroundColor: "#383838",
  },
  currencyBox: {
    width: "95%",
    height: "20%",
    backgroundColor: "#0E6265",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 18,
  },
  currency: {
    color: "white",
    flex: 1,
    fontWeight: "bold",
    fontSize: 18,
  },
  none: {
    color: "white",
    flex: 2,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
  bid: {
    color: "white",
    flex: 1,
    fontWeight: "bold",
    textAlign: "right",
    fontSize: 18,
  },
  ask: {
    color: "white",
    flex: 1,
    fontWeight: "bold",
    textAlign: "right",
    fontSize: 18,
  },
  label: {
    fontSize: 16,
    color: "#ffffff",
    marginBottom: 5,
  },
  overlayStyle: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  sectionTextStyle: {
    fontSize: 18,
    color: "#ffffff",
    marginBottom: 10,
    fontWeight: "bold",
  },
  optionTextStyle: {
    fontSize: 16,
    color: "#000000",
  },
  cancelTextStyle: {
    fontSize: 16,
    color: "#ffffff",
  },
  form: {
    height: "33%",
    width: "60%",
    justifyContent: "space-between",
    marginBottom: 40,
  },
  input: {
    color: "#1e1e1e",
    backgroundColor: "transparent",
    borderColor: "#e0e0e0",
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    fontSize: 16,
    textAlign: "center",
    color: "#ffffff",
  },
  button: {
    backgroundColor: "#0EA4AA",
    borderRadius: 20,
    marginBottom: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  text: {
    color: "#fff",
    fontSize: 20,
  },
  button2: {
    backgroundColor: "#0EA4AA",
    borderRadius: 20,
    marginBottom: 10,
    width: 200,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
};

export default HistoryCurrency;
