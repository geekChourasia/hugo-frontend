# hugo-frontend
# Hugo Frontend – Sanity Powered Blog

This repository contains the **Hugo frontend** for a blog website that uses **Sanity CMS as the content backend**.

The site is built using **Hugo (a static site generator)** and content is fetched from **Sanity CMS**, then converted into Markdown files used by Hugo.

---

## Tech Stack

* **Hugo** – Static site generator
* **Sanity CMS** – Headless CMS for managing blog content
* **Node.js** – Used to fetch content from Sanity
* **SCSS** – Styling for the frontend

---

## Project Structure

```
hugo-frontend
│
├── content/            # Markdown blog posts generated from Sanity
│   └── posts/
│
├── layouts/            # Hugo HTML templates
│
├── assets/             # SCSS and frontend assets
│
├── static/             # Static files (images, favicon, etc.)
│
├── scripts/            # Script to fetch posts from Sanity
│
├── config.toml         # Hugo configuration
│
└── hugo.toml
```

---

## How Content Works

Content is managed in **Sanity CMS** and then synced to Hugo.

Workflow:

```
Sanity CMS
   ↓
Sanity API
   ↓
Node script fetches posts
   ↓
Markdown files generated in content/posts
   ↓
Hugo builds static website
```

---

## Setup Instructions

### 1. Install dependencies

```
npm install
```

---

### 2. Environment variables

Create a `.env` file:

```
SANITY_PROJECT_ID=your_project_id
SANITY_DATASET=production
```

---

### 3. Fetch content from Sanity

Run the script to generate Markdown posts:

```
node scripts/fetchPosts.js
```

This will create Markdown files in:

```
content/posts/
```

---

### 4. Run Hugo locally

```
hugo server
```

The site will run at:

```
http://localhost:1313
```

---

## Deployment

The Hugo site can be deployed using:

* Netlify
* Vercel
* GitHub Pages

Build command:

```
hugo
```

Publish directory:

```
public
```

---

## Project Walkthrough

Video demo of the project:

[Download / Watch Video](./video/walkthrough.mp4)

## Related Repository

Sanity CMS repository:

```
sanity-blog-cms
```

This repository contains schemas and configuration for the CMS.

---

## Author

Abhishek Chourasia
