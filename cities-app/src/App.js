import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import "./cities.css";

const Cities = () => {
  const [cities, setCities] = useState([
    { id: 1, name: "Los Angeles", country: "USA", population: "8.4M" },
    { id: 2, name: "Dallas", country: "USA", population: "14M" },
    { id: 3, name: "Bangalore", country: "India", population: "2.1M" },
  ]);

  return (
    <Router>
      <div className="container">
        <h1>Cities</h1>
        <nav>
          {[
            { path: "/", label: "Cities List" },
            { path: "/add-city", label: "Add City" },
          ].map((navItem, index) => (
            <Link key={index} to={navItem.path}>
              {navItem.label}
            </Link>
          ))}
        </nav>
        <Routes>
          <Route path="/" element={<CityList cities={cities} />} />
          <Route path="/add-city" element={<AddCity setCities={setCities} cities={cities} />} />
          <Route path="/city/:id" element={<CityDetails cities={cities} />} />
        </Routes>
      </div>
    </Router>
  );
};

const CityList = ({ cities }) => (
  <div className="city-list">
    <h2>City List</h2>
    <ul>
      {cities.map(({ id, name }) => (
        <li key={id}>
          <Link to={`/city/${id}`}>{name}</Link>
        </li>
      ))}
    </ul>
  </div>
);

const AddCity = ({ setCities, cities }) => {
  const [inputs, setInputs] = useState({ name: "", country: "", population: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newId = cities.length > 0 ? cities[cities.length - 1].id + 1 : 1;
    setCities((prevCities) => [...prevCities, { id: newId, ...inputs }]);
    navigate("/");
  };

  return (
    <div className="form-container">
      <h2>Add a New City</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={inputs.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Country:
          <input
            type="text"
            name="country"
            value={inputs.country}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Population:
          <input
            type="text"
            name="population"
            value={inputs.population}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Add City</button>
      </form>
    </div>
  );
};

const CityDetails = ({ cities }) => {
  const { id } = useParams();
  const city = cities.find((c) => c.id.toString() === id); 

  if (!city) {
    return <div>City not found</div>;
  }

  return (
    <div className="city-details">
      <h2>City Details</h2>
      <div>
        <strong>Name:</strong> {city.name}
      </div>
      <div>
        <strong>Country:</strong> {city.country}
      </div>
      <div>
        <strong>Population:</strong> {city.population}
      </div>
    </div>
  );
};

export default Cities;
