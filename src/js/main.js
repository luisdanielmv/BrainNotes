//Note Contructor
function Note(pId, pTitle, pContent) {
	var self = this;
	self.id = "Default Note ID";
	self.title = "Default Note Title";
	self.content = "Default Note Content";
	self.element = createNoteElement();
	self.textHolder = self.element.firstElementChild;

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

	self.updateDisplayedTitle = function () {
		var txtNode = document.createTextNode(self.title);
		self.textHolder.removeChild(self.textHolder.firstChild);
		self.textHolder.appendChild(txtNode);
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
}

//BrainNotes Contructor
function BrainNotes(pSettings) {
	var self = this;
	self.settings = {
		notesSettings: {
			notesBtn: pSettings.notesSettings.notesBtn || "defaultPotato",
			navNotesBtn: pSettings.notesSettings.navNotesBtn || "defaultPotato",
			notesEditBtn: pSettings.notesSettings.notesEditBtn || "defaultPotato",
			notesSaveEditBtn: pSettings.notesSettings.notesSaveEditBtn || "defaultPotato",
			notesCancelEditBtn: pSettings.notesSettings.notesCancelEditBtn || "defaultPotato",
			notesSection: pSettings.notesSettings.notesSection || "defaultPotato",
			editDeleteGroups: pSettings.notesSettings.editDeleteGroups || "defaultPotato",
			saveCancelGroups: pSettings.notesSettings.saveCancelGroups || "defaultPotato",
			notesHolderId: pSettings.notesSettings.notesHolderId || "defaultPotato",
			notesList: pSettings.notesSettings.notesList || "defaultPotato",
			panelEditable: pSettings.notesSettings.panelEditable || "defatulPotato"
		},
		noteBookSettings: {
			noteBookBtn: pSettings.noteBookSettings.noteBookBtn || "defaultPotato",
			navNoteBookBtn: pSettings.noteBookSettings.navNoteBookBtn || "defaultPotato",
			noteBookSection: pSettings.noteBookSettings.noteBookSection || "defaultPotato",
			noteBookHolderId: pSettings.noteBookSettings.noteBookHolderId || "defaultPotato"
		},
		tagsSettings: {
			tagsBtn: pSettings.tagsSettings.tagsBtn || "defaultPotato",
			navTagsBtn: pSettings.tagsSettings.navTagsBtn || "defaultPotato",
			tagsSection: pSettings.tagsSettings.tagsSection || "defaultPotato",
			tagsHolderId: pSettings.tagsSettings.tagsHolderId || "defaultPotato"
		},
		toggledClass: pSettings.toggledClass || "defaultPotato",
		displayNoteTitle: pSettings.displayNoteTitle || "defaultPotato",
		displayNoteContent: pSettings.displayNoteContent || "defaultPotato",
		mainSection: pSettings.mainSection || "defaultPotato",
		sideSection: pSettings.sideSection || "defaultPotato",
		btnBack: pSettings.btnBack || "defaultPotato"
	};

	self.displayNoteTitle = document.getElementById(self.settings.displayNoteTitle);
	self.displayNoteContent = document.getElementById(self.settings.displayNoteContent);

	self.noteBtn = document.getElementById(self.settings.notesSettings.notesBtn);
	self.navNoteBtn = document.getElementById(self.settings.notesSettings.navNotesBtn);
	self.notesNewBtn = document.getElementById(self.settings.notesSettings.notesNewBtn);
	self.noteEditBtn = document.getElementById(self.settings.notesSettings.notesEditBtn);
	self.noteSaveEditBtn = document.getElementById(self.settings.notesSettings.notesSaveEditBtn);
	self.noteCancelEditBtn = document.getElementById(self.settings.notesSettings.notesCancelEditBtn);
	self.panelEditable = document.getElementById(self.settings.notesSettings.panelEditable);

	self.saveCancelGroup = document.getElementById(self.settings.notesSettings.saveCancelGroups);
	self.editDeleteGroup = document.getElementById(self.settings.notesSettings.editDeleteGroups);

	self.noteSection = document.getElementById(self.settings.notesSettings.notesSection);
	self.noteHolder = document.getElementById(self.settings.notesSettings.notesHolderId);
	self.noteList = new Array();

	self.noteBookBtn = document.getElementById(self.settings.noteBookSettings.noteBookBtn);
	self.navNoteBookBtn = document.getElementById(self.settings.noteBookSettings.navNoteBookBtn);
	self.noteBookSection = document.getElementById(self.settings.noteBookSettings.noteBookSection);
	self.noteBookList = new Array();

	self.tagsBtn = document.getElementById(self.settings.tagsSettings.tagsBtn);
	self.navTagsBtn = document.getElementById(self.settings.tagsSettings.navTagsBtn);
	self.tagsSection = document.getElementById(self.settings.tagsSettings.tagsSection);
	self.sideSection = document.getElementById(self.settings.sideSection);
	self.mainSection = document.getElementById(self.settings.mainSection);
	self.btnBack = document.getElementById(self.settings.btnBack);
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

	self.newNote = function () {
		self.activeNote = null;
		self.editNote();
	}

	self.addNote = function (pTitle, pContent) {
		var noteTemp = new Note(self.noteList.length, pTitle, pContent);
		self.noteList.push(noteTemp);
		self.noteHolder.appendChild(noteTemp.element);

		noteTemp.element.addEventListener("click", function () {
			self.activeNote = noteTemp;
			self.cancelEdit();
			self.displayNote();
		});
	}

	self.displayNote = function () {
		self.clearDisplay();

		if (self.activeNote != null) {
			var txtNodeTitle = document.createTextNode(self.activeNote.title),
				txtNodeContent = document.createTextNode(self.activeNote.content);

			self.displayNoteTitle.appendChild(txtNodeTitle);
			self.displayNoteContent.appendChild(txtNodeContent);	
		}
		
		self.sideSection.classList.add("hidden-xs");
		self.mainSection.classList.remove("hidden-xs");
	}

	self.editNote = function() {
		self.displayNoteTitle.setAttribute("contenteditable", "true");
		self.displayNoteContent.setAttribute("contenteditable", "true");

		self.panelEditable.classList.add("panel-editable-edit");

		self.editDeleteGroup.classList.add('hide');
		self.saveCancelGroup.classList.remove('hide');
	}

	self.clearDisplay = function () {
		while (self.displayNoteTitle.firstChild) {
			self.displayNoteTitle.removeChild(self.displayNoteTitle.firstChild);
		}
		
		while (self.displayNoteContent.firstChild) {
			self.displayNoteContent.removeChild(self.displayNoteContent.firstChild);
		}
	}

	self.saveEdit = function() {
		if (self.activeNote == null) {
			self.activeNote = new Note();
		}

		if (self.displayNoteTitle.firstChild) {
			self.activeNote.title = self.displayNoteTitle.firstChild.nodeValue;
		} else {
			self.activeNote.title = "Untitled";
		}
		
		if (self.displayNoteContent.firstChild) {
			self.activeNote.content = self.displayNoteContent.firstChild.nodeValue;
		} else {
			self.activeNote.content = " ";
		}
		
		self.activeNote.updateDisplayedTitle();
	}

	self.cancelEdit = function() {
		self.displayNoteTitle.setAttribute("contenteditable", "false");
		self.displayNoteContent.setAttribute("contenteditable", "false");
		self.panelEditable.classList.remove("panel-editable-edit");

		self.editDeleteGroup.classList.remove('hide');
		self.saveCancelGroup.classList.add('hide');
	}

	self.noteBtn.addEventListener("click", function () {
		toggleHide(self.noteSection);
	});
	self.navNoteBtn.addEventListener("click", function () {
		toggleHide(self.noteSection);
	});
	self.noteEditBtn.addEventListener("click", self.editNote);
	self.noteSaveEditBtn.addEventListener("click", function () {
		self.saveEdit();
		self.cancelEdit();
		self.displayNote();
	});
	self.noteCancelEditBtn.addEventListener("click", function() {
		self.cancelEdit();
		self.displayNote();
	});

	self.noteBookBtn.addEventListener("click", function () {
		toggleHide(self.noteBookSection);
	});
	self.navNoteBookBtn.addEventListener("click", function () {
		toggleHide(self.noteBookSection);
	});

	self.tagsBtn.addEventListener("click", function () {
		toggleHide(self.tagsSection);
	});
	self.navTagsBtn.addEventListener("click", function () {
		toggleHide(self.tagsSection);
	});
	self.btnBack.addEventListener("click", function() {
		self.sideSection.classList.remove("hidden-xs");
		
		self.mainSection.classList.add("hidden-xs");
		
	});
}

//BrainNotes Initialization
var bn = new BrainNotes({
	notesSettings: {
		notesBtn: "btn-notes",
		navNotesBtn: "nav-btn-notes",
		notesEditBtn: "btn-edit-notes",
		notesSaveEditBtn: "btn-edit-save-notes",
		notesCancelEditBtn: "btn-edit-cancel-notes",
		notesDeleteBtn: "btn-delete-notes",
		notesSection: "section-notes",
		notesHolderId: "holder-notes",
		editDeleteGroups: "edit-delete-group",
		saveCancelGroups: "save-cancel-group",
		panelEditable: "panel-editable",
		notesList: [{title:"title1", content:"content1"}, {title:"title2", content:"content2"}, {title:"title3", content:"content3"}]
	},
	noteBookSettings: {
		noteBookBtn: "btn-notebooks",
		navNoteBookBtn: "nav-btn-notebooks",
		noteBookSection: "section-notebooks",
		noteBookHolderId: ""
	},
	tagsSettings: {
		navTagsBtn: "nav-btn-tags",
		tagsBtn: "btn-tags",
		tagsSection: "section-tags",
		tagsHolderId: ""
	},
	toggledClass: "hide2",
	displayNoteTitle: "display-note-title",
	displayNoteContent: "display-note-content",
	btnBack: "btn-back",
	sideSection: "section-side",
	mainSection: "section-main"
});

bn.addNote("Lorem Ipsum", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In venenatis accumsan elit, in ornare nisl facilisis eu. Donec blandit at diam at malesuada. Curabitur fringilla, nisl at accumsan euismod, velit dui vulputate tellus, id maximus nisi risus nec eros. Donec eget rutrum justo. Mauris et est quis est consectetur dignissim. Integer consectetur nulla in diam molestie, sit amet consequat metus sollicitudin. Quisque faucibus dapibus risus a varius. Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris non nibh dictum, ornare mi quis, vehicula turpis.");
bn.addNote("Donec Nec Tellus", "Donec nec tellus ut libero maximus condimentum et in augue. Phasellus at sollicitudin ligula, vitae tempus tellus. Vivamus egestas augue id imperdiet cursus. Vivamus maximus ac diam non placerat. Aenean euismod ultricies odio ut rhoncus. Mauris ullamcorper sodales orci. Nulla facilisi. Donec aliquet consequat vestibulum. Phasellus aliquam diam a felis placerat tempor.");
