/**
 * Math Quest Portal - Main Application Logic
 * Handles exam flow, answer checking, and results display
 */

// State Management
let currentExam = {
    grade: null,
    questions: [],
    currentQuestionIndex: 0,
    userAnswers: {},
    startTime: null,
    endTime: null
};

// Timer
let timerInterval = null;

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    // Add SVG gradient for score circle
    addSVGGradient();
    // Update question counts on dashboard
    updateQuestionCounts();
});

// Update question counts dynamically
function updateQuestionCounts() {
    const grades = ['1-2', '3-4', '5-6', '7-8', '9-10', '11-12'];
    const examQuestions = { '1-2': 18, '3-4': 18, '5-6': 20, '7-8': 20, '9-10': 20, '11-12': 20 };
    let totalQuestions = 0;
    
    grades.forEach(grade => {
        const pool = questionBank[grade] ? questionBank[grade].length : 0;
        totalQuestions += pool;
        
        const metaElement = document.getElementById(`meta-${grade}`);
        if (metaElement) {
            metaElement.textContent = `${examQuestions[grade]} Questions • ${pool} in pool`;
        }
    });
    
    const totalTag = document.getElementById('total-questions-tag');
    if (totalTag) {
        totalTag.textContent = `🎯 ${totalQuestions}+ Questions`;
    }
}

// Add SVG gradient definition
function addSVGGradient() {
    const svg = document.querySelector('.score-circle svg');
    if (svg) {
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        defs.innerHTML = `
            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:#f59e0b"/>
                <stop offset="100%" style="stop-color:#d97706"/>
            </linearGradient>
        `;
        svg.insertBefore(defs, svg.firstChild);
        
        // Update the score-fill to use the gradient
        const scoreFill = svg.querySelector('.score-fill');
        if (scoreFill) {
            scoreFill.style.stroke = 'url(#scoreGradient)';
        }
    }
}

// Page Navigation
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
}

function goHome() {
    // Stop timer
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    
    // Reset exam state
    currentExam = {
        grade: null,
        questions: [],
        currentQuestionIndex: 0,
        userAnswers: {},
        startTime: null,
        endTime: null
    };
    
    showPage('landing-page');
}

// Start Exam
function startExam(grade) {
    currentExam.grade = grade;
    currentExam.questions = [...getQuestionsForGrade(grade)];
    currentExam.currentQuestionIndex = 0;
    currentExam.userAnswers = {};
    currentExam.startTime = Date.now();
    currentExam.endTime = null;
    
    // Update exam header
    document.getElementById('exam-grade-display').textContent = `Grades ${grade}`;
    
    // Create question dots
    createQuestionDots();
    
    // Show first question
    showQuestion(0);
    
    // Start timer
    startTimer();
    
    // Show exam page
    showPage('exam-page');
}

// Timer Functions
function startTimer() {
    const timerElement = document.querySelector('.timer-value');
    
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    
    timerInterval = setInterval(() => {
        const elapsed = Date.now() - currentExam.startTime;
        const minutes = Math.floor(elapsed / 60000);
        const seconds = Math.floor((elapsed % 60000) / 1000);
        timerElement.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }, 1000);
}

function getElapsedTime() {
    const elapsed = currentExam.endTime - currentExam.startTime;
    const minutes = Math.floor(elapsed / 60000);
    const seconds = Math.floor((elapsed % 60000) / 1000);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Question Navigation
function createQuestionDots() {
    const dotsContainer = document.getElementById('question-dots');
    dotsContainer.innerHTML = '';
    
    currentExam.questions.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = 'question-dot';
        dot.dataset.index = index;
        dot.addEventListener('click', () => showQuestion(index));
        dotsContainer.appendChild(dot);
    });
    
    updateQuestionDots();
}

function updateQuestionDots() {
    const dots = document.querySelectorAll('.question-dot');
    dots.forEach((dot, index) => {
        dot.classList.remove('current', 'answered');
        
        if (index === currentExam.currentQuestionIndex) {
            dot.classList.add('current');
        }
        
        if (currentExam.userAnswers[index] !== undefined) {
            dot.classList.add('answered');
        }
    });
}

