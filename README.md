# Math Quest Portal 🧮

A beautiful, modern math practice portal featuring questions inspired by the [Math Kangaroo](https://mathkangaroo.org) international mathematics competition.

![Math Quest Portal](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## Features

- 🎓 **Grade-Based Practice**: Questions tailored for grades 1-2, 3-4, 5-6, 7-8, 9-10, and 11-12
- ⏱️ **Timed Exams**: Track your progress with a built-in timer
- ✅ **Instant Results**: See your score immediately after completing the exam
- 📊 **Detailed Review**: Review all answers with correct solutions
- 🎨 **Modern UI**: Beautiful dark theme with smooth animations
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile devices

## Getting Started

### Quick Start

1. Open `index.html` in your web browser
2. Select your grade level
3. Answer the questions
4. Submit and review your results!

### Using a Local Server (Recommended)

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (with http-server)
npx http-server -p 8000

# Then open http://localhost:8000 in your browser
```

## Project Structure

```
math-practice-portal/
├── index.html      # Main HTML file
├── styles.css      # Styles and animations
├── app.js          # Application logic
├── questions.js    # Question bank for all grades
└── README.md       # This file
```

## Question Categories

Each grade level includes 10 practice questions with varying difficulty:

| Grade Level | Topics Covered |
|-------------|----------------|
| Grades 1-2  | Basic counting, shapes, simple addition/subtraction |
| Grades 3-4  | Multiplication, division, time, fractions intro |
| Grades 5-6  | Percentages, geometry, basic algebra |
| Grades 7-8  | Pre-algebra, ratios, probability |
| Grades 9-10 | Algebra, trigonometry, coordinate geometry |
| Grades 11-12| Calculus, matrices, vectors |

## Point System

Questions are worth 3, 4, or 5 points based on difficulty:
- **3 points**: Easier questions
- **4 points**: Medium difficulty
- **5 points**: Challenging questions

## Source

Questions are inspired by the Math Kangaroo competition format:
- [Math Kangaroo Free Samples](https://mathkangaroo.org/mks/practice/free-question-samples/)

## Technologies Used

- HTML5
- CSS3 (with CSS Custom Properties)
- Vanilla JavaScript (ES6+)
- Google Fonts (Crimson Pro, Outfit, JetBrains Mono)

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## License

MIT License - feel free to use and modify!

---

Made with ❤️ for math enthusiasts

