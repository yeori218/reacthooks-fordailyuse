import React, { useState, useEffect } from "react";
import ReactDom from "react-dom";
import Axios from "axios";
import "./styles.css";

function useInput(defaultValue) {
  const [value, setValue] = useState(defaultValue);

  const onChange = (e) => {
    const {
      target: { value }
    } = e;
    setValue(value);
  };
  return { value, onChange };
}

function useFetch(url) {
  const [payload, setPayload] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const callUrl = async () => {
    try {
      const { data } = await Axios.get(url);
      setPayload(data);
    } catch {
      setError("😭");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    callUrl();
  }, []);

  return { payload, loading, error };
}

function App() {
  const name = useInput("");
  const { payload, loading, error } = useFetch(
    "https://source.unsplash.com/WLUHO9A_xik/400x300"
  );
  return (
    <div className="App">
      <h1>React Hooks for daily use - Input, Fetch </h1>
      <br />
      <input {...name} placeholder="Whats your name" />
      <br />
      {loading && <span>loading your image</span>}
      <br />
      {!loading && error && <span>{error}</span>}
      <br />
      {!loading && payload && (
        <img src="https://source.unsplash.com/WLUHO9A_xik/400x300" />
      )}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDom.render(<App />, rootElement);