function showQuestion(index) {
    if (index < 0 || index >= currentExam.questions.length) return;
    
    currentExam.currentQuestionIndex = index;
    const question = currentExam.questions[index];
    
    // Update question display
    document.getElementById('question-number').textContent = `Question ${index + 1}`;
    document.getElementById('question-points').textContent = `${question.points} points`;
    document.getElementById('question-text').textContent = question.question;
    
    // Update progress
    document.getElementById('exam-progress').textContent = 
        `Question ${index + 1} of ${currentExam.questions.length}`;
    
    // Update progress bar
    const progressPercent = ((index + 1) / currentExam.questions.length) * 100;
    document.getElementById('progress-fill').style.width = `${progressPercent}%`;
    
    // Handle image (if exists)
    const imageContainer = document.getElementById('question-image-container');
    const imageElement = document.getElementById('question-image');
    if (question.image) {
        imageElement.src = question.image;
        imageContainer.style.display = 'block';
    } else {
        imageContainer.style.display = 'none';
    }
    
    // Create options
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    const letters = ['A', 'B', 'C', 'D', 'E'];
    question.options.forEach((option, optIndex) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        if (currentExam.userAnswers[index] === optIndex) {
            button.classList.add('selected');
        }
        
        button.innerHTML = `
            <span class="option-letter">${letters[optIndex]}</span>
            <span class="option-text">${option}</span>
        `;
        
        button.addEventListener('click', () => selectAnswer(index, optIndex));
        optionsContainer.appendChild(button);
    });
    
    // Update navigation buttons
    updateNavigationButtons();
    updateQuestionDots();
}

function selectAnswer(questionIndex, answerIndex) {
    currentExam.userAnswers[questionIndex] = answerIndex;
    
    // Update option buttons
    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach((btn, idx) => {
        btn.classList.toggle('selected', idx === answerIndex);
    });
    
    updateQuestionDots();
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const submitBtn = document.getElementById('submit-btn');
    
    // Previous button
    prevBtn.disabled = currentExam.currentQuestionIndex === 0;
    prevBtn.style.visibility = currentExam.currentQuestionIndex === 0 ? 'hidden' : 'visible';
    
    // Show submit button on last question
    const isLastQuestion = currentExam.currentQuestionIndex === currentExam.questions.length - 1;
    nextBtn.style.display = isLastQuestion ? 'none' : 'flex';
    submitBtn.style.display = isLastQuestion ? 'flex' : 'none';
}

function prevQuestion() {
    if (currentExam.currentQuestionIndex > 0) {
        showQuestion(currentExam.currentQuestionIndex - 1);
    }
}

function nextQuestion() {
    if (currentExam.currentQuestionIndex < currentExam.questions.length - 1) {
        showQuestion(currentExam.currentQuestionIndex + 1);
    }
}

// Submit Exam
function submitExam() {
    // Check if all questions are answered
    const answeredCount = Object.keys(currentExam.userAnswers).length;
    const totalQuestions = currentExam.questions.length;
    
    if (answeredCount < totalQuestions) {
        const unanswered = totalQuestions - answeredCount;
        const confirmSubmit = confirm(
            `You have ${unanswered} unanswered question${unanswered > 1 ? 's' : ''}. ` +
            `Are you sure you want to submit?`
        );
        if (!confirmSubmit) return;
    }
    
    // Stop timer
    currentExam.endTime = Date.now();
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    
    // Calculate results
    calculateResults();
    
    // Show results page
    showPage('results-page');
}

