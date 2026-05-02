/**
 * Math Quest Portal - Question loader and exam selector
 * Question content lives in data/questions/grade-*.json.
 */

const gradeBands = ["1-2", "3-4", "5-6", "7-8", "9-10", "11-12"];
const questionBank = {};

const questionDataFiles = {
    "1-2": "data/questions/grade-1-2.json",
    "3-4": "data/questions/grade-3-4.json",
    "5-6": "data/questions/grade-5-6.json",
    "7-8": "data/questions/grade-7-8.json",
    "9-10": "data/questions/grade-9-10.json",
    "11-12": "data/questions/grade-11-12.json"
};

// Configuration for exam
const examConfig = {
    "1-2": { totalQuestions: 18, easy: 10, medium: 5, hard: 3 },
    "3-4": { totalQuestions: 18, easy: 10, medium: 5, hard: 3 },
    "5-6": { totalQuestions: 20, easy: 10, medium: 6, hard: 4 },
    "7-8": { totalQuestions: 20, easy: 10, medium: 6, hard: 4 },
    "9-10": { totalQuestions: 20, easy: 10, medium: 6, hard: 4 },
    "11-12": { totalQuestions: 20, easy: 10, medium: 6, hard: 4 }
};

let questionBankLoadPromise = null;

function normalizeQuestion(question, gradeBand) {
    return {
        ...question,
        gradeBand: question.gradeBand || gradeBand,
        source: question.source || "Math Quest Portal",
        tags: Array.isArray(question.tags) ? question.tags : []
    };
}

async function loadQuestionBank() {
    if (questionBankLoadPromise) {
        return questionBankLoadPromise;
    }

    questionBankLoadPromise = Promise.all(
        gradeBands.map(async (gradeBand) => {
            const response = await fetch(questionDataFiles[gradeBand]);

            if (!response.ok) {
                throw new Error(`Unable to load ${questionDataFiles[gradeBand]} (${response.status})`);
            }

            const data = await response.json();
            questionBank[gradeBand] = data.questions.map((question) => normalizeQuestion(question, gradeBand));
        })
    ).then(() => questionBank);

    return questionBankLoadPromise;
}

// Shuffle function using Fisher-Yates algorithm
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Function to get randomized questions for a specific grade
function getQuestionsForGrade(grade) {
    const allQuestions = questionBank[grade] || [];
    const config = examConfig[grade];

    if (!config) return allQuestions;

    // Separate questions by difficulty (based on points)
    const easyQuestions = allQuestions.filter(q => q.points === 3);
    const mediumQuestions = allQuestions.filter(q => q.points === 4);
    const hardQuestions = allQuestions.filter(q => q.points === 5);

    // Shuffle each category
    const shuffledEasy = shuffleArray(easyQuestions);
    const shuffledMedium = shuffleArray(mediumQuestions);
    const shuffledHard = shuffleArray(hardQuestions);

    // Select the required number from each category
    const selectedEasy = shuffledEasy.slice(0, Math.min(config.easy, shuffledEasy.length));
    const selectedMedium = shuffledMedium.slice(0, Math.min(config.medium, shuffledMedium.length));
    const selectedHard = shuffledHard.slice(0, Math.min(config.hard, shuffledHard.length));

    // Combine and return (easy first, then medium, then hard)
    return [...selectedEasy, ...selectedMedium, ...selectedHard];
}

// Get total question count for display
function getTotalQuestionCount() {
    let total = 0;
    for (const grade in questionBank) {
        total += questionBank[grade].length;
    }
    return total;
}

// Export for use in Node scripts
if (typeof module !== "undefined" && module.exports) {
    const fs = require("fs");
    const path = require("path");

    function loadQuestionBankFromDisk(baseDir = __dirname) {
        for (const gradeBand of gradeBands) {
            const filePath = path.join(baseDir, questionDataFiles[gradeBand]);
            const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
            questionBank[gradeBand] = data.questions.map((question) => normalizeQuestion(question, gradeBand));
        }

        return questionBank;
    }

    loadQuestionBankFromDisk();

    module.exports = {
        gradeBands,
        questionBank,
        questionDataFiles,
        loadQuestionBank,
        loadQuestionBankFromDisk,
        getQuestionsForGrade,
        examConfig,
        getTotalQuestionCount
    };
}
