var btnNotes = document.getElementById("btn-notes");
var notesSection = document.getElementById("section-notes");

btnNotes.addEventListener("click", function () {
    console.log("TRIGGERED TOGGLE");
    toggleHide(notesSection);
});

function toggleHide(pSection) {
    if (pSection.classList.contains("hide2")) {
        pSection.classList.remove("hide2");
        pSection.style.left='';
    } else {
        pSection.style.left='-100px';
        pSection.classList.add("hide2");
    }
}