function calculateResults() {
    let correct = 0;
    let incorrect = 0;
    let totalPoints = 0;
    let earnedPoints = 0;
    
    currentExam.questions.forEach((question, index) => {
        totalPoints += question.points;
        
        if (currentExam.userAnswers[index] === question.correctAnswer) {
            correct++;
            earnedPoints += question.points;
        } else if (currentExam.userAnswers[index] !== undefined) {
            incorrect++;
        }
    });
    
    const unanswered = currentExam.questions.length - correct - incorrect;
    const percentage = Math.round((earnedPoints / totalPoints) * 100);
    const timeTaken = getElapsedTime();
    
    // Update results display
    document.getElementById('correct-count').textContent = correct;
    document.getElementById('incorrect-count').textContent = incorrect + unanswered;
    document.getElementById('points-earned').textContent = `${earnedPoints}/${totalPoints}`;
    document.getElementById('time-taken').textContent = timeTaken;
    document.getElementById('score-value').textContent = `${percentage}%`;
    
    // Update result icon and message based on score
    const resultsIcon = document.getElementById('results-icon');
    const resultsSubtitle = document.getElementById('results-subtitle');
    
    if (percentage >= 90) {
        resultsIcon.textContent = '🏆';
        resultsSubtitle.textContent = 'Outstanding! Math champion!';
    } else if (percentage >= 70) {
        resultsIcon.textContent = '🌟';
        resultsSubtitle.textContent = 'Great job!';
    } else if (percentage >= 50) {
        resultsIcon.textContent = '💪';
        resultsSubtitle.textContent = 'Good effort!';
    } else {
        resultsIcon.textContent = '📚';
        resultsSubtitle.textContent = 'Keep practicing!';
    }
    
    // Animate score circle
    setTimeout(() => {
        const scoreCircle = document.getElementById('score-circle');
        if (scoreCircle) {
            const circumference = 2 * Math.PI * 45;
            const offset = circumference - (percentage / 100) * circumference;
            scoreCircle.style.strokeDashoffset = offset;
        }
    }, 100);
    
    // Save to user history (if logged in)
    const saveStatus = document.getElementById('save-status');
    if (typeof UserManager !== 'undefined' && UserManager.getCurrentUser()) {
        UserManager.addToHistory({
            grade: currentExam.grade,
            score: percentage,
            correct: correct,
            incorrect: incorrect + unanswered,
            totalQuestions: currentExam.questions.length,
            pointsEarned: earnedPoints,
            totalPoints: totalPoints,
            timeTaken: timeTaken
        });
        // Update the UI to reflect new stats
        if (typeof updateAuthUI === 'function') {
            updateAuthUI();
        }
        // Show saved status
        if (saveStatus) {
            saveStatus.className = 'save-status saved';
            saveStatus.innerHTML = '✓ Score saved to your history';
        }
    } else {
        // Show not logged in message
        if (saveStatus) {
            saveStatus.className = 'save-status not-saved';
            saveStatus.innerHTML = '💡 <a onclick="showAuthModal(\'login\')">Login</a> to save your scores';
        }
    }
    
    // Hide review section
    document.getElementById('review-section').style.display = 'none';
}

// Review Answers
function showReview() {
    const reviewSection = document.getElementById('review-section');
    const reviewList = document.getElementById('review-list');
    
    reviewList.innerHTML = '';
    
    const letters = ['A', 'B', 'C', 'D', 'E'];
    
    currentExam.questions.forEach((question, index) => {
        const userAnswer = currentExam.userAnswers[index];
        const isCorrect = userAnswer === question.correctAnswer;
        const wasAnswered = userAnswer !== undefined;
        
        const reviewItem = document.createElement('div');
        reviewItem.className = `review-item ${isCorrect ? 'correct' : 'incorrect'}`;
        
        reviewItem.innerHTML = `
            <div class="review-question">
                <strong>Q${index + 1}:</strong> ${question.question}
            </div>
            <div class="review-answers">
                <span class="review-answer user">
                    Your answer: ${wasAnswered ? `${letters[userAnswer]} (${question.options[userAnswer]})` : 'Not answered'}
                    ${isCorrect ? '✓' : '✗'}
                </span>
                ${!isCorrect ? `
                    <span class="review-answer correct-answer">
                        Correct: ${letters[question.correctAnswer]} (${question.options[question.correctAnswer]})
                    </span>
                ` : ''}
            </div>
        `;
        
        reviewList.appendChild(reviewItem);
    });
    
    reviewSection.style.display = 'block';
    reviewSection.scrollIntoView({ behavior: 'smooth' });
}

// Retry Exam
function retryExam() {
    if (currentExam.grade) {
        startExam(currentExam.grade);
    }
}

