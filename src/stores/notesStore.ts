import { defineStore } from "pinia";
import { Note } from "../components/models";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

import { db } from "../firebase";

const notesCollectionRef = collection(db, "notes");
const notesCollectionQuery = query(notesCollectionRef, orderBy("date", "desc"));

export const useNotesStore = defineStore("notesStore", {
  state: () => {
    return {
      notes: [] as Note[],
      notesLoaded: false,
    };
  },
  actions: {
    async getNotes() {
      this.notesLoaded = false;

      onSnapshot(notesCollectionQuery, (querySnapshot) => {
        const notes: Note[] = [];

        querySnapshot.forEach((doc) => {
          const note: Note = {
            id: doc.id,
            title: doc.data().title,
            content: doc.data().content,
            date: doc.data().date,
            done: doc.data().done,
            expanded: doc.data().expanded,
          };
          notes.push(note);
        });

        this.notes = notes;

        this.notesLoaded = true;
      });
    },
    addNote(newNoteTitle: string) {
      // let note: Note = {
      //   id: new Date().getTime().toString(), // could use uuid instead, timestamp for simplicity for now
      //   title: newNoteTitle,
      //   content: "Note vide pour le moment, cliquez pour éditer",
      //   done: false,
      //   expanded: false,
      // };
      // this.notes.unshift(note);
      console.log("addNote");
    },
    deleteNote(idToDelete: string) {
      // this.notes = this.notes.filter((note) => {
      //   return note.id !== idToDelete;
      // });
      console.log("deleteNote");
    },
    editNote(id: string, newNoteContent: string) {
      // let index = this.notes.findIndex((note) => note.id === id);
      // this.notes[index].content = newNoteContent;
      console.log("editNote");
    },
  },
});
