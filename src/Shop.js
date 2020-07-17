import React, { useState, useEffect } from "react";
import "./App.css";
import { Link } from "react-router-dom";

function Shop() {
  useEffect(() => {
    fetchItems();
  }, []);

  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    const items = await fetch(
      "https://api.covid19api.com/summary"
    ).then((res) => res.json());
    console.log(items.Countries);
    setItems(items.Countries);
  };

  return (
    <div>
      {items.map((item) => (
        <h1 key={item.Country}><Link to={`/shop/${item.Country}`}>{item.Country}</Link></h1>
      ))}
    </div>
  );
}

export default Shop;
