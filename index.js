const btnEl = document.getElementById("btn");

const appEl = document.getElementById("app");

getNotes().forEach((note) => {
  const noteEl = createNote(note.id, note.content);
  appEl.insertBefore(noteEl, btnEl);
});

window.addEventListener("load", () => {
  document.querySelectorAll(".note").forEach((individualNote) => {
    scrollDetect(individualNote);
  });
});

function scrollDetect(element) {
  if (element.offsetHeight < element.scrollHeight) {
    element.style.borderRadius = "15px 0 0 15px";
  } else {
    element.style.borderRadius = "15px";
  }
}

function createNote(id, content) {
  const element = document.createElement("textarea");
  element.classList.add("note");
  element.placeholder = "Empty Note";
  element.value = content;

  element.addEventListener("dblclick", () => {
    const warning = confirm("Do you want to delete this note?");
    if (warning) {
      deleteNote(id, element);
    }
  });

  element.addEventListener("input", () => {
    scrollDetect(element);
    updateNote(id, element.value);
  });
  return element;
}

function deleteNote(id, element) {
  const notes = getNotes().filter((note) => note.id != id);
  saveNote(notes);
  appEl.removeChild(element);
}

function updateNote(id, content) {
  const notes = getNotes();
  const target = notes.filter((note) => note.id == id)[0];
  console.log(target);
  target.content = content;
  saveNote(notes);
}

function addNote() {
  const notes = getNotes();
  const noteObj = {
    id: Math.ceil(Math.random() * 100000),
    content: "",
  };

  notes.push(noteObj);

  const noteEl = createNote(noteObj.id, noteObj.content);
  appEl.insertBefore(noteEl, btnEl);

  saveNote(notes);
}

function saveNote(salim) {
  localStorage.setItem("note-app", JSON.stringify(salim));
}

function getNotes() {
  return JSON.parse(localStorage.getItem("note-app") || "[]");
}

btnEl.addEventListener("click", addNote);
