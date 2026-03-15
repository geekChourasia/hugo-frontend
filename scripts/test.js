require("dotenv").config();
const { createClient } = require("@sanity/client");

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: "2023-01-01",
  useCdn: false,
});

async function test() {
  const query = `
  *[_type == "blogPost"] | order(publishDate desc){
    title,
    "slug": slug.current,
    excerpt,
    publishDate,

    "heroImage": heroImage.asset->url,

    "category": category->title,
    "categorySlug": category->slug.current,

    "author": author->name,
    "authorSlug": author->slug.current,

    body
  }
  `;

  const result = await client.fetch(query);

  console.log(result);
}

test();
