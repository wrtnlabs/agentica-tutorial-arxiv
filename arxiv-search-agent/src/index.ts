import { Agentica } from "@agentica/core";
import typia from "typia";
import dotenv from "dotenv";
import { OpenAI } from "openai";

import { ArxivSearchService } from "@wrtnlabs/connector-arxiv-search";

dotenv.config();

export const agent = new Agentica({
  model: "chatgpt",
  vendor: {
    api: new OpenAI({
      apiKey: process.env.OPENAI_API_KEY!,
    }),
    model: "gpt-4o-mini",
  },
  controllers: [
    {
      name: "ArxivSearch Connector",
      protocol: "class",
      application: typia.llm.application<ArxivSearchService, "chatgpt">(),
      execute: new ArxivSearchService(),
    },
  ],
});

const main = async () => {
  console.log(
    await agent.conversate(
      "Search 10 arxiv papers from 2024 to 2025 that include AI keywords."
    )
  );
};

main();
