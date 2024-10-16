import React, { useState } from "react";
import { createPost } from "./notionClient";
import "./App.css";

const App: React.FC = () => {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const notionUrl = await createPost(inputText);
      console.log("Post created:", notionUrl);
      // Google検索の処理を追加
      // window.open(`https://www.google.com/search?q=${inputText}`);
      window.open(notionUrl);
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="search-container">
      <h1>Error検索</h1>
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="検索キーワードを入力"
      />
      <button onClick={handleSearch} disabled={isLoading}>
        {isLoading ? "投稿中..." : "検索"}
      </button>
    </div>
  );
};

export default App;
