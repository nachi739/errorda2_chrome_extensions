import React, { useState, useEffect } from "react";
import { createPost, updatePost } from "./notionClient";
import {
  Container,
  PasswordInput,
  Button,
  Title,
  LoadingOverlay,
  Textarea,
  Space,
  Flex,
  Text,
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

  const handleResetKeys = () => {
    setApiKey("");
    setDatabaseId("");
    setStep("setup");
  };

  if (step === "setup") {
    return (
      <Container style={{ width: "300px", height: "250px" }}>
        <Title order={2}>Notion設定</Title>

        <PasswordInput
          variant={"filled"}
          radius={"lg"}
          label="NOTION_TOKEN"
          withAsterisk
          value={apiKey || ""}
          onChange={(e) => setApiKey(e.currentTarget.value)}
          placeholder="NOTION_TOKEN"
          mb={20}
        />
        <PasswordInput
          variant={"filled"}
          radius={"lg"}
          label="NOTION_DATABASE_ID"
          withAsterisk
          value={databaseId || ""}
          onChange={(e) => setDatabaseId(e.currentTarget.value)}
          placeholder="NOTION_DATABASE_ID"
          mb={20}
        />
        <Flex justify={"flex-end"} align={"center"} direction={"row"}>
          <Button variant={"default"} radius={"lg"} onClick={handleSaveConfig}>
            保存
          </Button>
        </Flex>
      </Container>
    );
  }

  if (step === "search") {
    return (
      <Container style={{ width: "300px", height: "250px" }}>
        <Flex
          gap={"xl"}
          justify={"flex-start"}
          align={"center"}
          direction={"row"}
        >
          <Title order={2}>Error検索</Title>
          <Button
            color={"red.6"}
            variant={"subtle"}
            size={"sm"}
            onClick={handleResetKeys}
          >
            Key-reset
          </Button>
        </Flex>
        <Space h="lg" />
        <Textarea
          variant={"filled"}
          size={"xl"}
          radius={"md"}
          value={inputText}
          onChange={(e) => setInputText(e.currentTarget.value)}
          placeholder="検索キーワードを入力"
          disabled={isLoading || notionUrl !== null}
          mt="lg"
        />
        <Space h="xl" />
        {!notionUrl && (
          <Flex justify={"flex-end"}>
            <Button
              radius={"lg"}
              onClick={handleSearch}
              disabled={notionUrl !== null}
              loading={isLoading}
              loaderProps={{ type: "dots" }}
            >
              検索
            </Button>
          </Flex>
        )}
      </Container>
    );
  }

  if (step === "resolve") {
    return (
      <Container style={{ width: "300px", height: "250px" }}>
        <Space h="sm" />
        <Title order={2}>Error 検索中</Title>
        <Space h="sm" />
        <Text>・発生したErrorMessageの詳細</Text>
        <Text>・Error発生時の具体的な操作や状況</Text>
        <Text>・Errorの原因と考えられる要因</Text>
        <Text>・Errorの解決策・実施手順</Text>
        <Text>・参考にした資料やリンク情報</Text>
        <Space h="sm" />
        {notionUrl && (
          <Flex justify={"flex-end"}>
            <Button color="red.7" radius={"lg"} onClick={handleResolve}>
              解決
            </Button>
          </Flex>
        )}
      </Container>
    );
  }

  return null;
};

export default App;
