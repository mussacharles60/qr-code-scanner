var button = document.getElementById('quiz-button');
button.onclick = () => {
    window.open("https://quiz-score-crdb.herokuapp.com/quiz", "_self")
    // window.open("http://localhost:8000/quiz", "_self")
}