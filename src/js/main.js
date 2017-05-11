//BrainNotes Contructor
function BrainNotes(pSettings) {
	var self = this;
	self.settings = {
		notesSettings: {
			notesBtn: pSettings.notesSettings.notesBtn || "defaultPotato",
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
		contentTitle: pSettings.contentTitle || "defaultPotato",
		contentDisplay: pSettings.contentDisplay || "defaultPotato"
	};

	self.contentTitle = document.getElementById(self.settings.contentTitle);
	self.contentDisplay = document.getElementById(self.settings.contentDisplay);

	self.noteBtn = document.getElementById(self.settings.notesSettings.notesBtn);
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
			self.contentTitle.innerHTML = noteTemp.title;
			self.contentDisplay.innerHTML = noteTemp.content;
		});
	}

	self.noteBtn.addEventListener("click", function () {
		toggleHide(self.noteSection);
	});
	self.noteBookBtn.addEventListener("click", function () {
		toggleHide(self.noteBookSection);
	});
	self.tagsBtn.addEventListener("click", function () {
		toggleHide(self.tagsSection);
	});

	console.log("Create new BN");
}

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

//BrainNotes Initialization
var BN = new BrainNotes({
	notesSettings: {
		notesBtn: "btn-notes",
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
	contentTitle: "content-title",
	contentDisplay: "content-display"
});

BN.addNote("Titulo Test 1", "Content Test 1");
BN.addNote("Titulo Test 2", "Content Test 2");

console.log(BN.constructor.name);