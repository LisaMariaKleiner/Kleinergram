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
    
    
    includeHTML();
    loadfromLocalStorage();
    showContent();
    showProfile();
    
    // Mit diesen Forschleifen wird vermieden, dass bei jedem neuladen der Seite wieder alle bestehenden Kommentare neu gerendert werden.
    for (let i = 0; i < posts.length; i++) {
        document.getElementById(`new_comment_${i}`).innerHTML = ''; // Leert in der Forschleife nacheinander die New_Comment Container
        for (let y = 0; y < posts[i]['comments'].length; y++) { //Führt beim FirstLoad die renderCommentsFunktion so oft aus wie Inhalte im postsArray-> comments sind.
            renderComments(i,y);
        }
    }
}



let posts = [
    {
        "user": "ThinkedIn",
        "photo": "img/firmaWerbung.png",
        "image": "img/thinkedIn.jpg",
        "description": "Finde jetzt DEINEN passenden Job auf ThinkedIn",
        "likes": [100],
        "liked": false,
        "comments": []
    },
    {
        'user': 'Heilige IT Gesellschaft',
        'photo': 'img/firmaWerbung.png',
        'image': 'img/beruf.jpg',
        'description': 'Wir stellen ein! Werde jetzt IT Security Analyst im weltweit erfolgreichsten Unternehmen!',
        'likes': [200],
        "liked": false,
        "comments": []
    },
    {
        'user': 'Werbung muss sein gmbH',
        'photo': 'img/firmaWerbung.png',
        'image': 'img/werbung.jpg',
        'description': 'Präsentiere jetzt DEIN Unternehmen auf unseren Werbetafeln!',
        'likes': [500],
        "liked": false,
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
                <img onclick="likePost(${i})" id="post_toggle_button${i}" class="like_button" src="./img/likeheart.svg" alt="likebutton"></a>
                <img class="buttons_inPost" src="./img/commentbutton.png" alt="commentbutton"></a>
                <img class="buttons_inPost" src="./img/sendbutton.png" alt="nachrichtenbutton"></a>
                <span class="likes" id="likenumber${i}">Gefällt ${infoPost['likes']} mal</span>
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
    renderComments(x,posts[x]['comments'].length-1) 
    saveInLocalStorage(x);
    document.getElementById(`author_${x}`).value = ''; // Eingabefelder leeren.
    document.getElementById(`input_comment_${x}`).value = ''; // Eingabefelder leeren.
}


//Rendert den new_Comment Container nur 1x ! Damit bei einem neuen Kommentar immer nur 1 neuer Container gerendert wird und nicht wieder alle bereits bestehenden(bei millionen Kommentaren wirds sonst kompliziert beim laden)
function renderComments(x,y){
    
        document.getElementById(`new_comment_${x}`).innerHTML +=`
        <div class="author"> ${posts[x]["comments"][y]["author"]}</div>
            <div class="social_buttons">
                <p class="description_text">${posts[x]["comments"][y]["content"]}</p>
                <img onclick="likeComment(${x}, ${y})" id="toggle_button${x}${y}" class="like_button" src="./img/likeheart.svg" alt="likebutton"></a>
                <img class="buttons_inPost" src="./img/commentbutton.png" alt="commentbutton"></a>
                <img class="buttons_inPost" src="./img/sendbutton.png" alt="nachrichtenbutton"></a>
            </div>`;
}


// Betätigt den Togglebutton(like) in den Kommentaren
function likeComment(x,y){
    let toggleButton = document.getElementById(`toggle_button${x}${y}`);
    toggleButton.classList.toggle("active");
}


// Betätigt den ToggleButton(like) in dem PostContainer
function likePost(i){
    let counter = document.getElementById(`likenumber${i}`);
    let like = document.getElementById(`post_toggle_button${i}`);

        if (!posts[i]['liked']){
            posts[i]['likes']++;
            posts[i]['liked'] = true;

            like.classList.add("active");
            
        } else {
            dislike(i);
        }
        let iLike = posts[i]['likes'];
        counter.innerHTML = `Gefällt ${iLike} Mal`;
}


function dislike(i) {
    let counter = document.getElementById(`likenumber${i}`);
    let like = document.getElementById(`post_toggle_button${i}`);

    if (posts[i]['liked']) {
        posts[i]['likes']--;
        posts[i]['liked'] = false;
        like.classList.remove("active");
    }
    let iLike = posts[i]['likes'];
    counter.innerHTML = `Gefällt ${iLike} Mal`;
}


// in den LocalStorage speichern
function saveInLocalStorage(){
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





/* ================================ ENTWÜRFE ================================*/

/*for (let i = 0; i < posts[x]['comments'].length-1; i++) {
    var toggleButton = document.getElementById(`toggle_button${x}${y}`);
    var isActive = false;

    toggleButton.addEventListener("click", function() {
        isActive = !isActive;
        if (isActive) {
          toggleButton.innerHTML = "An";
          toggleButton.classList.add("active");
        } else {
          toggleButton.innerHTML = "Aus";
          toggleButton.classList.remove("active");
     }
  });
}
/*function like(i) {
    // Den "Like"-Button und die Anzahl der Likes abrufen
    const likeButton = document.getElementById(`likeButton_${i}`);
    const likeCount = document.getElementById(`likenumber_${i}`);
    
    // Überprüfen, ob der "Like"-Button bereits aktiviert ist
    if (likeButton.classList.contains('liked')) {
        // Wenn bereits geliked wurde, entferne die Klasse "liked", reduziere die Anzahl der Likes und aktualisiere die Anzeige
        likeButton.classList.remove('liked');
        posts[i].likes--;
        likeCount.textContent = `Gefällt ${posts[i].likes} mal`;
    } else {
        // Wenn noch nicht geliked wurde, füge die Klasse "liked" hinzu, erhöhe die Anzahl der Likes und aktualisiere die Anzeige
        likeButton.classList.add('liked');
        posts[i].likes++;
        likeCount.textContent = `Gefällt ${posts[i].likes} mal`;
    }

    // Speichere die aktualisierten Daten im LocalStorage
    saveInLocalStorage(i);
}*/
/*
function renderComments(x) {
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
}
*/
