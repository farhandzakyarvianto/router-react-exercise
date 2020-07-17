import React, { useState, useEffect } from "react";
import "./App.css";
import { Link } from "react-router-dom";

//return an array of objects according to key, value, or key and value matching
function getObjects(obj, key, val) {
  var objects = [];
  for (var i in obj) {
    if (!obj.hasOwnProperty(i)) continue;
    if (typeof obj[i] == "object") {
      objects = objects.concat(getObjects(obj[i], key, val));
    }
    //if key matches and value matches or if key matches and value is not passed (eliminating the case where key matches but passed value does not)
    else if ((i == key && obj[i] == val) || (i == key && val == "")) {
      //
      objects.push(obj);
    } else if (obj[i] == val && key == "") {
      //only add if the object is not already in the array
      if (objects.lastIndexOf(obj) == -1) {
        objects.push(obj);
      }
    }
  }
  return objects;
}

//return an array of values that match on a certain key
function getValues(obj, key) {
  var objects = [];
  for (var i in obj) {
    if (!obj.hasOwnProperty(i)) continue;
    if (typeof obj[i] == "object") {
      objects = objects.concat(getValues(obj[i], key));
    } else if (i == key) {
      objects.push(obj[i]);
    }
  }
  return objects;
}

//return an array of keys that match on a certain value
function getKeys(obj, val) {
  var objects = [];
  for (var i in obj) {
    if (!obj.hasOwnProperty(i)) continue;
    if (typeof obj[i] == "object") {
      objects = objects.concat(getKeys(obj[i], val));
    } else if (obj[i] == val) {
      objects.push(i);
    }
  }
  return objects;
}

function ItemDetail({ match }) {
  useEffect(() => {
    fetchItem();
    // console.log(match);
  }, []);

  const [item, setItem] = useState({});

  const fetchItem = async () => {
    const fetchItem = await fetch(
      `https://api.covid19api.com/summary`
    ).then((res) => res.json());

    // console.log(getObjects(fetchItem.Countries, "Country", match.params.id)[0]);
    setItem(getObjects(fetchItem.Countries, "Country", match.params.id)[0]);
  };

  var cts = item.Date,
      cdate = (new Date(cts)).toString();

  return (
    <div>
      <h1>
        {item.Country} - {item.CountryCode}
      </h1>
      <h3>{cdate}</h3>
      <h2>New Confirmed: {item.NewConfirmed}</h2>
      <h2>New Death : {item.NewDeaths}</h2>
      <h2>New Recovered: {item.NewRecovered}</h2>
      <h2>Total Confirmed: {item.TotalConfirmed}</h2>
      <h2>Total Death: {item.TotalDeaths}</h2>
      <h2>Total Recovered: {item.TotalRecovered}</h2>
    </div>
  );
}

export default ItemDetail;
