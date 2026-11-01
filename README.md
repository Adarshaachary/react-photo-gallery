# React Photo Gallery

A modern, responsive photo gallery application built with React. Explore beautiful photographs, search for images by photographer, and save your favourite photos to a personal collection.

## Features

- **Photo Gallery:** Browse a collection of photographs in a responsive grid layout.
- **Search by Photographer:** Find photos using photographer names.
- **Favourites:** Add or remove photos from your favourites.
- **Saved Photos:** View all your favourite photos in a separate section.
- **Persistent Storage:** Favourites remain saved even after refreshing the page using Local Storage.
- **Responsive Design:** Optimized for desktop, tablet, and mobile devices.
- **Loading & Error Handling:** User-friendly loading indicators and error messages.
- **Modern UI:** Clean dark-themed interface with smooth animations and interactive elements.

## Tech Stack

**Frontend**
- React.js
- Vite
- JavaScript (ES6+)
- HTML5
- CSS3
- Tailwind CSS (if used in your implementation)

**Backend**
- Node.js
- Express.js

**API & Storage**
- Pixabay API – Fetching photographs.
- Browser Local Storage – Persisting favourite photos.

## React Concepts Used

- `useState` – Managing component state.
- `useEffect` – Handling side effects and data fetching.
- `useReducer` – Managing favourite photo actions.
- `useCallback` – Optimizing callback functions.
- `useMemo` – Optimizing filtered photo lists.
- Custom Hooks – Reusing photo-fetching logic.

## Project Structure

```text
react-photo-gallery/
│
├── client/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── hooks/
│       ├── App.jsx
│       ├── main.jsx
│       └── index.css
│
├── server/
│   └── index.js
│
├── .gitignore
├── package.json
└── README.md
```

*Note: The structure above is illustrative. Adjust it to match your actual project folders and filenames.*

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/Adarshaachary/react-photo-gallery.git
```

### 2. Navigate to the project directory

```bash
cd react-photo-gallery
```

### 3. Install dependencies

```bash
npm install
```

If your project has separate frontend and backend dependencies, install those as configured in your project.

### 4. Configure environment variables

Create a `.env` file in the appropriate backend directory and add your Pixabay API key:

```env
PIXABAY_API_KEY=your_pixabay_api_key
```

Replace `your_pixabay_api_key` with your actual API key.

**Important:** Never upload your `.env` file or expose your API key publicly.

### 5. Run the application

Use the development commands configured in your `package.json`.

For example, if your project has separate frontend and backend scripts:

```bash
npm run dev:server
```

In another terminal:

```bash
npm run dev:client
```

Open the local URL displayed by Vite in your browser.

## API

This project uses the [Pixabay API](https://pixabay.com/api/docs/) to retrieve photographs.

The application uses the API to search for photographs and display information such as image previews and photographer names.

## Future Improvements

- Add pagination or infinite scrolling.
- Add more image categories and filters.
- Improve image loading performance.
- Add additional gallery customization options.

## Author

**Adarsh Acharya**

- GitHub: [Adarshaachary](https://github.com/Adarshaachary)
- LinkedIn: [Adarsh Acharya](https://linkedin.com/in/adarsh-acharya548)

---

If you find this project interesting, feel free to explore the repository!
