# WriterStack
**The Headless CMS for Performance Obsessed Teams**

[![Product Hunt](https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=YOUR_POST_ID&theme=light)](https://www.producthunt.com/posts/YOUR_POST_ID)

WriterStack is a modern, high-performance Headless CMS and blogging platform built for developers who care about speed, design, and flexibility. 

Whether you need a **personal portfolio** hosted at `writerstack.com/you` or a robust **Headless CMS** to power your company's heavy-traffic engineering blog, WriterStack provides the tools you need to ship faster.

## Features

- **Headless Architecture**: Fetch your content via our globally distributed, edge-cached REST API.
- **Real-time Analytics 2.0**: Track views, API hits, and visitor engagement statistics instantly.
- **Secure by Default**: Enterprise-grade security with API keys, per-user isolation, and encrypted storage.
- **Notion-style Editor**: A beautiful, distraction-free writing experience with full Markdown support.
- **Public Blogs**: Every user gets a free, zero-config public blog at `writerstack.com/username`.
- **Framework Agnostic**: Works seamlessly with Next.js, React, Vue, Svelte, or any HTTP-capable client.

## Tech Stack

Built with the latest and greatest web technologies:

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Database**: [MongoDB](https://www.mongodb.com/) (Mongoose)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Icons**: [Lucide React](https://lucide.dev/)

## Getting Started

To run the WriterStack platform locally for development:

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/writerstack-saas.git
   cd writerstack-saas
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory and add your MongoDB URI, NextAuth secret, and other config keys.

4. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Use Cases

### For Personal Portfolios
Launch a professional blog in seconds. No coding required.
- **Your own URL**: `writerstack.com/you`
- **Built-in SEO**: Automatic meta tags and sitemaps.
- **Zero Config**: Just sign up and start writing.

### For Engineering Teams
Use WriterStack as your Headless CMS.
- **API-First**: `GET /api/v1/articles` to fetch content.
- **Custom Frontend**: Render articles on your own corporate site (`yourcompany.com/blog`) using your own components and branding.
- **Team Collaboration**: Shared workspaces and editor roles.

---

Designed with love for the [Product Hunt](https://www.producthunt.com/) community.
