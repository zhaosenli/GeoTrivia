const questionSet = {
  multipleChoice: [
    { 
      question: "Which country has the longest border with Russia?", 
      options: ["China", "Kazakhstan", "Mongolia", "Ukraine"], 
      answer: "Kazakhstan", 
      explanation: "Kazakhstan has the longest border with Russia, stretching over 7,644 kilometers." 
    },
    { 
      question: "Which island is the second largest in the world by land area?", 
      options: ["New Guinea", "Borneo", "Madagascar", "Baffin Island"], 
      answer: "New Guinea", 
      explanation: "New Guinea is the second-largest island in the world by land area, covering approximately 785,753 square kilometers." 
    },
    { 
      question: "What is the deepest lake in the world?", 
      options: ["Lake Baikal", "Caspian Sea", "Lake Tanganyika", "Crater Lake"], 
      answer: "Lake Baikal", 
      explanation: "Lake Baikal in Russia is the deepest lake in the world, with a maximum depth of about 1,642 meters." 
    },
    { 
      question: "Which river is the longest in South America?", 
      options: ["Amazon River", "Paraná River", "Orinoco River", "São Francisco River"], 
      answer: "Amazon River", 
      explanation: "The Amazon River is the longest in South America, stretching approximately 7,000 kilometers." 
    },
    { 
      question: "What is the oldest active volcano on Earth?", 
      options: ["Mount Etna", "Mount Vesuvius", "Kīlauea", "Mount St. Helens"], 
      answer: "Mount Etna", 
      explanation: "Mount Etna in Sicily is considered the oldest active volcano on Earth, with eruptions dating back to 1500 BCE." 
    },
    { 
      question: "Which country is the largest producer of coffee?", 
      options: ["Brazil", "Colombia", "Vietnam", "Ethiopia"], 
      answer: "Brazil", 
      explanation: "Brazil is the largest producer of coffee in the world, producing about one-third of the global supply." 
    },
    { 
      question: "Which ocean is the warmest on average?", 
      options: ["Indian Ocean", "Pacific Ocean", "Atlantic Ocean", "Southern Ocean"], 
      answer: "Indian Ocean", 
      explanation: "The Indian Ocean is the warmest ocean on average, with surface temperatures averaging around 22°C to 28°C." 
    },
    { 
      question: "What is the largest coral reef system in the world?", 
      options: ["Great Barrier Reef", "Red Sea Coral Reef", "Mesoamerican Barrier Reef", "New Caledonia Barrier Reef"], 
      answer: "Great Barrier Reef", 
      explanation: "The Great Barrier Reef in Australia is the largest coral reef system in the world, stretching over 2,300 kilometers." 
    },
    { 
      question: "Which river forms part of the border between Mexico and the United States?", 
      options: ["Rio Grande", "Colorado River", "Mississippi River", "Columbia River"], 
      answer: "Rio Grande", 
      explanation: "The Rio Grande forms part of the border between Mexico and the United States, running about 1,896 miles from Colorado to the Gulf of Mexico." 
    },
    { 
      question: "What is the capital city of Bhutan?", 
      options: ["Thimphu", "Paro", "Punakha", "Haa"], 
      answer: "Thimphu", 
      explanation: "Thimphu is the capital and largest city of Bhutan, located in the western central part of the country." 
    }
  ],
  freeResponse: [
    { 
      question: "Which country was formerly known as Abyssinia?", 
      answer: "Ethiopia", 
      explanation: "Ethiopia was formerly known as Abyssinia, and it is one of the oldest nations in the world." 
    },
    { 
      question: "What is the oldest city in the world that is still inhabited?", 
      answer: "Damascus", 
      explanation: "Damascus, the capital of Syria, is considered the oldest continuously inhabited city in the world, with evidence of habitation dating back to around 11,000 years." 
    },
    { 
      question: "What is the largest landlocked country by area?", 
      answer: "Kazakhstan", 
      explanation: "Kazakhstan is the largest landlocked country by area, covering about 2.7 million square kilometers." 
    },
    { 
      question: "Which country is known as the Land of the Rising Sun?", 
      answer: "Japan", 
      explanation: "Japan is known as the Land of the Rising Sun due to its location to the east of the Asian continent, where the sun rises." 
    },
    { 
      question: "What is the smallest independent country in the world?", 
      answer: "Vatican City", 
      explanation: "Vatican City is the smallest independent country in the world, with an area of about 44 hectares (110 acres)." 
    }
  ]
};
// Shuffle array helper function
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Generate random questions
function generateQuestions() {
  const mcContainer = document.getElementById("multiple-choice-questions");
  const frContainer = document.getElementById("free-response-questions");
  mcContainer.innerHTML = "";
  frContainer.innerHTML = "";

  // Shuffle and pick questions
  const multipleChoiceQuestions = shuffle([...questionSet.multipleChoice]).slice(0, 3);
  const freeResponseQuestions = shuffle([...questionSet.freeResponse]).slice(0, 2);

  // Render multiple-choice questions
  multipleChoiceQuestions.forEach((q, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.className = "question";
    questionDiv.innerHTML = `
      <h2>${index + 1}. ${q.question}</h2>
      <div class="button-group">
        ${q.options
          .map(
            (option) =>
              `<button onclick="checkAnswer(this, '${option}', '${q.answer}', '${q.explanation}', this.closest('.question'))">${option}</button>`
          )
          .join("")}
      </div>
      <p class="feedback"></p>
    `;
    mcContainer.appendChild(questionDiv);
  });

  // Render free-response questions
  freeResponseQuestions.forEach((q, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.className = "question";
    questionDiv.innerHTML = `
      <h2>${index + 4}. ${q.question}</h2>
      <div class="free-response">
        <input type="text" placeholder="Your answer..." />
        <button onclick="checkFreeResponse(this, '${q.answer}', '${q.explanation}', this.closest('.question'))">Submit</button>
      </div>
      <p class="feedback"></p>
    `;
    frContainer.appendChild(questionDiv);
  });
}

// Check multiple-choice answer
function checkAnswer(button, selectedAnswer, correctAnswer, explanation, questionDiv) {
  const feedback = questionDiv.querySelector(".feedback");
  if (selectedAnswer === correctAnswer) {
    button.classList.add("correct");
    questionDiv.classList.add("correct");
    feedback.innerHTML = `<strong>Correct!</strong> ${explanation}`;
    feedback.classList.add("correct");
  } else {
    button.classList.add("incorrect");
    questionDiv.classList.add("incorrect");
    feedback.innerHTML = `<strong>Incorrect!</strong> ${explanation}`;
    feedback.classList.add("incorrect");
  }

  // Disable all buttons in the group
  const buttons = button.parentElement.querySelectorAll("button");
  buttons.forEach((btn) => (btn.disabled = true));
}

// Check free-response answer
function checkFreeResponse(button, correctAnswer, explanation, questionDiv) {
  const input = button.previousElementSibling;
  const feedback = questionDiv.querySelector(".feedback");
  const userAnswer = input.value.trim().toLowerCase();
  if (userAnswer === correctAnswer.toLowerCase()) {
    questionDiv.classList.add("correct");
    feedback.innerHTML = `<strong>Correct!</strong> ${explanation}`;
    feedback.classList.add("correct");
  } else {
    questionDiv.classList.add("incorrect");
    feedback.innerHTML = `<strong>Incorrect!</strong> ${explanation}`;
    feedback.classList.add("incorrect");
  }
  input.disabled = true;
  button.disabled = true;
}

// Initialize the trivia game
generateQuestions();
