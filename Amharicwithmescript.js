// Navigation between sections
document.querySelectorAll('nav button').forEach(button => {
button.addEventListener('click', function() {
// Remove active class from all buttons and sections
document.querySelectorAll('nav button').forEach(btn => btn.classList.remove('active'));
document.querySelectorAll('section').forEach(section => section.classList.remove('active'));

// Add active class to clicked button and corresponding section
this.classList.add('active');
const sectionId = this.getAttribute('data-section');
document.getElementById(sectionId).classList.add('active');
});
});

// Navigation buttons in home section
document.querySelectorAll('.nav-button').forEach(button => {
button.addEventListener('click', function() {
const sectionId = this.getAttribute('data-section');

// Remove active class from all buttons and sections
document.querySelectorAll('nav button').forEach(btn => btn.classList.remove('active'));
document.querySelectorAll('section').forEach(section => section.classList.remove('active'));

// Add active class to corresponding nav button and section
document.querySelector(`nav button[data-section="${sectionId}"]`).classList.add('active');
document.getElementById(sectionId).classList.add('active');
});
});

// Lesson cards toggle
document.querySelectorAll('.lesson-card h3').forEach(title => {
title.addEventListener('click', function() {
const card = this.parentElement;
card.classList.toggle('active');
});
});

// Story cards toggle
document.querySelectorAll('.story-card h3').forEach(title => {
title.addEventListener('click', function() {
const card = this.parentElement;
card.classList.toggle('active');
});
});

// Tab functionality for lessons
document.querySelectorAll('[data-lesson-tab]').forEach(tab => {
tab.addEventListener('click', function() {
const tabId = this.getAttribute('data-lesson-tab');

// Remove active class from all tabs and contents
document.querySelectorAll('[data-lesson-tab]').forEach(t => t.classList.remove('active'));
document.querySelectorAll('#lessons .tab-content').forEach(content => content.classList.remove('active'));

// Add active class to clicked tab and corresponding content
this.classList.add('active');
document.getElementById(`${tabId}-lessons`).classList.add('active');
});
});

// Tab functionality for quizzes
document.querySelectorAll('[data-quiz-tab]').forEach(tab => {
tab.addEventListener('click', function() {
const tabId = this.getAttribute('data-quiz-tab');

// Remove active class from all tabs and contents
document.querySelectorAll('[data-quiz-tab]').forEach(t => t.classList.remove('active'));
document.querySelectorAll('#quiz .tab-content').forEach(content => content.classList.remove('active'));

// Add active class to clicked tab and corresponding content
this.classList.add('active');
document.getElementById(`${tabId}-quiz`).classList.add('active');
});
});

// Tab functionality for alphabet
document.querySelectorAll('[data-alphabet-tab]').forEach(tab => {
tab.addEventListener('click', function() {
const tabId = this.getAttribute('data-alphabet-tab');

// Remove active class from all tabs and contents
document.querySelectorAll('[data-alphabet-tab]').forEach(t => t.classList.remove('active'));
document.querySelectorAll('#alphabet .tab-content').forEach(content => content.classList.remove('active'));

// Add active class to clicked tab and corresponding content
this.classList.add('active');
document.getElementById(`${tabId}-letters`).classList.add('active');
});
});

// Tab functionality for audio practice
document.querySelectorAll('[data-audio-tab]').forEach(tab => {
tab.addEventListener('click', function() {
const tabId = this.getAttribute('data-audio-tab');

// Remove active class from all tabs and contents
document.querySelectorAll('[data-audio-tab]').forEach(t => t.classList.remove('active'));
document.querySelectorAll('#audio .tab-content').forEach(content => content.classList.remove('active'));

// Add active class to clicked tab and corresponding content
this.classList.add('active');
document.getElementById(`${tabId}-practice`).classList.add('active');
});
});

// Alphabet card click - play sound
document.querySelectorAll('.alphabet-card').forEach(card => {
card.addEventListener('click', function() {
const sound = this.getAttribute('data-sound');
// In a real app, we would play the corresponding sound
console.log(`Playing sound for: ${sound}`);
});
});

