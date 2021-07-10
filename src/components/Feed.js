import React, { useEffect, useState } from "react";
import "../Feed.css";
import MessageSender from "./MessageSender";
import Post from "./Post";

import db from "../firebase";

export default function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setPosts(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })))
      );
  }, []);

  return (
    <div className="feed">
      <MessageSender />

      {posts.map((post) => (
        <Post
          key={post.id}
          message={post.data.message}
          timestamp={post.data.timestamp}
          image={post.data.imageURL}
        />
      ))}
    </div>
  );
}
