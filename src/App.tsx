import React, { useState, useEffect } from "react";
import { createPost, updatePost } from "./notionClient";
import "./App.css";

const App: React.FC = () => {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [notionUrl, setNotionUrl] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [databaseId, setDatabaseId] = useState<string | null>(null);
  const [step, setStep] = useState<"setup" | "search" | "resolve">("setup");

  useEffect(() => {
    // ポップアップが開かれたときに状態を復元
    chrome.storage.session.get(
      ["notionApiKey", "notionDatabaseId", "notionUrl"],
      (result) => {
        if (result.notionApiKey && result.notionDatabaseId) {
          setApiKey(result.notionApiKey);
          setDatabaseId(result.notionDatabaseId);
          if (result.notionUrl) {
            setNotionUrl(result.notionUrl);
            setStep("resolve");
          } else {
            setStep("search");
          }
        }
      }
    );
  }, []);

  const handleSaveConfig = () => {
    if (apiKey && databaseId) {
      chrome.storage.session.set(
        { notionApiKey: apiKey, notionDatabaseId: databaseId },
        () => {
          setStep("search");
        }
      );
    }
  };

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const notionUrl = await createPost(inputText, apiKey!, databaseId!);
      setNotionUrl(notionUrl);
      // 検索ボタン押下後のポップアップ画面内容を保存
      chrome.storage.session.set({ notionUrl });
      // Google検索の処理を新しいタブで実行
      window.open(
        `https://www.google.com/search?q=${encodeURIComponent(inputText)}`,
        "_blank"
      );
      setStep("resolve");
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
        await updatePost(pageId, apiKey!);
        window.open(notionUrl, "_blank");
        // 状態をクリア
        chrome.storage.session.remove("notionUrl");
        setNotionUrl(null);
        setStep("search");
      }
    }
  };

  if (step === "setup") {
    return (
      <div className="setup-container">
        <h1>Notion設定</h1>
        <input
          type="text"
          value={apiKey || ""}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Notion API Key"
        />
        <input
          type="text"
          value={databaseId || ""}
          onChange={(e) => setDatabaseId(e.target.value)}
          placeholder="Notion Database ID"
        />
        <button onClick={handleSaveConfig}>保存</button>
      </div>
    );
  }

  if (step === "search") {
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
      </div>
    );
  }

  if (step === "resolve") {
    return (
      <div className="resolve-container">
        <h1>Error検索中</h1>
        {notionUrl && <button onClick={handleResolve}>解決</button>}
      </div>
    );
  }

  return null;
};

export default App;