// Record button functionality
document.querySelectorAll('.record-button').forEach(button => {
button.addEventListener('click', function() {
this.classList.toggle('recording');
const recordingText = this.classList.contains('recording') ? 'Stop Recording' : 'Record';
this.textContent = recordingText;

// In a real app, this would start/stop recording audio
const recordingDisplay = this.parentElement.querySelector('.user-recording audio');
recordingDisplay.style.display = this.classList.contains('recording') ? 'none' : 'block';
});
});

// Writing canvas functionality
const canvas = document.getElementById('writing-canvas');
if (canvas) {
const ctx = canvas.getContext('2d');
let isDrawing = false;

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

function startDrawing(e) {
isDrawing = true;
draw(e);
}

function draw(e) {
if (!isDrawing) return;

ctx.lineWidth = 2;
ctx.lineCap = 'round';
ctx.strokeStyle = '#000';

ctx.lineTo(e.offsetX, e.offsetY);
ctx.stroke();
ctx.beginPath();
ctx.moveTo(e.offsetX, e.offsetY);
}

function stopDrawing() {
isDrawing = false;
ctx.beginPath();
}

document.getElementById('clear-canvas').addEventListener('click', function() {
ctx.clearRect(0, 0, canvas.width, canvas.height);
});

document.getElementById('save-canvas').addEventListener('click', function() {
// In a real app, this would save the canvas image
alert('Your drawing has been saved to your gallery!');
});
}

// Quiz functionality
// This is a simplified version - a real app would have more complex quiz logic
const quizQuestions = [
{
question: "What does 'Selam' mean?",
options: ["Thank you", "Hello", "Goodbye", "Please"],
answer: 1
},
{
question: "How do you say 'thank you' in Amharic?",
options: ["Amesegenallo", "Endet neh", "Dehna aderk", "Ebakkih"],
answer: 0
},
{
question: "What is the Amharic word for 'water'?",
options: ["Dabo", "Siga", "Woha", "Injera"],
answer: 2
},
{
question: "Which of these means 'how are you?'",
options: ["Dehna negn", "Endet neh", "Amesegenallo", "Selam"],
answer: 1
},
{
question: "What number is 'sost'?",
options: ["1", "2", "3", "4"],
answer: 2
}
];

let currentQuestion = 0;
let score = 0;

function displayQuestion() {
const quizContainer = document.getElementById('quiz-container');
const question = quizQuestions[currentQuestion];

quizContainer.innerHTML = `
<div class="question">
  <h3>${question.question}</h3>
  <div class="options">
    ${question.options.map((option, index) => `
      <button data-answer="${index}">${option}</button>
    `).join('')}
  </div>
</div>
`;

document.getElementById('quiz-progress').textContent = `Question ${currentQuestion + 1} of ${quizQuestions.length}`;
document.getElementById('prev-btn').disabled = currentQuestion === 0;
document.getElementById('next-btn').disabled = currentQuestion === quizQuestions.length - 1;
document.getElementById('feedback').innerHTML = '';

// Add event listeners to answer buttons
document.querySelectorAll('.question button').forEach(button => {
button.addEventListener('click', function() {
  const selectedAnswer = parseInt(this.getAttribute('data-answer'));
  const isCorrect = selectedAnswer === question.answer;
  
  if (isCorrect) {
    score++;
    this.classList.add('correct');
    document.getElementById('feedback').innerHTML = `
      <div class="correct-feedback">Correct! Well done.</div>
    `;
  } else {
    this.classList.add('incorrect');
    document.querySelector(`.question button[data-answer="${question.answer}"]`).classList.add('correct');
    document.getElementById('feedback').innerHTML = `
      <div class="incorrect-feedback">Incorrect. The right answer is: ${question.options[question.answer]}</div>
    `;
  }
  
  // Disable all buttons after answering
  document.querySelectorAll('.question button').forEach(btn => {
    btn.disabled = true;
  });
  
  // Update score display
  document.getElementById('quiz-score').textContent = `Score: ${score}/${quizQuestions.length}`;
});
});
}

