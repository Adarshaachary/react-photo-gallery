# React Photo Gallery

A dark, responsive photo gallery built with React, Vite, Tailwind CSS, and the Pixabay API. Browse popular photography, search by Pixabay photographer username, load more results, and save favorite photos locally in your browser.

## Features

- Explore popular Pixabay photos in a responsive gallery
- Search photos by photographer username
- Pagination with a **Load more photos** button
- Save and remove favorites from the Saved view
- Favorites persist in `localStorage`
- Loading skeletons, empty states, retry handling, and reduced-motion support
- Express backend proxy that keeps the Pixabay API key out of the browser
- One-day in-memory response caching on the backend

## Tech stack

- React 19
- Vite
- Tailwind CSS
- Express 5
- Pixabay API
- Oxlint

## Prerequisites

- Node.js 18 or newer
- A Pixabay API key from [pixabay.com/api/docs](https://pixabay.com/api/docs/)

## Getting started

1. Clone the repository and install dependencies:

   ```bash
   git clone https://github.com/Adarshaachary/react-photo-gallery.git
   cd react-photo-gallery
   npm install
   ```

2. Create a local environment file:

   ```bash
   cp .env.example .env
   ```

3. Set your Pixabay key in `.env`:

   ```env
   PIXABAY_API_KEY=your_pixabay_api_key
   PORT=3001
   ```

   Keep `.env` private and never commit your API key.

4. Start the Express API and Vite development server in separate terminals:

   ```bash
   npm start
   npm run dev
   ```

5. Open the Vite URL shown in the terminal, usually `http://localhost:5173`.

The Vite development server proxies `/api` requests to the backend at `http://localhost:3001`.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm start` | Start the Express API server |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run Oxlint |

## API endpoint

The backend exposes `GET /api/photos` and forwards requests to Pixabay.

| Query parameter | Default | Description |
| --- | --- | --- |
| `page` | `1` | Result page |
| `per_page` | `200` | Number of results, capped at 200 |
| `order` | `popular` | Use `popular` or `latest` |
| `username` | — | Optional Pixabay photographer username |

Example:

```text
http://localhost:3001/api/photos?page=1&per_page=20&username=example_user
```

## Project structure

```text
src/
├── components/     Gallery, photo cards, and search UI
├── hooks/          Photo-fetching and pagination logic
├── reducers/       Favorites state management
├── App.jsx         Main application layout and interactions
└── index.css       Tailwind layers and global styles
server/
└── index.js        Express Pixabay proxy and response cache
```

## Attribution

Photos are provided by [Pixabay](https://pixabay.com/).