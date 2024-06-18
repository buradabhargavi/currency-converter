import React, { useEffect, useState } from "react";

function Currency() {
  const [amt, setAmt] = useState(0);
  const [input, setInput] = useState(1);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetch(
          `https://api.frankfurter.app/latest?amount=${input}&from=${from}&to=${to}`
        );
        if (!data.ok) {
          throw new Error("something went wrong");
        }
        const changedCurrency = await data.json();
        console.log(changedCurrency.rates[to]);
        setAmt(changedCurrency.rates[to]);
      } catch (error: any) {
        setError(error.message);
      }
      setIsLoading(false);
    };

    if (from === to) return setAmt(input);
    fetchData();
  }, [input, to, from]);

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={(e) => {
          setInput(Number(e.target.value));
        }}
        disabled={isLoading}
      ></input>
      <select
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={to}
        onChange={(e) => setTo(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>OUTPUT:{error ? error : `${amt} ${to}`}</p>
    </div>
  );
}

export default Currency;
