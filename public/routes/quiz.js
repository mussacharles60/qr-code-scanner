firebase.initializeApp({
    apiKey: "AIzaSyDBPyzFmYnckn5nzFjazGEmdITBNPNA18g",
    authDomain: "crdb-learn.firebaseapp.com",
    projectId: "crdb-learn",
    databaseUrl: "https://crdb-learn-default-rtdb.firebaseio.com",
    storageBucket: "crdb-learn.appspot.com",
    messagingSenderId: "653943808965",
    appId: "1:653943808965:web:294233ff4ebaec31a821ac"
});

const registrations_page = document.getElementById('registration-page');
const questions_page = document.getElementById('questions-page');
const results_page = document.getElementById('results-page');


registrations_page.style.display = "block";
questions_page.style.display = "none";
results_page.style.display = "none";

showSection(1);

function showSection(id) {
    document.getElementById('section-a').style.display = id === 1 ? "block" : "none";
    document.getElementById('section-b').style.display = id === 2 ? "block" : "none";
    document.getElementById('section-c').style.display = id === 3 ? "block" : "none";
    document.getElementById('section-d').style.display = id === 4 ? "block" : "none";
    document.getElementById('section-e').style.display = id === 5 ? "block" : "none";
    document.getElementById('section-f').style.display = id === 6 ? "block" : "none";
    document.getElementById('section-g').style.display = id === 7 ? "block" : "none";
    document.getElementById('section-h').style.display = id === 8 ? "block" : "none";
}

var radios = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
];

var answers = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
];

var occurance = null;

var _name = '';
var _email = '';
var _phone = '';

function onRegisterClick() {
    var $name_field = $('input[name="the-name"]')
    var $email_field = $('input[name="the-email"]')
    var $phone_field = $('input[name="the-phone"]')

    // console.log('_name: ', $name_field.val())
    // console.log('_email: ', $email_field.val())
    // console.log('_phone: ', $phone_field.val())

    if ($name_field.val().length > 0) {
        _name = $name_field.val();
        _email = $email_field.val();
        _phone = $phone_field.val();

        registrations_page.style.display = "none";
        questions_page.style.display = "block";
        results_page.style.display = "none";
        // savePDF()
    } else {
        alert('Please provide your name to continue')
    }
}

