const { examConfig, gradeBands, questionBank } = require('../questions.js');

const errors = [];
let totalQuestions = 0;

function addError(message) {
    errors.push(message);
}

for (const gradeBand of gradeBands) {
    const questions = questionBank[gradeBand];
    const config = examConfig[gradeBand];
    const ids = new Set();

    if (!Array.isArray(questions)) {
        addError(`${gradeBand}: missing questions array`);
        continue;
    }

    totalQuestions += questions.length;

    for (const question of questions) {
        const label = `${gradeBand} id ${question.id}`;

        if (question.gradeBand !== gradeBand) {
            addError(`${label}: gradeBand should be ${gradeBand}`);
        }

        if (ids.has(question.id)) {
            addError(`${label}: duplicate id`);
        }
        ids.add(question.id);

        if (!question.question || typeof question.question !== 'string') {
            addError(`${label}: missing question text`);
        }

        if (!Array.isArray(question.options) || question.options.length !== 5) {
            addError(`${label}: must have exactly 5 options`);
        } else {
            question.options.forEach((option, index) => {
                if (typeof option !== 'string' || option.trim() === '') {
                    addError(`${label}: option ${index} is blank`);
                }
            });
        }

        if (!Number.isInteger(question.correctAnswer)) {
            addError(`${label}: correctAnswer must be an integer`);
        } else if (!question.options || question.correctAnswer < 0 || question.correctAnswer >= question.options.length) {
            addError(`${label}: correctAnswer is outside options`);
        }

        if (![3, 4, 5].includes(question.points)) {
            addError(`${label}: points must be 3, 4, or 5`);
        }

        if (!question.source || typeof question.source !== 'string') {
            addError(`${label}: missing source`);
        }

        if (!Array.isArray(question.tags)) {
            addError(`${label}: tags must be an array`);
        }
    }

    if (config) {
        const easy = questions.filter((question) => question.points === 3).length;
        const medium = questions.filter((question) => question.points === 4).length;
        const hard = questions.filter((question) => question.points === 5).length;

        if (easy < config.easy) {
            addError(`${gradeBand}: needs ${config.easy} easy questions, has ${easy}`);
        }

        if (medium < config.medium) {
            addError(`${gradeBand}: needs ${config.medium} medium questions, has ${medium}`);
        }

        if (hard < config.hard) {
            addError(`${gradeBand}: needs ${config.hard} hard questions, has ${hard}`);
        }
    }
}

if (errors.length > 0) {
    console.error(errors.join('\n'));
    process.exit(1);
}

console.log(`Question validation passed for ${totalQuestions} questions.`);
