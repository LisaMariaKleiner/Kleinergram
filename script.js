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
    showProfile();
    showPost();
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

function showPost() {
    //document.getElementById('input_container').innerHTML = '';
    //for (let i = 0; i < posts.length; i++) {
    for (let i = posts.length - 1; i >= 0; i--) {
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

function showProfile() {
    document.getElementById('profiles').innerHTML = '';
    for (let i = 0; i < suggestions.length; i++) {
        const sugInfo = suggestions[i];
        document.getElementById('profiles').innerHTML +=`
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
    let author = document.getElementById('author').value;
    let post = document.getElementById('input_comment').value;

    comments.push(post);
    authors.push(author);

    showComments();

    document.getElementById('author').value = '';
    document.getElementById('input_comment').value = ''; 
}

function showComments() {
    let inputContainer = document.getElementById('input_container');
    inputContainer.innerHTML = '';
    for (let i = 0; i < comments.length; i++){
        inputContainer.innerHTML += `
        <div class="single_post">
            <div class="author">${author}</div>
            <div class="social_buttons">
                <img class="buttons_inPost" src="./img/likebutton.png" alt="likebutton"></a>
                <img class="buttons_inPost" src="./img/commentbutton.png" alt="commentbutton"></a>
                <img class="buttons_inPost" src="./img/sendbutton.png" alt="nachrichtenbutton"></a>
                <!--<p class="likes">Gefällt mal</p>-->
                <p class="description_text">${post}</p>
            </div>
            `;
    }   
}

showPost();
showProfile();


