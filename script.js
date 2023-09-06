// =================== HeaderTemplate
// Diese async-Funktion wird verwendet, um HTML-Inhalte dynamisch in die Webseite einzufügen.

async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');  // Alle Elemente mit dem Attribut 'w3-include-html' auswählen.

    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
    // Den Wert des 'w3-include-html'-Attributs abrufen, das den zu inkludierenden Dateipfad angibt.
        file = element.getAttribute("w3-include-html"); // "includes/header.html"
    // Die Datei über den angegebenen Pfad abrufen.
        let resp = await fetch(file);
        if (resp.ok) {
    // Wenn die Datei erfolgreich abgerufen wurde, wird der Innere HTML-Inhalt des Elements auf den Inhalt der Datei gesetzt.
            element.innerHTML = await resp.text();
        } else {
    // Wenn das Abrufen der Datei fehlschlägt, wird 'Seite nicht gefunden' im Element angezeigt.
            element.innerHTML = 'Page not found';
        }
    }
}

/* ================= Content ==================== */

function render() {
    loadfromLocalStorage();
    includeHTML();
    showContent();
    showProfile();
}



let posts = [
    {
        "user": "ThinkedIn",
        "photo": "img/firmaWerbung.png",
        "image": "img/thinkedIn.jpg",
        "description": "Finde jetzt DEINEN passenden Job auf ThinkedIn",
        "likes": [],
        "comments": []
    },
    {
        'user': 'Heilige IT Gesellschaft',
        'photo': 'img/firmaWerbung.png',
        'image': 'img/beruf.jpg',
        'description': 'Wir stellen ein! Werde jetzt IT Security Analyst im weltweit erfolgreichsten Unternehmen!',
        'likes': [],
        "comments": []
    },
    {
        'user': 'Werbung muss sein gmbH',
        'photo': 'img/firmaWerbung.png',
        'image': 'img/werbung.jpg',
        'description': 'Präsentiere jetzt DEIN Unternehmen auf unseren Werbetafeln!',
        'likes': [],
        "comments": []
    }
];

// Diese Funktion generiert und zeigt den Inhalt basierend auf dem 'posts'-Array an.
function showContent() { 
    for (let i = 0; i < posts.length; i++) {
        let infoPost = posts[i];
        document.getElementById('input_container').innerHTML +=`
        <div class="single_post">
            <div class="author">
            <img class="profile_photos" src="${infoPost['photo']}">
            ${infoPost['user']}
            </div>

            <div class="image_post">
                <img src="${infoPost['image']}">
            </div>
            <div class="social_buttons">
                <img onclick="like(${i})" id="heart_like" class="buttons_inPost" src="./img/likebutton.png" alt="likebutton"></a>
                <img class="buttons_inPost" src="./img/commentbutton.png" alt="commentbutton"></a>
                <img class="buttons_inPost" src="./img/sendbutton.png" alt="nachrichtenbutton"></a>
                <p class="likes" id="likenumber">Gefällt ${infoPost['likes']} mal</p>
                <p class="description_text">${infoPost['description']}</p>
            </div>
            <div id="new_comment_${i}"></div>
            <div class="new_comment">
                <input id="author_${i}" class="input_name" type="text" placeholder="Dein Name">
                <textarea rows="4" cols="50" id="input_comment_${i}" class="input_comment" wrap="off" placeholder="Dein Kommentar"></textarea> 
                <button class="button_comment" onclick="newComment(${i})">Absenden!</button>
            </div>
        </div>
        `
    }
}


let suggestions = [
    {
        'profilename': 'Frauke97', 
        'profileImg': 'img/firmaWerbung.png', 
    },
    {
        'profilename': 'Rambazamba11',
        'profileImg': 'img/markus.jpg',
    },
    {
        'profilename': 'MaggyFreak',
        'profileImg': 'img/maggy.jpg',
    },
]

// Diese Funktion generiert den rechten Bereich (Vorschläge für dich etc.)
function showProfile() { // Die Funktion nenne ich showProfile da sie die Profile rechts anzeigt
    document.getElementById('profiles').innerHTML = ''; //Wir leeren es bevor es den neuen Content bekommt
    for (let i = 0; i < suggestions.length; i++) { //i bekommt den Wert 0, damit in den Texten auf die richtige Position im Array zugegriffen wird, die Forschleife läuft solange durch, bis die letzte Position im Array erreicht ist.
        const sugInfo = suggestions[i]; //Da suggestions global ist eig überflüssig eine neue Variable dessen Wert zu geben.
        document.getElementById('profiles').innerHTML += //fügt in den Container "profiles" folgenden HTML Code ein:
        `
        <div class="line">  
            <div class="imgAndPic">
                <img class="buttons_header lisas_pic" src="${sugInfo['profileImg']}" alt="Profilbild">
                <p class="profilName">${sugInfo['profilename']}</p>
            </div>

            <div class="abo">
                <p>Abonnieren</p>
            </div>  
         </div>
        `
    }
}


// Diese Funktion behandelt das Absenden eines neuen Kommentars.

function newComment(x) {
    posts[x]["comments"].push(
        {
            "author": document.getElementById(`author_${x}`).value,
            "content": document.getElementById(`input_comment_${x}`).value
        }
    )
    document.getElementById(`new_comment_${x}`).innerHTML = '';
    for (let i = 0; i < posts[x]['comments'].length; i++) {
        document.getElementById(`new_comment_${x}`).innerHTML += `
        <div class="author"> ${posts[x]["comments"][i]["author"]}</div>
            <div class="social_buttons">
                <p class="description_text">${posts[x]["comments"][i]["content"]}</p>
                <img class="buttons_inPost" src="./img/likebutton.png" alt="likebutton"></a>
                <img class="buttons_inPost" src="./img/commentbutton.png" alt="commentbutton"></a>
                <img class="buttons_inPost" src="./img/sendbutton.png" alt="nachrichtenbutton"></a>
            </div>`;
    }
    saveInLocalStorage(x);
    render();
    document.getElementById(`author_${x}`).value = ''; // Eingabefelder leeren.
    document.getElementById(`input_comment_${x}`).value = ''; // Eingabefelder leeren.
}


// in den LocalStorage speichern
function saveInLocalStorage(x){
    let postsJSON = JSON.stringify(posts);
    localStorage.setItem('posts', postsJSON);
}

// aus dem LocalStorage laden
function loadfromLocalStorage(){
    const storedPostsJSON = localStorage.getItem('posts');
    if (storedPostsJSON) {
        posts = JSON.parse(storedPostsJSON);
    }
}

let likeCount = 0;

function like(y) {
    likeCount++;
    document.getElementById('likenumber'[y]).textContent = likenumber;
}

/* ================================ ENTWÜRFE ================================*/



