
function submitMood() {
    const mood = document.getElementById("mood").value;
    let suggestion = "";

    switch(mood) {
        case "happy":
            suggestion = "Keep up the good mood! Spread positivity by doing something kind today.";
            break;
        case "sad":
            suggestion = "Try journaling your thoughts or listening to uplifting music.";
            break;
        case "anxious":
            suggestion = "Take deep breaths, do a quick meditation, or go for a walk.";
            break;
        case "angry":
            suggestion = "Physical activity can help—consider a short workout or breathing exercise.";
            break;
        case "neutral":
            suggestion = "Maintain your balance with gratitude journaling or a creative hobby.";
            break;
        default:
            suggestion = "Please select a mood.";
    }

    document.getElementById("suggestion").innerText = suggestion;
}
