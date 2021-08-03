import { useDispatch } from "react-redux";
import { useState } from "react";
import { filterPizzas } from "../../redux/actions/pizzaActions";
import AOS from "aos";

import "./filter.styles.css";

export default function Filter() {
  AOS.init({
    duration: 600,
  });
  const [searchKey, setSearchKey] = useState("");
  const [category, setCategor] = useState("all");

  const dispatch = useDispatch();

  function handleFilter() {
    dispatch(filterPizzas(searchKey, category));
  }

  return (
    <div data-aos="fade-down" className="container">
      <div className="custom-align d-flex justify-content-around shadow-md">
        <div className="col-md-3 w-100 p-2">
          <input
            className="form-control w-100"
            placeholder="search"
            type="text"
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
          />
        </div>
        <div className="col-md-3 w-100 p-2">
          <select
            className="form-control w-100"
            value={category}
            onChange={(e) => setCategor(e.target.value)}
          >
            <option value="all">All</option>
            <option value="veg">Veg</option>
            <option value="nonveg">Non-Veg</option>
          </select>
        </div>
        <div className="col-md-3 w-100 p-2">
          <button className="shake-btn btn w-100" onClick={handleFilter}>
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
