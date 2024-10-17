import React, { useState, useEffect } from "react";
import { createPost, updatePost } from "./notionClient";
import "./App.css";

const App: React.FC = () => {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [notionUrl, setNotionUrl] = useState<string | null>(null);

  useEffect(() => {
    // ポップアップが開かれたときに状態を復元
    chrome.storage.local.get(
      ["notionUrl"],
      (result: { notionUrl?: string }) => {
        if (result.notionUrl) {
          setNotionUrl(result.notionUrl);
        }
      }
    );
  }, []);

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const notionUrl = await createPost(inputText);
      setNotionUrl(notionUrl);
      // 検索ボタン押下後のポップアップ画面内容を保存
      chrome.storage.local.set({ notionUrl });
      // Google検索の処理を新しいタブで実行
      window.open(
        `https://www.google.com/search?q=${encodeURIComponent(inputText)}`,
        "_blank"
      );
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResolve = async () => {
    if (notionUrl) {
      const pageId = notionUrl.split("/").pop()?.replace(/-/g, "");
      if (pageId) {
        await updatePost(pageId);
        window.open(notionUrl, "_blank");
        // 検索画面に戻すため保存した内容を削除
        chrome.storage.local.remove("notionUrl");
        setNotionUrl(null);
      }
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
        disabled={isLoading || notionUrl !== null}
      />
      {!notionUrl && (
        <button
          onClick={handleSearch}
          disabled={isLoading || notionUrl !== null}
        >
          {isLoading ? "検索中..." : "検索"}
        </button>
      )}
      {notionUrl && <button onClick={handleResolve}>解決</button>}
    </div>
  );
};

export default App;
