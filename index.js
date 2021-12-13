const jsDisplayBox = $('#jsDisplayBox');

// Create your initial store
// tracks progress over time
const STORE = {
  questions: [
    {
      question: 'Who can we thank for creating Calvin and Hobbes?',
      options: [
        'Bill Watterson',
        'Charles Schulz',
        'Stan Lee',
        'Frank Miller'
      ],
      answer: 'Bill Watterson'
    },

    {
      question: 'How did he come up with the name Hobbes?',
      options: [
        'It was the name of his own childhood cat',
        'He was named after Thomas Hobbes, a 17th century philosopher',
        'He was named after the mayor of his hometown where he grew up',
        'He used a rap name generator'
      ],
      answer: 'He was named after Thomas Hobbes, a 17th century philosopher'
    },

    {
      question: 'in Calvin and Hobbes\' secret club G.R.O.S.S. what does this acronym stand for?',
      options: [
        'Grownups R Overly Suppressive Slugs',
        'Girls R Oh So Silly',
        'Get Rid Of Slimy Susie',
        'Get Rid Of Slimy GirlS'
      ],
      answer: 'Get Rid Of Slimy GirlS'
    },

    {
      question: 'What is Calvin\'s favorite costume that his mother made for him?',
      options: [
        'Spaceman Spiff',
        'Tracer Bullet',
        'Stupendous Man',
        'Batman'
      ],
      answer: 'Stupendous Man'
    },

    {
      question: 'The Transmogrifier, Time Machine, and Duplicator are all the same of what object?',
      options: [
        'Trash can',
        'Blanket fort',
        'Large white sheet',
        'Large box'
      ],
      answer: 'Large box'
    },

    {
      question: 'What does the Tansmogrifier do?',
      options: [
        'Changes Calvin into any form of Play-Doh',
        'Changes Calvin into different animals',
        'Transforms Calvin into his Dad’s physical appearance',
        'Transforms Hobbes into another Calvin'
      ],
      answer: 'Changes Calvin into different animals'
    },

    {
      question: 'What was the name of Calvin and Hobbes\' favorite game where you can’t use the same rules twice?',
      options: [
        'Crazyball',
        'Calvinball',
        'Hobbescotch',
        'Calvinclues'
      ],
      answer: 'Calvinball'
    },

    {
      question: 'Who was Calvin\'s babysitter?',
      options: [
        'Margery',
        'Candice',
        'Rosalyn',
        'Kathy'
      ],
      answer: 'Rosalyn'
    },
    
    {
      question: 'What is the name of Calvin\'s teacher?',
      options: [
        'Mrs. Treebottom',
        'Mrs. Wormwood',
        'Mr. Hemlock',
        'Mrs. Ploomsey'
      ],
      answer: 'Mrs. Wormwood'
    },

    {
      question: 'From what years was “Calvin and Hobbes” syndicated?',
      options: [
        '1980 - 1985',
        '1985 - 1995',
        '1983 - 1993',
        '1987 - 1999'
      ],
      answer: '1985 - 1995'
    },
  ],
  questionNumber: 0,
  score: 0
};

function generateInitialState() {
  const start = 
    `<section class="startBox">
      <button id="startButton" class="button" type="button">Start</button>
    </section>`;
  const questionAndScore = 
    `<ul>
      <li class="tally">Question: 0/10</li>
      <li class="tally">Score: 0/10</li>
    </ul>`;

  $('.jsTallyBox').html(questionAndScore);
  jsDisplayBox.html(start);
}

function startQuiz() {
  $('#startButton').on('click', function(){
    renderQuestion();
  });
}

function updateQuestionAndScore() {
  const questionAndScore =
  `<ul>
      <li class="tallyQuestion tally">Question: ${STORE.questionNumber + 1}/${STORE.questions.length}</li>
      <li class="tallyScore tally">Score: ${STORE.score}/${STORE.questions.length}</li>
  </ul>`;
  $('.jsTallyBox').html(questionAndScore);
};

// option loop
function updateOptions() {
    let question = STORE.questions[STORE.questionNumber];
    
    for (let i = 0; i < question.options.length; i++) {
      let nextOptions = 
      `<input type="radio" class="option" name="options" id="option${i+1}" value="${question.options[i]}" tabindex="${i+1}">
      <label for="option${i+1}">${question.options[i]}</label> <br>`
      
      $('.jsOptions').append(nextOptions);
    };
}

function renderQuestion() {
  let question = STORE.questions[STORE.questionNumber];
  updateQuestionAndScore();

  const nextQuestion = 
  `<form id="jsForm">
    <fieldset>
      <section class="mainBox innerBox">
          <legend>${question.question.toUpperCase()}</legend>
          
          <div class="jsOptions"> </div>
      </section>

      <button id="submitButton" class="submit" type="submit">Submit</button>
    </fieldset>
  </form>`;
  
  jsDisplayBox.html(nextQuestion);
  updateOptions();
  //console.log(question.question);
}

function handleQuestions() {
  jsDisplayBox.on('click', '#nextButton', function() {
    STORE.questionNumber === STORE.questions.length ? displayResults() : renderQuestion();
    //console.log(renderQuestion());
  });
}

function handleAnswerSubmitted() {

  jsDisplayBox.on('submit', function(event) {
    event.preventDefault();
    let currentQ = STORE.questions[STORE.questionNumber++];
    let selectedOption = $('input[name=options]:checked').val();
    const correctDisplay = 
      `<section class="correctBox innerBox">
        <h2>CORRECT!</h2>
        <img src="images/dance.png" alt="Calvin and Hobbes dancing">
      </section>
      <button id="nextButton" class="submit" type="button">Next</button>`;

    //console.log(correctDisplay);

      const wrongDisplay = 
      `<section class="wrongBox innerBox">
        <h2>WRONG!</h2>
        <h3>Correct Answer:</h3>
        <p>${currentQ.answer}</p>
      </section>
      <button id="nextButton" class="submit" type="button">Next</button>`;
    
    //console.log('currentQ ', currentQ);
    //console.log('selectedOption ', selectedOption);

    if (!selectedOption) {
      alert("Choose an option");
      return;
    }

    if (selectedOption === currentQ.answer) {
      STORE.score++;
      jsDisplayBox.html(correctDisplay);
    } else {
      jsDisplayBox.html(wrongDisplay);
    }

    $('.tallyScore').html(`Score: ${STORE.score}/${STORE.questions.length}`);
  });
}

function displayResults() {
  let congrats = 
    `<div class="results">
      <h3>CONGRATS!</h3>
      <img src="images/happy.png" alt="Calvin and Hobbes laughing">
      <p>Your score is ${STORE.score}/${STORE.questions.length}</p>
      <button type="button" id="tryAgain">Try Again!</button>
    </div>`;
  let fail =
    `<div class="results fail">
      <h3>You need to study up on your Calvin and Hobbes!</h3>
      <img src="images/mad.png" alt="Calvin upset">
      <p>Your score is ${STORE.score}/${STORE.questions.length}</p>
      <button type="button" id="tryAgain">Try Again!</button>
    </div>`;

  if (STORE.score >= 7) {
    jsDisplayBox.html(congrats);
  }
  else {
    jsDisplayBox.html(fail);
  }

  STORE.questionNumber = 0;
  STORE.score = 0;
}

function restartQuiz() {
  $('body').on('click', '#tryAgain', function() {
    renderQuestion();
  });
}

// initialize event listeners when DOM is ready

$(function(){
    generateInitialState();
    startQuiz();
    handleQuestions();
    handleAnswerSubmitted();
    restartQuiz();
});