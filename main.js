const notesContainer = document.getElementById("app");
const addNoteButton = notesContainer.querySelector(".add-note");

getNotes().forEach((note) => {
	const noteElement = createNoteElement(note.id, note.content);
	notesContainer.insertBefore(noteElement, addNoteButton);
});

addNoteButton.addEventListener("click", () => addNote());

function getNotes() {
	return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");
}

function saveNotes(notes) {
	localStorage.setItem("stickynotes-notes", JSON.stringify(notes));
}

function createNoteElement(id, content) {
	const element = document.createElement("textarea");
	element.classList.add("note");
	element.value = content;
	element.placeholder = "Empty Sticky Note";

	element.addEventListener("change", () => {
		updateNote(id, element.value);
	});

	element.addEventListener("dblclick", () => {
		const doDelete = confirm(
			"Are you sure you wish to delete this sticky note?"
		);
		if (doDelete) {
			deleteNote(id, element);
		}
	});

	return element;
}

function addNote() {
	const currentNotes = getNotes();
	const newNotes = {
		id: Math.floor(Math.random * 100000),
		content: "",
	};
	const noteElement = createNoteElement(newNotes.id, newNotes.content);
	notesContainer.insertBefore(noteElement, addNoteButton);

	currentNotes.push(newNotes);
	saveNotes(currentNotes);
}

function updateNote(id, newContent) {
	const notes = getNotes();
	const target = notes.filter((note) => note.id == id)[0];
	targetNot = newContent;
	saveNotes(notes);

	console.log("updating note...");
	console.log(id, newContent);
}

function deleteNote(id, element) {
	console.log("Deleting Note...");
	const notes = getNotes().filter((note) => note.id != id);

	saveNotes(notes);
	notesContainer.removeChild(element);

	console.log("delete!");
}
