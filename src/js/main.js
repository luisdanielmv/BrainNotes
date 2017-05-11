//Note Contructor
function Note(pId, pTitle, pContent) {
	var self = this;
	self.id = "Default Note ID";
	self.title = "Default Note Title";
	self.content = "Default Note Content";
	self.element = createNoteElement();

	if (typeof pId != null) {
		self.id = pId;
	}

	if (typeof pTitle == "string") {
		self.title = pTitle;
	}

	if (typeof pTitle == "string") {
		self.content = pContent;
	}

	function createNoteElement() {
		var outerDiv = document.createElement("div"),
			innerDiv = document.createElement("div"),
			textNode = document.createTextNode(pTitle);

		outerDiv.classList.add("panel", "panel-default");
		innerDiv.classList.add("panel-body");

		innerDiv.appendChild(textNode);
		outerDiv.appendChild(innerDiv);

		return outerDiv;
	}
}

//Notebook Contructor Definition
function NoteBook(pId, pTitle, pNoteList){
	var self = this;
	self.id = "Default NB ID";
	self.title = "Default NB Title";
	self.pNoteList = new Array();

	if (typeof pId != null) {
		self.id = pId;
	}

	if (typeof pTitle == "string") {
		self.title = pTitle;
	}

	self.addNote = function (pNote) {
		if (pNote.constructor.name == "Note") {
			self.pNoteList.push(pNote);
		}
	}
}

//Tag Contructor Definition
function Tag(){
	console.log(potato);
}

//BrainNotes Contructor
function BrainNotes(pSettings) {
	var self = this;
	self.settings = {
		notesSettings: {
			notesBtn: pSettings.notesSettings.notesBtn || "defaultPotato",
			notesEditBtn: pSettings.notesSettings.notesEditBtn || "defaultPotato",
			notesSaveEditBtn: pSettings.notesSettings.notesSaveEditBtn || "defaultPotato",
			notesCancelEditBtn: pSettings.notesSettings.notesCancelEditBtn || "defaultPotato",
			notesSection: pSettings.notesSettings.notesSection || "defaultPotato",
			notesHolderId: pSettings.notesSettings.notesHolderId || "defaultPotato",
			notesList: pSettings.notesSettings.notesList || "defaultPotato"
		},
		noteBookSettings: {
			noteBookBtn: pSettings.noteBookSettings.noteBookBtn || "defaultPotato",
			noteBookSection: pSettings.noteBookSettings.noteBookSection || "defaultPotato",
			noteBookHolderId: pSettings.noteBookSettings.noteBookHolderId || "defaultPotato"
		},
		tagsSettings: {
			tagsBtn: pSettings.tagsSettings.tagsBtn || "defaultPotato",
			tagsSection: pSettings.tagsSettings.tagsSection || "defaultPotato",
			tagsHolderId: pSettings.tagsSettings.tagsHolderId || "defaultPotato"
		},
		toggledClass: pSettings.toggledClass || "defaultPotato",
		displayNoteTitle: pSettings.displayNoteTitle || "defaultPotato",
		displayNoteContent: pSettings.displayNoteContent || "defaultPotato"
	};

	self.displayNoteTitle = document.getElementById(self.settings.displayNoteTitle);
	self.displayNoteContent = document.getElementById(self.settings.displayNoteContent);

	self.noteBtn = document.getElementById(self.settings.notesSettings.notesBtn);
	self.noteEditBtn = document.getElementById(self.settings.notesSettings.notesEditBtn);
	self.noteSaveEditBtn = document.getElementById(self.settings.notesSettings.notesSaveEditBtn);
	self.noteCancelEditBtn = document.getElementById(self.settings.notesSettings.notesCancelEditBtn)

	self.noteSection = document.getElementById(self.settings.notesSettings.notesSection);
	self.noteHolder = document.getElementById(self.settings.notesSettings.notesHolderId);
	self.noteList = new Array();

	self.noteBookBtn = document.getElementById(self.settings.noteBookSettings.noteBookBtn);
	self.noteBookSection = document.getElementById(self.settings.noteBookSettings.noteBookSection);
	self.noteBookList = new Array();

	self.tagsBtn = document.getElementById(self.settings.tagsSettings.tagsBtn);
	self.tagsSection = document.getElementById(self.settings.tagsSettings.tagsSection);
	self.tagList = new Array();
	self.active = self.noteSection;
	self.activeNote = "Default Potato";

	function toggleHide(pSection) {
		if (self.active != pSection) {
			self.active.classList.add(self.settings.toggledClass);
			self.active = pSection;
			self.active.classList.remove(self.settings.toggledClass);
		}
	}

	self.addNote = function (pTitle, pContent) {
		var noteTemp = new Note(self.noteList.length, pTitle, pContent);
		console.log(self.noteHolder);
		self.noteList.push(noteTemp);
		self.noteHolder.appendChild(noteTemp.element);

		noteTemp.element.addEventListener("click", function () {
			self.displayNoteTitle.innerHTML = noteTemp.title;
			self.displayNoteContent.innerHTML = noteTemp.content;
			self.activeNote = noteTemp;
		});
	}

	function displayNote(pNote) {
		var txtNodeTitle = document.createTextNode(pNote.title),
			txtNodeContent = document.createTextNode(pNote.content);

		self.displayNoteTitle.removeChild(self.displayNoteTitle.firstChild);
		self.displayNoteTitle.appendChild(txtNodeTitle);
		self.displayNoteContent.removeChild(self.displayNoteContent.firstChild);
		self.displayNoteContent.appendChild(txtNodeContent);	
	}

	function editNote() {
		self.displayNoteTitle.setAttribute("contenteditable", "true");
		self.displayNoteContent.setAttribute("contenteditable", "true");
	}

	function saveEdit() {
		self.activeNote.title = self.displayNoteTitle.nodeValue;
		self.activeNote.content = self.displayNoteContent.nodeValue;
		
		self.displayNote(self.activeNote);
	}

	function cancelEdit() {
		self.displayNoteTitle.removeAttribute("contenteditable");
		self.displayNoteContent.removeAttribute("contenteditable");
	}

	self.noteBtn.addEventListener("click", function () {
		toggleHide(self.noteSection);
	});
	self.noteEditBtn.addEventListener("click", editNote);
	self.noteSaveEditBtn.addEventListener("click", saveEdit);
	self.noteCancelEditBtn.addEventListener("click", function() {
		cancelEdit();
		displayNote(self.activeNote);
	});

	self.noteBookBtn.addEventListener("click", function () {
		toggleHide(self.noteBookSection);
	});
	self.tagsBtn.addEventListener("click", function () {
		toggleHide(self.tagsSection);
	});

	console.log("Create new BN");
}

