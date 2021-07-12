import React from "react";
import "../MessageSender.css";
import { Avatar } from "@material-ui/core";
import GifIcon from "@material-ui/icons/Gif";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { useState } from "react";
import db from "../firebase";
import firebase from "firebase";
import Modal from "./Modal";

export default function MessageSender() {
  const [input, setInput] = useState("");

  const [imageURL, setImagesURL] = useState("");
  const [isGifAreaOpen, setIsGifAreaOpen] = useState(false);

  const toggleIsGifAreaOpen = () => {
    setIsGifAreaOpen(!isGifAreaOpen);
  };
  const handleImageSelect = (url) => {
    setImagesURL(url);
    toggleIsGifAreaOpen();
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (input.trim().length > 0) {
      db.collection("posts").add({
        message: input,
        imageURL: imageURL,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }

    console.log("hola");
    setInput("");
    setImagesURL("");
  };
  return (
    <div className="messageSender">
      <div className="messageSender__top">
        <Avatar />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="messageSender__input"
            placeholder={`Write something here..`}
          />
          <button onClick={handleSubmit} type="submit" className="submitPost">
            <ChevronRightIcon />
          </button>
        </form>
      </div>
      {imageURL && (
        <div className="messageSender_imageWrapper">
          <img src={imageURL} alt="" className="messageSender__image" />
        </div>
      )}
      <div className="messageSender__bottom">
        <button
          type="button"
          className="messageSender__option"
          onClick={toggleIsGifAreaOpen}
        >
          <GifIcon style={{ color: "blue" }} />
          <h3>Insert GIF</h3>
        </button>
      </div>
      {isGifAreaOpen && <Modal handleImageSelect={handleImageSelect} />}
    </div>
  );
}
