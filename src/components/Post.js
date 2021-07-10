import React from "react";
import { Avatar } from "@material-ui/core";

import "../Post.css";

export default function Post({ image, timestamp, message }) {
  return (
    <div className="post">
      <div className="post__top">
        <Avatar className="post__avatar" />
        <div className="post__topInfo">
          <p>Time : {new Date(timestamp?.toDate()).toUTCString()}</p>
        </div>
      </div>
      {message && (
        <div className="post__bottom">
          <p>{message}</p>
        </div>
      )}
      {image && (
        <div className="post__image">
          <img src={image} alt="" />
        </div>
      )}
    </div>
  );
}
