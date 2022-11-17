import { defineStore } from "pinia";
import { Note } from "../components/models";
// import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

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
    async addNote(newNoteTitle: string) {
      let note: Note = {
        title: newNoteTitle,
        content: "Note vide pour le moment, cliquez pour éditer",
        date: new Date().getTime(),
        done: false,
        expanded: false,
      };

      await addDoc(notesCollectionRef, note);
    },
    async deleteNote(idToDelete: string) {
      await deleteDoc(doc(notesCollectionRef, idToDelete));
    },
    async editNote(id: string, newNoteContent: string) {
      await updateDoc(doc(notesCollectionRef, id), { content: newNoteContent });
    },
  },
});
