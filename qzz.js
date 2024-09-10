// qzz.js
document.addEventListener('DOMContentLoaded', function() {
    const questions = [
        { question: 'What is the capital of France?', answers: ['Paris', 'London', 'Berlin', 'Madrid'], correct: 'Paris' },
        { question: 'Which planet is known as the Red Planet?', answers: ['Earth', 'Mars', 'Jupiter', 'Saturn'], correct: 'Mars' },
        { question: 'What is the largest ocean on Earth?', answers: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'], correct: 'Pacific Ocean' },
        { question: 'When india Was independent?', answers: ['1957','1947','1950','1847'], correct: '1947'},
        { question: 'How many letters are there in the English alphbet?', answer: ['21','25','29','26'], correct:'26'},
        ];

    let currentQuestionIndex = 0;
    let score = 0;
    let timerInterval;

    const questionElement = document.getElementById('question');
    const answersContainer = document.getElementById('answers');
    const resultElement = document.getElementById('result');
    const nextButton = document.getElementById('next-button');
    const timerElement = document.getElementById('timer');
    const finalScoreElement = document.getElementById('final-score');

    function loadQuestion(question) {
        questionElement.textContent = question.question;
        answersContainer.innerHTML = '';
        question.answers.forEach(answer => {
            const button = document.createElement('button');
            button.textContent = answer;
            button.classList.add('answer-btn');
            button.addEventListener('click', () => checkAnswer(answer, question.correct));
            answersContainer.appendChild(button);
        });
        resultElement.textContent = '';
        nextButton.style.display = 'none';
        startTimer();
    }

    function startTimer(){
        let timeLeft = 30;
        timerElement.textContent =`Time Left:${timeLeft}s` ;

        timerInterval = setInterval(() => {
            timeLeft--;
            timerElement.textContent = `Time Left:${timeLeft}s`;

            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                resultElement.textContent = 'time\'s up! Moving to next question...';
                resultElement.style.color = 'red';
                nextButton.style.display = 'block';
            }
        }, 1000);
    }

    function checkAnswer(selected, correct) {
        clearInterval(timerInterval);

        if (selected === correct) {
            resultElement.textContent = 'Correct! 🎉';
            resultElement.style.color = 'green';
            score++;
        } else {
            resultElement.textContent = 'Wrong answer. Try again!';
            resultElement.style.color = 'red';
        }
        nextButton.style.display = 'block';
    }

    nextButton.addEventListener('click', () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion(questions[currentQuestionIndex]);
        } else {
            questionElement.textContent = 'Quiz Completed!';
            answersContainer.innerHTML = '';
            nextButton.style.display = 'none';
            finalScoreElement.textContent = `Your final score is ${score} out of ${questions.length}`;
            finalScoreElement.style.display = 'block';
        }
    });

    loadQuestion(questions[currentQuestionIndex]);
});