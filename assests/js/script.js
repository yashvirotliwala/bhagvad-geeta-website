
const API = "https://vedicscriptures.github.io";

const heroContent = document.getElementById("heroContent");
const chapterArea = document.querySelector(".chapter-area");
const chapterContainer = document.getElementById("chapterContainer");

let chapterData = [];
let currentChapter = null;

// Explore Chapters button
async function goToChapters() {
    heroContent.style.display = "none";
    chapterArea.style.display = "block";

    chapterContainer.innerHTML =
        '<div class="col-12"><h3>Loading chapters...</h3></div>';

    window.scrollTo({ top: 0, behavior: "smooth" });

    await getChapters();
}

// Fetch all chapters from the existing API
async function getChapters() {
    try {
        const response = await fetch(`${API}/chapters/`);

        if (!response.ok) {
            throw new Error("Unable to load chapters.");
        }

        const data = await response.json();
        chapterData = data;

        let html = `
            <div class="col-12 text-center mb-4">
                <h2>Explore the Chapters</h2>
                <p>Choose a chapter to begin reading.</p>
            </div>
        `;

        data.forEach((ch) => {
            html += `
                <div class="col-md-4 col-sm-6 mb-4">
                    <div class="chapter-card"
                         onclick="showChapter(${ch.chapter_number})">
                        <div class="chapter-title">
                            Chapter ${ch.chapter_number}
                        </div>
                        <p class="mt-2">
                            ${ch.translation || "Bhagavad Gita"}
                        </p>
                        <small>
                            ${ch.verses_count || ""} verses
                        </small>
                    </div>
                </div>
            `;
        });

        chapterContainer.innerHTML = html;
    } catch (error) {
        chapterContainer.innerHTML = `
            <div class="col-12 text-center">
                <h3>Unable to load chapters</h3>
                <p>Please check your internet connection.</p>
                <button class="chapter-btn" onclick="getChapters()">
                    Try Again
                </button>
                <br><br>
                <button class="chapter-btn" onclick="goBackToCover()">
                    Back to Cover
                </button>
            </div>
        `;
        console.error(error);
    }
}

// Fetch verses for the selected chapter
async function showChapter(ch) {
    currentChapter = ch;

    chapterContainer.innerHTML = `
        <div class="col-12 text-center">
            <h3>Loading Chapter ${ch}...</h3>
            <p>Please wait while the verses load.</p>
        </div>
    `;

    let html = "";
    let verseNumber = 1;
    const batchSize = 5;

    try {
        // Load a few verses together instead of one by one.
        while (true) {
            const requests = [];

            for (let i = verseNumber; i < verseNumber + batchSize; i++) {
                requests.push(
                    fetch(`${API}/slok/${ch}/${i}`)
                        .then(async (response) => {
                            if (!response.ok) return null;
                            return await response.json();
                        })
                );
            }

            const results = await Promise.all(requests);
            let reachedEnd = false;

            for (let index = 0; index < results.length; index++) {
                const data = results[index];
                const number = verseNumber + index;

                if (!data || !data.slok) {
                    reachedEnd = true;
                    break;
                }

                html += `
                    <div class="col-12 mb-4">
                        <div class="chapter-card p-4">
                            <h4>
                                Chapter ${ch} - Verse ${number}
                            </h4>

                            <hr>

                            <p>
                                <b>Sanskrit:</b><br>
                                ${escapeHTML(data.slok)}
                            </p>

                            <p>
                                <b>Meaning:</b><br>
                                ${escapeHTML(data.transliteration || "Not available")}
                            </p>

                            <p>
                                <b>Translation:</b><br>
                                ${escapeHTML(data.tej?.ht || "No translation available")}
                            </p>
                        </div>
                    </div>
                `;
            }

            // Display loaded verses while more are being fetched.
            chapterContainer.innerHTML = `
                <div class="col-12 text-center mb-4">
                    <h2>Chapter ${ch}</h2>
                    <p>Read the verses at your own pace.</p>
                </div>
                ${html}
            `;

            if (reachedEnd) break;

            verseNumber += batchSize;
        }

        html += `
            <div class="col-12 text-center mt-4 mb-4">
                <button class="chapter-btn" onclick="goBackToChapters()">
                    ← Back to Chapters
                </button>
            </div>
        `;

        chapterContainer.innerHTML = html;
    } catch (error) {
        chapterContainer.innerHTML = `
            <div class="col-12 text-center">
                <h3>Unable to load verses</h3>
                <p>Please check your connection and try again.</p>
                <button class="chapter-btn"
                        onclick="showChapter(${ch})">
                    Try Again
                </button>
                <br><br>
                <button class="chapter-btn"
                        onclick="goBackToChapters()">
                    ← Back to Chapters
                </button>
            </div>
        `;

        console.error(error);
    }
}

// Escape API text before adding it to HTML
function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, (char) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);
}

// Back to chapter list
function goBackToChapters() {
    getChapters();
}

// Back to the book cover
function goBackToCover() {
    chapterArea.style.display = "none";
    heroContent.style.display = "flex";
    window.scrollTo({ top: 0, behavior: "smooth" });
}