document.getElementById('next-btn').addEventListener('click', function() {
if (currentQuestion < quizQuestions.length - 1) {
currentQuestion++;
displayQuestion();
}
});

document.getElementById('prev-btn').addEventListener('click', function() {
if (currentQuestion > 0) {
currentQuestion--;
displayQuestion();
}
});

// Initialize the quiz
if (document.getElementById('quiz-container')) {
displayQuestion();
}

// Letter recognition game
if (document.getElementById('letter-recognition-game')) {
const letters = [
{ char: "ሀ", sound: "ha" },
{ char: "ለ", sound: "la" },
{ char: "መ", sound: "ma" },
{ char: "ሰ", sound: "sa" }
];

let currentLetterIndex = 0;

function setupLetterGame() {
const currentLetter = letters[currentLetterIndex];
const options = [...letters];

// Remove the correct answer from options
options.splice(currentLetterIndex, 1);

// Shuffle and pick 3 wrong options
shuffleArray(options);
const wrongOptions = options.slice(0, 3);

// Combine with correct answer and shuffle
const allOptions = [...wrongOptions, currentLetter];
shuffleArray(allOptions);

// Find the correct answer's new position
const correctIndex = allOptions.findIndex(opt => opt.char === currentLetter.char);

// Update the game UI
document.getElementById('letter-audio').querySelector('source').src = `https://example.com/${currentLetter.sound}.mp3`;
document.getElementById('letter-audio').load();

const optionButtons = document.querySelectorAll('#letter-recognition-game .alphabet-card');
optionButtons.forEach((button, index) => {
  button.innerHTML = `<div class="alphabet-char">${allOptions[index].char}</div>`;
  button.setAttribute('data-answer', index === correctIndex ? 'true' : 'false');
});

document.getElementById('letter-feedback').textContent = '';
}

// Helper function to shuffle array
function shuffleArray(array) {
for (let i = array.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [array[i], array[j]] = [array[j], array[i]];
}
return array;
}

// Set up event listeners for letter game
document.querySelectorAll('#letter-recognition-game .alphabet-card').forEach(button => {
button.addEventListener('click', function() {
  const isCorrect = this.getAttribute('data-answer') === 'true';
  const feedback = document.getElementById('letter-feedback');
  
  if (isCorrect) {
    this.classList.add('correct');
    feedback.textContent = 'Correct! Well done.';
    feedback.style.color = '#2ecc71';
  } else {
    this.classList.add('incorrect');
    feedback.textContent = 'Incorrect. Try again!';
    feedback.style.color = '#e74c3c';
  }
});
});

document.getElementById('next-letter').addEventListener('click', function() {
currentLetterIndex = (currentLetterIndex + 1) % letters.length;
setupLetterGame();
});

// Initialize the game
setupLetterGame();
}

// Coloring page functionality
if (document.getElementById('save-coloring')) {
let selectedColor = '#000000';

// Color selection
document.querySelectorAll('.color-option').forEach(option => {
option.addEventListener('click', function() {
  document.querySelectorAll('.color-option').forEach(opt => opt.classList.remove('selected'));
  this.classList.add('selected');
  selectedColor = this.getAttribute('data-color');
});
});

// Set first color as selected by default
document.querySelector('.color-option').classList.add('selected');

// Save coloring
document.getElementById('save-coloring').addEventListener('click', function() {
alert('Your coloring has been saved to your gallery!');
});

// New coloring page
document.getElementById('new-coloring').addEventListener('click', function() {
const letters = ['ሀ', 'ለ', 'መ', 'ሰ', 'ረ', 'ቀ'];
const randomLetter = letters[Math.floor(Math.random() * letters.length)];
document.querySelector('.coloring-page h3').textContent = `Color the Letter: ${randomLetter}`;
});
}