// A JavaScript Array of Strings (equivalent to a Python List of strings)
const words = ["today", "I", "went", "on", "a", "walk", "and", "I", "found", "you,", "I", "find", "you", "in", "every", "where", "I", "go.", "Your", "presence", "looms", "like", "a", "shadow", "and", "is", "persistant", "like", "weeds.", "The", "ghost", "of", "you", "haunts", "me."];

// State variables (like global tracking variables in Python):
// - 'const' declares a variable that cannot be reassigned.
// - 'let' declares a variable whose value can change over time.
let wordIndex = 0;       // Pointer/index tracking which word to drop next
let lastSpawnTime = 0;   // Timestamp (in milliseconds) tracking when the last word was drawn

// Event Listener: Tells the browser to watch for the mouse moving.
// Whenever 'mousemove' fires, call the function dropWords.
document.addEventListener("mousemove", dropWords);

// In JS, event callbacks receive an event object 'e' containing event details (like mouse coordinates).
function dropWords(e) {
    // Current time in milliseconds since epoch (similar to: time.time() * 1000 in Python)
    const now = Date.now();

    // Rate-limiting / Throttling:
    // If fewer than 150ms have passed since the last word spawned, exit early ('return').
    // Without this, words would spawn hundreds of times per second and lag the screen.
    if (now - lastSpawnTime < 150) return;
    lastSpawnTime = now; // Update timestamp for the next check

    // DOM Manipulation (Dynamic Object Creation):
    // 1. Create a new HTML <span> element in memory (document.createElement)
    const wordSpan = document.createElement("span");

    // 2. Assign CSS class 'word' so it picks up styles defined in index.css
    wordSpan.classList.add("word");

    // 3. Set the text inside the span to words[wordIndex] (array indexing works just like Python: list[i])
    wordSpan.innerText = words[wordIndex];

    // 4. Position the element at the cursor's current (X, Y) coordinates.
    // Template literals (`...`) work just like Python f-strings: f"{e.clientX}px"
    wordSpan.style.left = `${e.clientX}px`;
    wordSpan.style.top = `${e.clientY}px`;

    // 5. Append the newly created element onto the visible page (inside the <body> tag)
    document.body.appendChild(wordSpan);

    // Circular Array Traversal using Modulo (%):
    // Increment index by 1, wrapping back to 0 once we reach the end of the array.
    // Equivalent to: wordIndex = (wordIndex + 1) % len(words) in Python.
    wordIndex = (wordIndex + 1) % words.length;

    // Memory Cleanup / Garbage Collection:
    // Listen for the CSS animation ('fall') to complete, then remove the element from the DOM.
    // Preventing leftover hidden elements keeps the browser running smoothly.
    wordSpan.addEventListener("animationend", () => {
        wordSpan.remove();
    });
}