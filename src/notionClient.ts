import { Client } from "@notionhq/client";

const notion = new Client({
  auth: import.meta.env.VITE_NOTION_API_KEY,
});

export const createPost = async (title: string): Promise<any> => {
  const databaseId = import.meta.env.VITE_NOTION_DATABASE_ID;
  if (!databaseId) {
    throw new Error("Database ID is not defined");
  }

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
    },
  });

  return response;
};
