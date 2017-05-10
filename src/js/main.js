var btnNotes = document.getElementById("btn-notes");
var notesSection = document.getElementById("section-notes");
var btnNotebooks = document.getElementById("btn-notebooks");
var notebooksSection = document.getElementById("section-notebooks");
var btnTags = document.getElementById("btn-tags");
var tagsSection = document.getElementById("section-tags");
var oActive = { active: notesSection };

btnNotes.addEventListener("click", function () {
    toggleHide(oActive.active);
    oActive.active = notesSection;
    toggleHide(notesSection);
});

btnNotebooks.addEventListener("click", function () {
    toggleHide(oActive.active);
    oActive.active = notebooksSection;
    toggleHide(notebooksSection);
});

btnTags.addEventListener("click", function () {
    toggleHide(oActive.active);
    oActive.active = tagsSection;
    toggleHide(tagsSection);
});

function toggleHide(pSection) {
    console.log(oActive.active);
    if (pSection.classList.contains("hide2")) {
        pSection.classList.remove("hide2");
    } else {
        pSection.classList.add("hide2");
    }
}