var results = [{
        title: "You are a visual learner.",
        details: [
            "Sit in the front of the class or meeting so you can see everything.",
            "Sketch course content.  Even the simplest sketch can help you remember ideas.",
            "List your tasks – even the ones you have completed – just to have the satisfaction of visually crossing out tasks done.",
            "Write notes on your favorite colored sticky-notes to help you remember and paste them around your room.",
            "An uncluttered desk may help in clearing your mind to be able to study better.",
            "Write yourself encouraging notes and post them where you can see them.",
            "Create mind maps, flowcharts, or other graphic organizers.",
        ],
        tips: {
            title: "Study Tips for the Visual Learner",
            description: "Visual learners tend to learn information by seeing, whether through reading or watching.  Reading textbooks, material on the board or on overhead projectors, as well as demonstrations and diagrams are helpful.  The following list contains strategies for Visual learners.",
            items: [
                "Write things down because you remember them better that way.",
                "Make study area visually appealing.",
                "Look at people and professors when they talk.  This technique will help you stay focused.",
                "Most visual learners study better by themselves.",
                "Take thorough notes in lectures and when studying textbooks.  Review and revise notes after class, preferably immediately after class while you still remember a good deal of the lecture, to reinforce your knowledge.",
                "Read assignments in 25 minute intervals (you lose 85% of your input after reading for 25 minutes).",
                "When beginning a textbook chapter, read the chapter overview and summary first to get a general idea of the information.  Then begin reading.",
                "Underline main points in an eye-arresting color – for example, neon highlighters.",
                "After 25 minutes, take a one-to-five minute break.  Disconnect totally from your reading (walk around the room, stretch, look out the window, snack, restroom break, whatever is comfortable for you).",
                "Review your underlined/highlighted material after your break.",
                "Read for another 25 minutes, take a 1-to-5 minute break, and review underlined material.",
                "Just before closing your book, review all underlined material read that day to reinforce your learning.",
                "Write new vocabulary words on colored index cards (or write in color on white index cards) with short definitions on the back.  Carry these with you and review them at odd moments or whenever you have spare time – for example, before class or when waiting in line.",
            ]
        }
    },
    {
        title: "You are an auditory learner.",
        details: [
            "Tape record the class session and listen to your tape later for reference and repetition.  It may also help if you listen to it casually while walking to class or before falling asleep.",
            "Read your textbook and notes aloud as you study.  You could even record them as you do so.",
            "Teach yourself to read aloud in your mind without making sound.  During exams, you can hear the test questions as well as see them.",
            "Study with a partner or in a group.  When studying with others, you can hear what they say, and hear yourself teaching them as well.  This will reinforce your understanding of the material. ",
            "Proofread your assignments out loud.",
        ],
        tips: {
            title: "Study Tips for the Auditory Learner",
            description: "Auditory learners benefit from listening – hearing the information and processing it accordingly.  Auditory learners focus easily on sounds and have good memory of what they have heard through lectures or tape.  The following hints are useful for Auditory learners.",
            items: [
                "Try studying with a friend so that you can talk out loud and hear the information.",
                "Recite out loud the things you want to remember.",
                "Tape your lectures and review your notes while listening to your tape.  This gives a double auditory input.  Transfer your notes to index cards that you can carry with you and review aloud.",
                "Read an assignment for 25 minutes (no more – you lose 85% of your input after the first 25 minutes).  When beginning a textbook chapter, read the summary to get a general idea of the information.  Then begin the reading.  (You might even try reading aloud).",
                "Underline main points in an eye-arresting color – for example, neon highlighters.",
                "After 25 minutes, take a one-to-five minute break.  Disconnect totally from your reading – exercise, snack, relax – whatever is comfortable for you.",
                "Review aloud all underlined materials.  If you take notes in addition to underlining the book, read your notes aloud as well.",
                "Read for another 25 minutes and underline.",
                "Take a 1-to-5 minute break.",
                "Review aloud from beginning of underlined material.  Repeat.",
            ]
        }
    },
    {
        title: "You are a tactile/kinesthetic learner.",
        details: [
            "Sit where you can actively participate in classroom events and discussions.",
            "Take notes creatively.  For instance, draw quick pictures in class that relates to the material being taught.",
            "Ask and answer questions before, during, and after class.",
            "Make models of the concepts whenever possible.",
            "Move around while you are studying.  For instance, you can simply walk around in your room.",
            "Study on a whiteboard.  Draw flowcharts, mind maps, or simply rewrite the notes.",
            "Incorporate pictures of models, if possible.",
            "Make physical comfort a priority as you study.",
            "Make note cards and create sample tests that you can take for review.",
        ],
        tips: {
            title: "Study Tips for the Tactile/Kinesthetic Learner",
            description: "Tactile learners acquire knowledge best through manipulation – doing, touching, hands-on, and writing techniques.  Primary Tactile learners would benefit from finding their secondary learning mode and use the directions for either Visual or Auditory in conjunction with the following hints.",
            items: [
                "Write things down because you remember them better that way.",
                "Try studying with a friend so that you can talk out loud and hear the information.",
                "When memorizing, pace or walk around while reciting to yourself or looking at a note card, and also try writing the information on a desk with your finger.",
                "Keep something in your hand that is malleable.  Knead or tap to a rhythm as you study.  As much as you can, translate what you are learning into something that can be touched.  Typing is helpful, as is writing your notes.  If possible, type your notes on index cards.  Eating, drinking, chewing gum, and listening to music are also helpful.",
                "Read an assignment for 25 minutes (no more – you lose 85% of your input after the first 25 minutes).  When beginning a textbook chapter, read the summary to get a general idea of the information.  Then begin the reading. ",
                "Underline main points in an eye-arresting color – for example, neon highlighters.",
                "After 25 minutes, take a one-to-five minute break.  Disconnect totally from your reading – exercise, snack, relax – whatever is comfortable for you.",
                "Review all underlined materials after your break.  If auditory is your secondary preference, review aloud all underlined materials.",
                "Read for another 25 minutes and underline.",
                "Take a 1-to-5 minute break.",
                "Review aloud from beginning of underlined material.",
            ]
        }
    }
]

