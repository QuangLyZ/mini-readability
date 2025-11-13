// ========================== THEME SWITCH ==========================
const themeSwitch = document.getElementById('toggle');
let isDark = localStorage.getItem('theme') === 'dark';

const themeTargets = [
  { light: 'display-light', dark: 'display-night' },
  { light: 'header-light', dark: 'header-night' },
  { light: 'prog-name-light', dark: 'prog-name-night' },
  { light: 'input-frame-light', dark: 'input-frame-night' },
  { light: 'input-light', dark: 'input-night' },
  { light: 'btn-light', dark: 'btn-night' },
  { light: 'grade-light', dark: 'grade-night' },
  { light: 'sum-board-light', dark: 'sum-board-night' },
];

function enableDark() {
  themeTargets.forEach(({ light, dark }) => {
    document.querySelectorAll(`.${light}`).forEach(el => {
      el.classList.replace(light, dark);
    });
  });
  localStorage.setItem('theme', 'dark');
}

function disableDark() {
  themeTargets.forEach(({ light, dark }) => {
    document.querySelectorAll(`.${dark}`).forEach(el => {
      el.classList.replace(dark, light);
    });
  });
  localStorage.setItem('theme', 'light');
}

if (isDark) enableDark();

themeSwitch.addEventListener('click', () => {
  isDark = !isDark;
  isDark ? enableDark() : disableDark();
});

// ========================== READABILITY ==========================
function readability(text) {
  let countLetter = 0, countWord = 0, countSentence = 0;
  let inWord = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (/[a-zA-Z]/.test(ch)) countLetter++;
    if (/\s/.test(ch)) inWord = false;
    else if (!inWord) { inWord = true; countWord++; }
    if (/[.!?]/.test(ch)) countSentence++;
  }

  if (countWord === 0) return null;

  const L = (countLetter / countWord) * 100;
  const S = (countSentence / countWord) * 100;
  const index = 0.0588 * L - 0.296 * S - 15.8;
  const grade = Math.round(index);

  return { grade, countLetter, countWord, countSentence, L, S };
}

// ========================== PAGE LOGIC ==========================
const homePage = document.getElementById('homePage');
const resultPage = document.getElementById('result');
const analyseBtn = document.getElementById('analyseBtn');
const finishBtn = document.getElementById('finishBtn');
const inputTxt = document.getElementById('inputTxt');

// Ẩn trang kết quả khi load
resultPage.style.display = 'none';

// Analyse button
analyseBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const input = inputTxt.value.trim();
  if (!input) return alert('Please, add some text!');

  const result = readability(input);
  if (!result) return alert('No valid words found.');

  const gradeText = result.grade < 1 ? 'Under Grade 1'
    : result.grade >= 16 ? 'Grade 16+'
    : `Grade ${result.grade}`;

const gradeDescriptions = {
  1: 'Simple words, short sentences',
  2: 'Easy, child-friendly text',
  3: 'Basic sentences, simple vocabulary',
  4: 'Slightly more complex sentences',
  5: 'Moderate, some abstract words',
  6: 'Average, middle-school level',
  7: 'Moderate difficulty, longer sentences',
  8: 'Clear ideas, some complexity',
  9: 'Longer sentences, abstract concepts',
  10: 'Advanced vocabulary, nuanced meaning',
  11: 'Difficult, strong comprehension needed',
  12: 'Very complex, formal style',
  13: 'Very complex, formal style',
  14: 'College-level, abstract ideas',
  15: 'College-level, abstract ideas',
  16: 'College-level, abstract ideas',
};

let gradeDesc;
if (result.grade < 1) gradeDesc = gradeDescriptions[1];
else if (result.grade >= 16) gradeDesc = 'Graduate-level, professional text';
else gradeDesc = gradeDescriptions[result.grade];

document.getElementById('gTxt').innerText = gradeDesc;
document.getElementById('gNumb').innerText = gradeText;
document.getElementById('letter').innerText = result.countLetter;
document.getElementById('word').innerText = result.countWord;
document.getElementById('sentence').innerText = result.countSentence;
document.getElementById('sIndex').innerText = result.S.toFixed(2);
document.getElementById('lIndex').innerText = result.L.toFixed(2);
  homePage.style.display = 'none';
  resultPage.style.display = 'block';
});

// Finish button
finishBtn.addEventListener('click', (e) => {
  e.preventDefault();
  inputTxt.value = '';
  resultPage.style.display = 'none';
  homePage.style.display = 'block';
});