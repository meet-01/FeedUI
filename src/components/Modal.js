import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Modal.css";
import Loader from "./Loader";

export default function Modal({ handleImageSelect }) {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");

  //fetching initial GIFs
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const results = await axios("https://api.giphy.com/v1/gifs/trending", {
          params: {
            api_key: "rE5C7sdzNytzyzZm9Pc3oUHWgl67mdOW",
          },
        });

        console.log(results.data.data);
        setData(results.data.data);
      } catch (error) {
        setIsError(error.message);
        console.log(error.message);
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  //GIFs rendering inside Modal and loading message until it fetches Data
  const renderGIFS = () => {
    if (isLoading) {
      return <Loader />;
    }
    return data.map((gif) => {
      return (
        <div key={gif.id} className="gif">
          <button
            type="button"
            className="modal_imageButton"
            onClick={() => handleImageSelect(gif.images.fixed_height.url)}
          >
            <img src={gif.images.fixed_height.url} alt="" />
          </button>
        </div>
      );
    });
  };
  //setting search Value
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  //Submitting search value
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (search === "") {
      const results = await axios("https://api.giphy.com/v1/gifs/trending", {
        params: {
          api_key: "rE5C7sdzNytzyzZm9Pc3oUHWgl67mdOW",
        },
      });

      console.log(results.data.data);
      setData(results.data.data);
      return;
    }

    setIsLoading(true);

    try {
      const results = await axios("https://api.giphy.com/v1/gifs/search", {
        params: {
          api_key: "rE5C7sdzNytzyzZm9Pc3oUHWgl67mdOW",
          q: search,
        },
      });

      setData(results.data.data);
      setSearch("");
    } catch (error) {
      setIsError(error.message);
      console.log(error.message);
    }

    setIsLoading(false);
  };

  //conditional return error message or GIFs
  return (
    <div className="modal">
      {isError ? (
        <h1>{isError}</h1>
      ) : (
        <>
          <form>
            <input
              className="search__form"
              value={search}
              onChange={handleSearch}
              type="text"
              placeholder="search your gif here.."
            />
            <button
              className="search__submit"
              onClick={handleSubmit}
              type="submit"
            >
              GO
            </button>
          </form>
          <div className="container gifs">{renderGIFS()}</div>
        </>
      )}
    </div>
  );
}
