const words = ["today", "I", "went", "on", "a", "walk", "and", "I", "found", "you,", "I", "find", "you", "in", "every", "where", "I", "go.", "Your", "presence", "looms", "like", "a", "shadow", "and", "is", "persistant", "like", "weeds.", "The", "ghost", "of", "you", "haunts", "me."];
let wordIndex = 0;
let lastSpawnTime = 0;

document.addEventListener("mousemove", dropWords)


function dropWords(e) {
    const now = Date.now();
    if (now - lastSpawnTime < 150) return;
    lastSpawnTime = now;

    const wordSpan = document.createElement("span");
    wordSpan.classList.add("word");
    wordSpan.innerText = words[wordIndex];

    wordSpan.style.left = `${e.clientX}px`;
    wordSpan.style.top = `${e.clientY}px`;

    document.body.appendChild(wordSpan);
    wordIndex = (wordIndex + 1) % words.length;

    wordSpan.addEventListener("animationend", () => {
        wordSpan.remove();
    });
}