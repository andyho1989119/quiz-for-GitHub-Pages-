
function getChapterQuestions(ch) {
  const start = (ch - 1) * 100 + 1;
  const end = ch * 100;
  return questions.filter(q => q.id >= start && q.id <= end);
}

function loadQuiz(chapter) {
  const container = document.getElementById("quizContainer");
  container.innerHTML = "";
  const list = getChapterQuestions(chapter);
  list.forEach((q, idx) => {
    const card = document.createElement("div");
    card.className = "question-card";
    card.innerHTML = `
      <div><strong>(${idx + 1})</strong> ${q.text}</div>
      <div class="options">
        ${Object.entries(q.options).map(([k, v]) =>
          `<label><input type="radio" name="q${q.id}" value="${k}"> ${k}. ${v}</label>`).join("")}
      </div>
      <div id="explain${q.id}" class="explanation"></div>
    `;
    container.appendChild(card);
  });
}

function submitQuiz() {
  const chapter = +document.getElementById("chapterSelect").value;
  const list = getChapterQuestions(chapter);
  let correct = 0;
  list.forEach(q => {
    const selected = document.querySelector(`input[name="q${q.id}"]:checked`);
    const userAnswer = selected ? selected.value : "";
    const explainEl = document.getElementById("explain" + q.id);
    if (userAnswer === q.answer) {
      correct++;
      explainEl.innerHTML = `<div class="correct">✔ 正確</div>`;
    } else {
      explainEl.innerHTML = `<div class="incorrect">✘ 錯誤，正確答案是 ${q.answer}<br>🔍 ${q.explanation}</div>`;
    }
  });
  document.getElementById("resultContainer").innerHTML = `<h2>成績：${correct} / ${list.length}</h2>`;
}

document.getElementById("chapterSelect").addEventListener("change", e => {
  loadQuiz(+e.target.value);
});
window.onload = () => loadQuiz(1);
