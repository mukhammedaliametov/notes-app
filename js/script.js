"use strict";

const addBox = document.querySelector(".add-box");
const popupBox = document.querySelector(".popup-box");
const addNoteBtn = document.querySelector("#btn");
var noteTitle = document.getElementById("title");
var noteDesc = document.getElementById("desc");
const wrapper = document.querySelector(".wrapper");

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const notes = JSON.parse(localStorage.getItem("notes") || "[]");

addBox.addEventListener("click", () => {
  popupBox.classList.toggle("show");
});

const closeBox = () => {
  popupBox.classList.toggle("show");
  noteDesc.value = "";
  noteTitle.value = "";
};

function showNotes(){
  document.querySelectorAll('.note').forEach(note => note.remove());
  notes.forEach((note) => {
    let liTag = `
    <li class="note">
    <div class="details">
      <p>${note.title}</p>
      <span>${note.desc}</span>
    </div>
    <div class="bottom-content">
      <span>${note.date}</span>
      <div class="settings">
        <i class="fa-solid fa-ellipsis"></i>
        <div class="menu">
          <span><i class="fas fa-edit"></i>Edit</span>
          <span onclick='delNote()'><i class="fas fa-trash"></i>Delete</span>
        </div>
      </div>
    </div>
  </li>
    `;
    wrapper.insertAdjacentHTML('beforeend', liTag)
  });
};
showNotes();

addNoteBtn.addEventListener("click", e => {
  e.preventDefault();

  if (noteTitle.value && noteDesc.value) {
    console.log(noteTitle.value, noteDesc.value);

    let dateObj = new Date();

    let noteInfo = {
      title: `${noteTitle.value}`,
      desc: `${noteDesc.value}`,
      date: `${dateObj.getDate()} ${
        months[dateObj.getMonth()]
      }, ${dateObj.getUTCFullYear()}`,
    };

    notes.push(noteInfo);
    localStorage.setItem("notes", JSON.stringify(notes));
  }

  showNotes();

  popupBox.classList.toggle("show");
  noteDesc.value = "";
  noteTitle.value = "";
});

// const delNote = (noteId) => {
//   console.log(noteId);
// }