function onRadioClick(id) {
    //    console.log('radio click: ' + id)
    if (id.startsWith('a')) {
        radios[0] = id;
    } else if (id.startsWith('b')) {
        radios[1] = id;
    } else if (id.startsWith('c')) {
        radios[2] = id;
    } else if (id.startsWith('d')) {
        radios[3] = id;
    } else if (id.startsWith('e')) {
        radios[4] = id;
    } else if (id.startsWith('f')) {
        radios[5] = id;
    } else if (id.startsWith('g')) {
        radios[6] = id;
    } else if (id.startsWith('h')) {
        radios[7] = id;
    }
}

function onContinueBtnClick(id) {
    // console.log('btn click: ' + id)
    if (id === 'q-1') {
        if (radios[0] !== null) {
            showSection(2)
        }
    } else if (id === 'q-2') {
        if (radios[1] !== null) {
            showSection(3)
        }
    } else if (id === 'q-3') {
        if (radios[2] !== null) {
            showSection(4)
        }
    } else if (id === 'q-4') {
        if (radios[3] !== null) {
            showSection(5)
        }
    } else if (id === 'q-5') {
        if (radios[4] !== null) {
            showSection(6)
        }
    } else if (id === 'q-6') {
        if (radios[5] !== null) {
            showSection(7)
        }
    } else if (id === 'q-7') {
        if (radios[6] !== null) {
            showSection(8)
        }
    } else if (id === 'q-8') {
        if (radios[7] !== null) {
            showSection(0)
            getActualAnswers()
            findOccurance()
            showResults()
            submitResult()
        }
    }
}

function getActualAnswers() {
    for (var i = 0; i < radios.length; i++) {
        const radio = radios[i];
        if (radio.endsWith('1')) {
            answers[i] = 'a';
        } else if (radio.endsWith('2')) {
            answers[i] = 'b';
        } else if (radio.endsWith('3')) {
            answers[i] = 'c';
        }
    }

    // console.log('answers: ', answers);
}

function findOccurance() {
    var a = 0;
    var b = 0;
    var c = 0;

    answers.forEach(answer => {
        if (answer === 'a') {
            a++;
        } else if (answer === 'b') {
            b++;
        } else if (answer === 'c') {
            c++;
        }
    });

    if (a > b && a > c) {
        occurance = 'a';
    } else if (b > a && b > c) {
        occurance = 'b';
    } else if (c > a && c > b) {
        occurance = 'c';
    } else if (a > b) {
        occurance = 'a';
    } else if (a > c) {
        occurance = 'a';
    } else if (b > a) {
        occurance = 'b';
    } else if (b > c) {
        occurance = 'b';
    } else if (c > a) {
        occurance = 'c';
    } else if (c > b) {
        occurance = 'c';
    }
    // console.log('most-answer: ' + occurance);
}

function showResults() {
    questions_page.style.display = "none";
    results_page.style.display = "block";

    var result = results[0]
    if (occurance === 'a') {
        result = results[0]
    } else if (occurance === 'b') {
        result = results[1]
    } else if (occurance === 'c') {
        result = results[2]
    }
    document.getElementById('result-title').innerHTML = result.title;
    var detailsHtml = '<ul>'
    result.details.forEach(detail => {
        detailsHtml += `<li>${detail}</li>`;
    });
    detailsHtml += `</ul>`
    var listDiv = document.createElement('div');
    listDiv.innerHTML = detailsHtml;
    document.getElementById('details-lay').appendChild(listDiv);

    document.getElementById('tips-title').innerHTML = result.tips.title;
    document.getElementById('tips-desc').innerHTML = result.tips.description;

    var itemsHtml = '<ul>'
    result.tips.items.forEach(item => {
        itemsHtml += `<li>${item}</li>`;
    });
    itemsHtml += `</ul>`
    var listDiv2 = document.createElement('div');
    listDiv2.innerHTML = itemsHtml;
    document.getElementById('tips-items-lay').appendChild(listDiv2);
}

function submitResult() {
    var _results = answers.toString();
    console.log('results: ', _results)
    var d = new Date();
    var n = d.valueOf();

    var ref = firebase.database().ref().child('candidates')
    var childRef = ref.push({
        name: _name,
        email: _email,
        phone: _phone,
        results: _results,
        most_answer: occurance,
        date_added: n
    });
    ref.child(childRef.key).update({ id: childRef.key });
}

function onDownloadBtnClick() {
    savePDF();
}

// pdfMake.vfs = pdfFonts.pdfMake.vfs;

