// Firebase-Konfiguration
var firebaseConfig = {
    apiKey: "AIzaSyBAxZiohP_cfsQ8M4bmBOjwJYW--0PU618",
    authDomain: "friedvollerseelenzauber.firebaseapp.com",
    projectId: "friedvollerseelenzauber",
    storageBucket: "friedvollerseelenzauber.appspot.com",
    messagingSenderId: "385911160430",
    appId: "1:385911160430:web:fc75740c3b7bd9fdc7f07f",
    measurementId: "G-QEHXJM26EG"
};
// Firebase initialisieren
firebase.initializeApp(firebaseConfig);
firebase.analytics();
var db = firebase.firestore();

// Formular einreichen und Daten speichern
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var message = document.getElementById('message').value;

    db.collection('contacts').add({
        name: name,
        email: email,
        message: message,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        alert('Danke für Ihre Nachricht!');
        document.getElementById('contact-form').reset();
        loadComments();
    }).catch((error) => {
        console.error('Fehler beim Speichern der Nachricht: ', error);
    });
});

// Kommentare laden und anzeigen
function loadComments() {
    db.collection('contacts').orderBy('timestamp', 'desc').get().then((querySnapshot) => {
        var commentList = document.getElementById('comment-list');
        commentList.innerHTML = '';
        querySnapshot.forEach((doc) => {
            var comment = doc.data();
            var commentElement = document.createElement('div');
            commentElement.classList.add('comment');
            commentElement.innerHTML = `
                <h3>${comment.name}</h3>
                <p>${comment.message}</p>
            `;
            commentList.appendChild(commentElement);
        });
    }).catch((error) => {
        console.error('Fehler beim Laden der Kommentare: ', error);
    });
}

// Kommentare beim Laden der Seite laden
window.onload = loadComments;
