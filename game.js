const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#ProgressBarFull');


let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let container = 0
let availableQuestions = []


let questions = [
    {
        question: 'what is 2 + 2?',
        choice1: '2',
        choice2: '4',
        choice3: '21',
        choice4: '17',
        answer: 2,
    },
    {
        question: 'who is the greatest footballer of all time ? ',
        choice1: 'messi',
        choice2: 'ronaldo',
        choice3: 'maradona',
        choice4: 'pele',
        answer: 1,
    },
    {
        question: 'what time of the day do we have breakfast',
        choice1: 'midnight',
        choice2: 'evening',
        choice3: 'morning',
        choice4: 'afternoon',
        answer: 3,
    },
    {
        question: 'which month comes right before june ?',
        choice1: 'july',
        choice2: 'august',
        choice3: 'may',
        choice4: 'april',
        answer: 1,
    },
]


const SCORE_POINTS = 100
const MAX_QUESTIONS = 4


startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}


getNewQuestion = () =>{
    if (availableQuestions.length === 0 ||questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)
        return window.location.assign('./end.html')
    }

    // questionCounter++
    // progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    // progressBarFull.style.width =`${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice =>{
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice =>{
    choice.addEventListener('click', e=>{
        if (!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' :
        'incorrect'

        if (classToApply === 'correct'){
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(()=>{
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})


incrementScore = num =>{
    score +=num
    scoreText.innerText = score
}

startGame()