function savePDF() {

    var result = results[0]
    if (occurance === 'a') {
        result = results[0]
    } else if (occurance === 'b') {
        result = results[1]
    } else if (occurance === 'c') {
        result = results[2]
    }

    // var doc = new jsPDF({
    //     orientation: 'landscape'
    // });
    const doc = new jsPDF();

    doc.setFont("times");
    doc.setFontSize(12);
    var row_number = 10;

    doc.setFontType("bold");
    doc.setTextColor(26, 114, 18);
    doc.text(10, row_number, '------------------------------------- CRDB --------------------------------------------');

    doc.setFontSize(12);

    doc.setFontType("bold");
    doc.setTextColor(26, 114, 18);
    // doc.setTextColor(137, 167, 25);
    var row_number = row_number + 7;
    doc.text(10, row_number, 'Discover your Learning Style with CRDB');

    doc.setFontSize(12);

    doc.setFontType("normal");
    doc.setTextColor(0, 0, 0);
    row_number = row_number + 8
    doc.text(10, row_number, _name + ' - Your Results');

    doc.setFontSize(12);
    doc.setFontType("italic");

    row_number = row_number + 7
    doc.text(10, row_number, '-------------------------------------------------------------------------------------------');

    doc.setFontSize(14);

    row_number = row_number + 3;
    doc.text(10, row_number, '')

    doc.setFontType("bold");
    doc.setTextColor(44, 22, 124);
    row_number = row_number + 7
    doc.text(10, row_number, '***   ' + result.title + '   ***') // you are a visual...

    doc.setFontSize(10);

    row_number = row_number + 3;
    doc.text(10, row_number, '')

    doc.setFont("times");
    doc.setFontType("normal");
    doc.setTextColor(0, 0, 0);
    for (var i = 0; i < result.details.length; i++) {
        if (result.details[i].length > 80) {
            var segments = result.details[i].match(/.{1,80}/g) // split by n characters
            for (var j = 0; j < segments.length; j++) {
                row_number = row_number + 5;
                if (j == 0) doc.text(10, row_number, '-  ' + segments[j])
                else doc.text(10, row_number, '   ' + segments[j])
            }
        } else {
            row_number = row_number + 5;
            doc.text(10, row_number, '-  ' + result.details[i])
        }
    }

    doc.setFontSize(11);

    row_number = row_number + 3;
    doc.text(10, row_number, '')

    doc.setFontType("bold");
    doc.setTextColor(44, 22, 124);
    row_number = row_number + 8
    doc.text(10, row_number, '      ' + result.tips.title + '      ')

    doc.setFontSize(10);

    row_number = row_number + 3;
    doc.text(10, row_number, '')

    doc.setFontType("bolditalic");
    doc.setTextColor(0, 0, 0);
    if (result.tips.description.length > 80) {
        var segments = result.tips.description.match(/.{1,80}/g) // split by n characters
        for (var p = 0; p < segments.length; p++) {
            row_number = row_number + 5;
            doc.text(10, row_number, segments[p])
        }
    } else {
        row_number = row_number + 6;
        doc.text(10, row_number, result.tips.description)
    }

    doc.setFontSize(10);

    doc.setFontType("normal");
    doc.setTextColor(0, 0, 0);

    row_number = row_number + 4;
    doc.text(10, row_number, '')

    for (var x = 0; x < result.tips.items.length; x++) {
        if (result.tips.items[x].length > 80) {
            var segments = result.tips.items[x].match(/.{1,80}/g) // split by n characters
            for (var y = 0; y < segments.length; y++) {
                row_number = row_number + 5;
                if (y == 0) doc.text(10, row_number, '-  ' + segments[y])
                else doc.text(10, row_number, '   ' + segments[y])
            }
        } else {
            row_number = row_number + 5;
            doc.text(10, row_number, '-  ' + result.tips.items[x])
        }
    }

    doc.setFontSize(9);

    row_number = row_number + 7;

    doc.setFontType("courier");
    doc.setTextColor(99, 99, 99);

    doc.text(10, row_number, '                                   --- Thank you for being with us. @ CRDB 2021 ---')

    doc.setFontSize(12);

    doc.setFontType("italic");
    doc.setTextColor(0, 0, 0);

    row_number = row_number + 10
    doc.text(10, row_number, '-------------------------------------------------------------------------------------------');






    // for (var i = 0; i > result.tips.items.length; i++) {
    //     row_number = i + 5;
    //     doc.text(10, row_number, '-  ' + result.tips.items[i])
    // }
    // doc.text("Hello world!", 10, 10);
    // doc.save("LEARN-WITH-CRDB.pdf");

    // var elementHTML = $('#results-page').html();
    // var specialElementHandlers = {
    //     '#elementH': function(element, renderer) {
    //         return true;
    //     }
    // };
    // doc.fromHTML(elementHTML, 5, 5, {
    //     'width': 150,
    //     // 'elementHandlers': specialElementHandlers
    // });

    // doc.text(20, 20, 'This is the default font.');

    // doc.setFont("courier");
    // doc.setFontType("normal");
    // doc.text(20, 30, 'This is courier normal.');

    // doc.setFont("times");
    // doc.setFontType("italic");
    // doc.text(20, 40, 'This is times italic.');

    // doc.setFont("helvetica");
    // doc.setFontType("bold");
    // doc.text(20, 50, 'This is helvetica bold.');

    // doc.setFont("courier");
    // doc.setFontType("bolditalic");
    // doc.text(20, 60, 'This is courier bolditalic.');

    // doc.setFontSize(24);
    // doc.text(20, 20, 'This is a title');

    // doc.setFontSize(16);
    // doc.text(20, 30, 'This is some normal sized text underneath.');

    // doc.setTextColor(100);
    // doc.text(20, 20, 'This is gray.');

    // doc.setTextColor(150);
    // doc.text(20, 30, 'This is light gray.');

    // doc.setTextColor(255, 0, 0);
    // doc.text(20, 40, 'This is red.');

    // doc.setTextColor(0, 255, 0);
    // doc.text(20, 50, 'This is green.');

    // doc.setTextColor(0, 0, 255);
    // doc.text(20, 60, 'This is blue.');

    // Save the PDF
    doc.save('LEARN-WITH-CRDB-2021.pdf');
}











