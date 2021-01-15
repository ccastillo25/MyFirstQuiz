//All elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

// Questions
let questions = [
    {
        question : "Who won the world series in 2020?",
        imgSrc : "https://upload.wikimedia.org/wikipedia/en/thumb/3/3a/2020_World_Series_logo.svg/1200px-2020_World_Series_logo.svg.png",
        choiceA : "Dodgers",
        choiceB : "Braves",
        choiceC : "Rays?",
        correct : "A"
    },{
        question : "Who won the Super Bowl in 2020?",
        imgSrc : "https://upload.wikimedia.org/wikipedia/en/3/3d/Super_Bowl_LIV.png",
        choiceA : "Patriots",
        choiceB : "Cheifs",
        choiceC : "49ers",
        correct : "B"
    },{
        question : "Who won the Nba Finals in 2020?",
        imgSrc : "https://bloximages.newyork1.vip.townnews.com/manoanow.org/content/tncms/assets/v3/editorial/c/4a/c4a5af94-292c-11e6-b66f-db7d227042be/5750e1562952e.image.gif",
        choiceA : "Heat",
        choiceB : "Lakers",
        choiceC : "Celtics",
        correct : "B"
    }
];

//variables
const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10; 
const gaugeWidth = 150; 
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click",startQuiz);

function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); 
}

function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        score++;
        answerIsCorrect();
    }else{
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct/wrong
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block";
    
    const scorePerCent = Math.round(100 * score/questions.length);
    
    // Final Scores
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
}