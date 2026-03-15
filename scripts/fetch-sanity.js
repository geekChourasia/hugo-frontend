require("dotenv").config();

const fs = require("fs");
const path = require("path");
const { createClient } = require("@sanity/client");
const { toHTML } = require("@portabletext/to-html");

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: "2023-01-01",
  useCdn: false,
});

async function fetchPosts() {
  const query = `
  *[_type == "blogPost"]{
    title,
    "slug": slug.current,
    excerpt,
    publishDate,
    body,
    "category": category->{
      title,
      "slug": slug.current
    },
    "author": author->{
      name,
      "slug": slug.current
    }
  }`;

  const posts = await client.fetch(query);

  const postsDir = path.join(__dirname, "../content/posts");

  if (!fs.existsSync(postsDir)) {
    fs.mkdirSync(postsDir, { recursive: true });
  }

  posts.forEach((post) => {
    const htmlContent = toHTML(post.body || []);

const markdown = `---
title: "${post.title}"
date: "${post.publishDate}"
excerpt: "${post.excerpt || ""}"
categories: ["${post.category?.slug || ""}"]
authors: ["${post.author?.slug || ""}"]
---



${htmlContent}
`;

    fs.writeFileSync(path.join(postsDir, `${post.slug}.md`), markdown);
  });

  console.log("Posts synced from Sanity ✅");
}

fetchPosts();