// $.ajax({
//     type: 'POST',
//     url: 'https://vending.imperialinnovations.co.tz/api/insert.php?apikey=5555&action=crdbQuiz',
//     data: JSON.stringify({
//         name: _name,
//         email: _email,
//         phone: _phone,
//         results: _results,
//         most_answer: occurance,
//     }),
//     dataType: "json",
//     headers: {
//         'Access-Control-Allow-Origin': 'https://quiz-score-crdb.herokuapp.com/',
//     },
//     contentType: "application/json; charset=utf-8",
//     success: function(resultData) {
//         console.log("QUERY RESPONSE: ", resultData);
//     },
//     error: function(error) {
//         console.log("QUERY ERROR: ", error);
//     },
// });

// let options = {
//     // mode: "no-cors",
//     method: 'POST',
//     headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//         'Access-Control-Allow-Origin': '*',
//         'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
//     },
//     body: JSON.stringify({
//         name: _name,
//         email: _email,
//         phone: _phone,
//         results: _results,
//         most_answer: occurance,
//     })
// }

// console.log('fetch option: ', options)

// var ajax = new XMLHttpRequest();
// var data = {
//     name: _name,
//     email: _email,
//     phone: _phone,
//     results: _results,
//     most_answer: occurance,
// };
// var formdata = new FormData(data);
// ajax.open("POST", "/completed", true);
// ajax.send(formdata);

// try {
//     fetch('https://vending.imperialinnovations.co.tz/api/insert.php?apikey=5555&action=crdbQuiz', options)
//         .then(response => {
//             console.log('QUERY RESPONSE: ', response)
//             return response.json();
//         })
//         .then(result => {
//             console.log('QUERY RESULT: ', result)
//         })
//         .catch(error => {
//             console.log('QUERY ERROR: ', error)
//         });
// } catch (error) {
//     console.log('QUERY ERROR - CATCH: ', error)
// };

// (async() => {
//     const rawResponse = await fetch('https://vending.imperialinnovations.co.tz/api/insert.php?apikey=5555&action=crdbQuiz', {
//         method: 'POST',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//             // 'Content-Type': 'application/x-www-form-urlencoded',
//             // 'Access-Control-Allow-Origin': '*',
//         },
//         mode: "no-cors",
//         body: JSON.stringify({
//             name: _name,
//             email: _email,
//             phone: _phone,
//             results: _results,
//             most_answer: occurance,
//         })
//     });
//     const content = await rawResponse.json();

//     console.log(content);
// })();