//BrainNotes Initialization
var bn = new BrainNotes({
	notesSettings: {
		notesBtn: "btn-notes",
		notesEditBtn: "btn-edit-notes",
		notesSaveEditBtn: "btn-edit-save-notes",
		notesCancelEditBtn: "btn-edit-cancel-notes",
		notesSection: "section-notes",
		notesHolderId: "holder-notes",
		notesList: [{title:"title1", content:"content1"}, {title:"title2", content:"content2"}, {title:"title3", content:"content3"}]
	},
	noteBookSettings: {
		noteBookBtn: "btn-notebooks",
		noteBookSection: "section-notebooks",
		noteBookHolderId: ""
	},
	tagsSettings: {
		tagsBtn: "btn-tags",
		tagsSection: "section-tags",
		tagsHolderId: ""
	},
	toggledClass: "hide2",
	displayNoteTitle: "content-title",
	displayNoteContent: "content-display"
});

bn.addNote("Lorem Ipsum", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In venenatis accumsan elit, in ornare nisl facilisis eu. Donec blandit at diam at malesuada. Curabitur fringilla, nisl at accumsan euismod, velit dui vulputate tellus, id maximus nisi risus nec eros. Donec eget rutrum justo. Mauris et est quis est consectetur dignissim. Integer consectetur nulla in diam molestie, sit amet consequat metus sollicitudin. Quisque faucibus dapibus risus a varius. Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris non nibh dictum, ornare mi quis, vehicula turpis.");
bn.addNote("Donec Nec Tellus", "Donec nec tellus ut libero maximus condimentum et in augue. Phasellus at sollicitudin ligula, vitae tempus tellus. Vivamus egestas augue id imperdiet cursus. Vivamus maximus ac diam non placerat. Aenean euismod ultricies odio ut rhoncus. Mauris ullamcorper sodales orci. Nulla facilisi. Donec aliquet consequat vestibulum. Phasellus aliquam diam a felis placerat tempor.");

console.log(bn.constructor.name);