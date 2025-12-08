# WriterStack CMS

A modern, full-featured Content Management System built for speed and flexibility. Manage your articles with a rich text editor and deploy with confidence.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## 🚀 Features

-   **Dashboard Overview**: Get quick insights into your content performance.
-   **Rich Text Editor**: Integrated Quill editor for seamless writing experiences.
-   **Article Management**: Create, edit, publish, and delete articles efficiently.
-   **Secure Authentication**: Powered by Supabase for robust user management.
-   **Responsive Design**: Fully responsive interface built with Tailwind CSS.
-   **Instant Feedback**: Real-time toast notifications for user actions.

## 🛠️ Tech Stack

-   **Frontend Framework**: React 19
-   **Build Tool**: Vite
-   **Styling**: Tailwind CSS v4
-   **Routing**: React Router DOM v7
-   **Backend / Database**: Supabase
-   **Icons**: React Icons
-   **Editor**: React Quill New

## 🏁 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

Ensure you have the following installed:

-   Node.js (v18 or higher)
-   npm (v9 or higher)

### Installation

1.  **Clone the repository**

    ```bash
    git clone https://github.com/yourusername/cms-web-app.git
    cd cms-web-app
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Environment Setup**

    Create a `.env` file in the root directory and add your Supabase credentials:

    ```env
    VITE_SUPABASE_URL=your_supabase_url
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

    > **Note**: You can find these keys in your Supabase project settings.

4.  **Run the development server**

    ```bash
    npm run dev
    ```

    Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

## 📦 Building for Production

To create a production build:

```bash
npm run build
```

The output will be in the `dist` directory, ready for deployment.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
