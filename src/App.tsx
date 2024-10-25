import React, { useState, useEffect } from "react";
import { createPost, updatePost } from "./notionClient";
import {
  Container,
  TextInput,
  Button,
  Title,
  LoadingOverlay,
  Textarea,
} from "@mantine/core";

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

  const containerStyles = {
    width: 120,
  };

  if (step === "setup") {
    return (
      <>
        <Container>
          <Title order={2}>Notion設定</Title>

          <TextInput
            variant="filled"
            label="NOTION_TOKEN"
            value={apiKey || ""}
            onChange={(e) => setApiKey(e.currentTarget.value)}
            placeholder="NOTION_TOKEN"
          />
          <TextInput
            variant="filled"
            label="NOTION_DATABASE_ID"
            value={databaseId || ""}
            onChange={(e) => setDatabaseId(e.currentTarget.value)}
            placeholder="NOTION_DATABASE_ID"
          />
          <Button onClick={handleSaveConfig}>保存</Button>
        </Container>
      </>
    );
  }

  if (step === "search") {
    return (
      <Container>
        <Title order={2}>Error検索</Title>
        <Textarea
          value={inputText}
          onChange={(e) => setInputText(e.currentTarget.value)}
          placeholder="検索キーワードを入力"
          disabled={isLoading || notionUrl !== null}
          mt="lg"
        />
        {!notionUrl && (
          <Button
            onClick={handleSearch}
            disabled={isLoading || notionUrl !== null}
            className="button"
          >
            {isLoading ? "検索中..." : "検索"}
          </Button>
        )}
        <LoadingOverlay visible={isLoading} />
      </Container>
    );
  }

  if (step === "resolve") {
    return (
      <Container style={containerStyles}>
        <Title order={2}>Error 検索中</Title>
        {notionUrl && (
          <Button onClick={handleResolve} className="button">
            解決
          </Button>
        )}
      </Container>
    );
  }

  return null;
};

export default App;
