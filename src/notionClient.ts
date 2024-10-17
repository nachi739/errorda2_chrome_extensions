import { Client } from "@notionhq/client";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Tokyo");

const notion = new Client({
  auth: import.meta.env.VITE_NOTION_API_KEY,
});

export const createPost = async (title: string): Promise<any> => {
  const databaseId = import.meta.env.VITE_NOTION_DATABASE_ID;
  if (!databaseId) {
    throw new Error("Database ID is not defined");
  }

  // 現在の日時を取得（検索開始時の時刻）
  const timestamp = dayjs.tz().format("YYYY-MM-DD HH:mm:ssZ");

  const response = await notion.pages.create({
    parent: { database_id: databaseId },
    properties: {
      Title: {
        title: [
          {
            text: {
              content: title,
            },
          },
        ],
      },
      "Start time": {
        date: {
          start: timestamp,
        },
      },
    },
  });

  // NotionページのURLを生成
  const pageId = response.id.replace(/-/g, "");
  const notionUrl = `https://www.notion.so/${pageId}`;

  return notionUrl;
};

export const updatePost = async (pageId: string): Promise<void> => {
  // 現在の日時を取得（検索終了時の時刻）
  const timestamp = dayjs.tz().format("YYYY-MM-DD HH:mm:ssZ");

  await notion.pages.update({
    page_id: pageId,
    properties: {
      "End time": {
        date: {
          start: timestamp,
        },
      },
    },
  });
};
