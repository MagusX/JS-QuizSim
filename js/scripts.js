let form = document.querySelector("form");
let ans = [];
let testing = false;
let qCount = 1;
let score = 0;
let addQuestionBtn = document.getElementById("add-question");
let saveQuizBtn = document.getElementById("save-quiz");

function addOption(qId, choice, content) {
  let curQuestion = document.getElementById(qId);
  const option = newOption(qId, choice, content);
  curQuestion.appendChild(document.createElement("br"));
  curQuestion.appendChild(option[0]);
  curQuestion.appendChild(option[1]);
}

function nextChar(char) {
  return String.fromCharCode(char.charCodeAt(0) + 1);
}

function createAddOption(questionElement) {
  let button = document.createElement("button");
  const id = questionElement.id
  button.setAttribute("type", "button");
  button.setAttribute("class", "quiz-design");
  button.innerText = "Add choice A";

  let optionContent = document.createElement("input");
  optionContent.setAttribute("class", `quiz-design ${id}`);
  optionContent.setAttribute("type", "text");

  button.onclick = function(){
    let choice = button.innerText[button.innerText.length - 1];
    addOption(id, choice, optionContent.value);
    button.innerText = "Add choice " + nextChar(choice);
  };
  return [button, optionContent];
}

function newQuestion(number, content) {
  let question = document.createElement("p");
  question.setAttribute("id", number);
  question.innerText = number + ". " + content;

  return question;
}

function newOption(questionId, choice, content) {
  let option = document.createElement("input");
  const id = questionId + choice;
  option.setAttribute("class", "rdb");
  option.setAttribute("type", "radio");
  option.setAttribute("id", id);
  option.setAttribute("name", questionId);
  option.setAttribute("value", choice);
  
  let label = document.createElement("label");
  label.setAttribute("for", id);
  label.innerText = content;
  return [option, label];
}

addQuestionBtn.addEventListener("click", function(e) {
  let qSection = document.getElementById("questions");
  const qContent = document.getElementById("question-content").value;
  
  let question = newQuestion(qCount, qContent);
  let addOption = createAddOption(question);
  qSection.appendChild(question);

  qSection.appendChild(addOption[0]);
  qSection.appendChild(addOption[1]);
  addQuestionBtn.innerText = `Add question ${++qCount}`;
});

function saveAnswers() {
  let data = new FormData(form);
  for (const entry of data) {
    ans.push(entry[1]);
  };
}

function clearChecks() {
  let rdbs = document.getElementsByClassName("rdb");
  for (let rdb of rdbs) {
    rdb.checked = false;
  }
}

function removeQuizDesign() {
  let qds = document.getElementsByClassName("quiz-design");
  for (let i = qds.length - 1; i >= 0; i--) {
    qds[i].remove();
  }
}

function showResult() {
  form.remove();
  let res = document.createElement("p");
  res.innerText = `Your score: ${score}/${ans.length}`;
  document.querySelector("body").appendChild(res);
}

form.addEventListener("submit", function(e) {
  e.preventDefault();
  if (!testing) {
    saveAnswers();
    clearChecks();
    removeQuizDesign();
    saveQuizBtn.innerText = "Submit test";
    testing = true;
  } else {
    let data = new FormData(form);
    for (const entry of data) {
      let index = parseInt(entry[0]) - 1;
      if (entry[0] + entry[1] == entry[0] + ans[index]) {
        score++;
      }
    };
  
    showResult();
  }
}, false);
