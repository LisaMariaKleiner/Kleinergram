// =================== HeaderTemplate
async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "includes/header.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}

/* ================= Content ==================== */

function render() {
    includeHTML();
    showContent();
    showProfile();
    
}


let posts = [
    {
        'author': 'ThinkedIn',
        'photo': 'img/firmaWerbung.png',
        'image': 'img/thinkedIn.jpg',
        'description': 'Finde jetzt DEINEN passenden Job auf ThinkedIn',
        'likes': '151.619',
    },
    {
        'author': 'Heilige IT Gesellschaft',
        'photo': 'img/firmaWerbung.png',
        'image': 'img/beruf.jpg',
        'description': 'Wir stellen ein! Werde jetzt IT Security Analyst im weltweit erfolgreichsten Unternehmen!',
        'likes': '987.998',
    },
    {
        'author': 'Werbung muss sein gmbH',
        'photo': 'img/firmaWerbung.png',
        'image': 'img/werbung.jpg',
        'description': 'Präsentiere jetzt DEIN Unternehmen auf unseren Werbetafeln!',
        'likes': '1.562',
    }

];

function showContent() {
    for (let i = 0; i < posts.length; i++) {
        const infoPost = posts[i];
        document.getElementById('input_container').innerHTML +=`
        <div class="single_post">
            <div class="author">
            <img class="profile_photos" src="${infoPost['photo']}">
            ${infoPost['author']}
            </div>

            <div class="image_post">
                <img src="${infoPost['image']}">
            </div>
            <div class="social_buttons">
                <img class="buttons_inPost" src="./img/likebutton.png" alt="likebutton"></a>
                <img class="buttons_inPost" src="./img/commentbutton.png" alt="commentbutton"></a>
                <img class="buttons_inPost" src="./img/sendbutton.png" alt="nachrichtenbutton"></a>
                <p class="likes">Gefällt ${infoPost['likes']} mal</p>
                <p class="description_text">${infoPost['description']}</p>
            </div>
            <div id="new_comment"></div>
            <div class="new_comment">
                <input id="author" class="input_name" type="text" placeholder="Dein Name">
                <textarea rows="4" cols="50" id="input_comment" class="input_comment" wrap="off" placeholder="Dein Kommentar"></textarea> 
                <button class="button_comment" onclick="newComment()">Absenden!</button>
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


let comments = []
let authors = []

function newComment() {
    let name = document.getElementById('author').value;
    let posts = document.getElementById('input_comment').value;

    authors.push(name);
    comments.push(posts);
    document.getElementById('new_comment').innerHTML = '';

    for (let i = 0; i < comments.length; i++){
    
        document.getElementById('new_comment').innerHTML +=`
        <div class="author">${authors[i]}</div>
            <div class="social_buttons">
                <p class="description_text">${comments[i]}</p>
                <img class="buttons_inPost" src="./img/likebutton.png" alt="likebutton"></a>
                <img class="buttons_inPost" src="./img/commentbutton.png" alt="commentbutton"></a>
                <img class="buttons_inPost" src="./img/sendbutton.png" alt="nachrichtenbutton"></a>
                <!--<p class="likes">Gefällt mal</p>-->
            </div>`;
    }
    document.getElementById('author').value = '';
    document.getElementById('input_comment').value = ''; 
    //showContent();
}


