# Bhagavad Gita – Sacred Wisdom

A simple and interactive Bhagavad Gita website built using HTML, CSS, JavaScript, Bootstrap, and the Vedic Scriptures API.

The website allows users to explore the 18 chapters of the Bhagavad Gita and read Sanskrit verses, transliterations, and translations through a clean, book-inspired user interface.

## Features

- **Book-style UI:** A spiritual book cover with a traditional design.
- **18 Chapters:** Browse the chapters of the Bhagavad Gita.
- **Verse Reading:** Read Sanskrit verses, transliteration, and available translations.
- **API Integration:** Fetch chapter and verse data from the Vedic Scriptures API.
- **Responsive Design:** Supports desktop and mobile screens.
- **Interactive Navigation:** Move between the cover, chapter list, and verses.
- **Loading and Error Messages:** Displays messages when data is loading or cannot be fetched.
- **Faster Verse Loading:** Fetches verses in small batches.
- **Bootstrap Layout:** Uses Bootstrap for responsive grid layouts.

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Bootstrap
- Fetch API
- Vedic Scriptures API

## API Used

Base URL:

`https://vedicscriptures.github.io`

Endpoints used:

- Get all chapters: `/chapters/`
- Get chapter details: `/chapter/{chapter_number}`
- Get a specific verse: `/slok/{chapter_number}/{verse_number}`

Example:

`https://vedicscriptures.github.io/slok/1/1`

API responses provide the available Sanskrit verse, transliteration, and translation information.

## Project Structure

```text
bhagavad-gita/
├── index.html
├── README.md
└── assests/
    ├── css/
    │   ├── bootstrap.min.css
    │   └── style.css
    ├── js/
    │   └── script.js
    └── images/
        └── BHAGAWAD-GITA-IMG2.jpg
```

The image file is optional if the current design uses only CSS for the book cover.

## How to Run the Project

1. Clone or download this repository.
2. Open the project folder in Visual Studio Code.
3. Make sure the Bootstrap CSS file is available in the `assests/css/` folder.
4. Install the Live Server extension if it is not already installed.
5. Right-click `index.html`.
6. Select **Open with Live Server**.
7. Click **Explore Chapters** to browse the chapters.
8. Select a chapter to read its verses.

An internet connection is required to fetch data from the API.

## How It Works

1. The home page displays the Bhagavad Gita book cover.
2. Clicking **Explore Chapters** fetches the chapter list from the API.
3. Selecting a chapter loads its verses.
4. Each verse displays the available Sanskrit text, transliteration, and translation.
5. Users can return to the chapter list and select another chapter.

## Future Improvements

- Search chapters and verses.
- Add bookmarks for favourite verses.
- Add English and Gujarati translation options.
- Add a verse-of-the-day feature.
- Improve offline support.

## Acknowledgement

Thanks to the Vedic Scriptures API for providing Bhagavad Gita chapter and verse data.

## Author

Developed as a frontend web development project to explore API integration, JavaScript, responsive design, and interactive UI development.
