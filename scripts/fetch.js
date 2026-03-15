import fs from "fs";
import dotenv from "dotenv";
import { createClient } from "@sanity/client";

dotenv.config();

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: "2024-01-01",
  useCdn: false,
});

const query = `
*[_type == "blogPost"]{
  title,
  slug,
  excerpt,
  publishDate,
  "author": author->name,
  "category": category->title
}
`;

async function run() {
  const posts = await client.fetch(query);

  posts.forEach((post) => {
    const content = `---
title: "${post.title}"
date: ${post.publishDate}
author: "${post.author}"
categories: ["${post.category}"]
description: "${post.excerpt}"
---

${post.excerpt}
`;

    fs.writeFileSync(`content/posts/${post.slug.current}.md`, content);

    console.log("Created:", post.slug.current);
  });
}

run();
