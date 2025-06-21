const suggestionEl = document.getElementById('suggestion');
const moodEl = document.getElementById('mood');

const moodSuggestions = {
    happy: "Enjoy your good mood! Maybe share your joy with a friend 🌞",
    sad: "Try journaling your thoughts or listening to calm music 🎧",
    anxious: "Take a few deep breaths or go for a mindful walk 🌿",
    angry: "Try some light exercise or calming stretches 🧘",
    neutral: "Keep a gratitude list or try a creative activity ✍️"
};

const quotes = [
    "You are stronger than you think 💪",
    "Every day is a second chance 🌈",
    "Your mental health matters ❤️",
    "Keep going — you're doing great! 🌟",
    "Breathe. You've got this. 🌬️",
    "Progress, not perfection. ✅"
];

function getRandomQuote() {
    return quotes[Math.floor(Math.random() * quotes.length)];
}

function submitMood() {
    const selectedMood = moodEl.value;
    suggestionEl.textContent = moodSuggestions[selectedMood] || "Take care of yourself!";
    document.getElementById("quote").textContent = getRandomQuote();

    const history = JSON.parse(localStorage.getItem("moodHistory")) || [];
    history.push({
        mood: selectedMood,
        time: new Date().toLocaleString()
    });
    localStorage.setItem("moodHistory", JSON.stringify(history));
    alert("Mood saved!");
    location.reload();
}

function getMoodLabel(mood) {
    const emojis = {
        happy: "😊",
        sad: "😢",
        anxious: "😟",
        angry: "😠",
        neutral: "😐"
    };
    return emojis[mood] || mood;
}

function renderChart() {
    const history = JSON.parse(localStorage.getItem("moodHistory")) || [];
    const labels = history.map(entry => entry.time);
    const data = history.map(entry => {
        switch (entry.mood) {
            case 'happy': return 5;
            case 'neutral': return 3;
            case 'sad': return 2;
            case 'anxious': return 1;
            case 'angry': return 0;
            default: return 3;
        }
    });

    new Chart(document.getElementById('moodChart').getContext('2d'), {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Mood Level (0=Angry to 5=Happy)',
                data: data,
                fill: false,
                borderColor: 'teal',
                tension: 0.3
            }]
        },
        options: {
            scales: {
                y: {
                    min: 0,
                    max: 5,
                    ticks: {
                        callback: value => {
                            const moodMap = ["😠 Angry", "😟 Anxious", "😢 Sad", "😐 Neutral", "", "😊 Happy"];
                            return moodMap[value] || value;
                        }
                    }
                }
            }
        }
    });
}

window.onload = function () {
    const historyList = document.getElementById("history-list");
    const history = JSON.parse(localStorage.getItem("moodHistory")) || [];

    if (history.length === 0) {
        historyList.innerHTML = "<li>No mood history yet.</li>";
    } else {
        historyList.innerHTML = "";
        history.forEach(entry => {
            const li = document.createElement("li");
            li.textContent = `${entry.time} — ${entry.mood}`;
            historyList.appendChild(li);
        });
    }

    renderChart();
};
