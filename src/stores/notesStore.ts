import { defineStore } from "pinia";
import { Note } from "../components/models";
import { collection, getDocs } from "firebase/firestore";

import { db } from "../firebase";

export const useNotesStore = defineStore("notesStore", {
  state: () => {
    return {
      notes: [] as Note[],
    };
  },
  actions: {
    async getNotes() {
      const querySnapshot = await getDocs(collection(db, "notes"));

      querySnapshot.forEach((doc) => {
        const note: Note = {
          id: doc.id,
          title: doc.data().title,
          content: doc.data().content,
          done: doc.data().done,
          expanded: doc.data().expanded,
        };

        this.notes.push(note);
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
