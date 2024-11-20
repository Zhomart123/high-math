// script.js
document.getElementById("quiz-form").addEventListener("submit", function (event) {
    event.preventDefault();
  
    const answers = document.querySelectorAll("input[type='radio']:checked");
    const scores = {
      visual: 0,
      auditory: 0,
      readwrite: 0,
      kinesthetic: 0,
    };
  
    // Assigning weighted values to answers
    const weights = {
      visual: 1,
      auditory: 1,
      readwrite: 1,
      kinesthetic: 1,
    };
  
    answers.forEach((answer) => {
      const questionType = answer.closest(".question").dataset.type;
  
      // For more advanced scoring, we can assign different weights to certain questions
      if (questionType === "visual" && answer.value === "1") {
        scores.visual += weights.visual * 2; // More weight on visual answers
      } else if (questionType === "auditory" && answer.value === "1") {
        scores.auditory += weights.auditory * 2;
      } else if (questionType === "readwrite" && answer.value === "1") {
        scores.readwrite += weights.readwrite * 2;
      } else if (questionType === "kinesthetic" && answer.value === "1") {
        scores.kinesthetic += weights.kinesthetic * 2;
      } else {
        // Regular scoring for the opposite choice
        scores[questionType] += weights[questionType];
      }
    });
  
    // Determine primary and secondary learning style
    let sortedScores = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    let [primaryStyle, primaryScore] = sortedScores[0];
    let [secondaryStyle, secondaryScore] = sortedScores[1];
  
    // Handle tie situation (if two or more styles have the same score)
    if (primaryScore === secondaryScore) {
      let tieBreaker = Math.random() > 0.5 ? primaryStyle : secondaryStyle;
      primaryStyle = tieBreaker;
      secondaryStyle = primaryStyle === primaryStyle ? (sortedScores[2] ? sortedScores[2][0] : '') : secondaryStyle;
    }
  
    const resultText = document.getElementById("result-text");
    const resultDiv = document.getElementById("result");
  
    // Display results with detailed analysis
    const messages = {
      visual: {
        text: "You learn best by seeing! Visual aids like charts, diagrams, and videos are your best friends.",
        tips: "Try using visual learning tools such as mind maps, color-coded notes, and infographics.",
      },
      auditory: {
        text: "You learn best by hearing! Discussions, podcasts, and lectures work wonders for you.",
        tips: "Engage in study groups, listen to podcasts, and use voice memos to record and review key points.",
      },
      readwrite: {
        text: "You learn best by reading and writing! Books, notes, and essays are your tools for success.",
        tips: "Consider creating detailed written summaries, flashcards, and journaling to reinforce your learning.",
      },
      kinesthetic: {
        text: "You learn best by doing! Hands-on activities, experiments, and real-world practice help you the most.",
        tips: "Incorporate physical activity, real-life projects, and experiments to deepen your understanding.",
      },
    };
  
    const primaryMessage = messages[primaryStyle];
    const secondaryMessage = messages[secondaryStyle];
  
    resultText.innerHTML = `
      <strong>Your Primary Learning Style:</strong> ${primaryMessage.text} <br>
      <strong>Secondary Style:</strong> ${secondaryMessage.text} <br><br>
      <strong>Learning Tips:</strong> <br>
      - Primary Style: ${primaryMessage.tips} <br>
      - Secondary Style: ${secondaryMessage.tips}
    `;
  
    resultDiv.classList.remove("hidden");
    window.scrollTo({ top: resultDiv.offsetTop, behavior: "smooth" });
  });
  