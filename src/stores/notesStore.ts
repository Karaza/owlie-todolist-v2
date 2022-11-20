import { defineStore } from "pinia";
import { Note } from "../components/models";
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
import { useAuthStore } from "./authStore";

import { db } from "../firebase";

let notesCollectionRef: any;
let notesCollectionQuery: any;

export const useNotesStore = defineStore("notesStore", {
  state: () => {
    return {
      notes: [] as Note[],
      notesLoaded: false,
    };
  },
  actions: {
    init() {
      const authStore = useAuthStore();

      // Initialize our database refs
      notesCollectionRef = collection(db, "users", authStore.user.uid, "notes");
      notesCollectionQuery = query(notesCollectionRef, orderBy("date", "desc"));
      this.getNotes();
    },
    async getNotes() {
      this.notesLoaded = false;

      onSnapshot(notesCollectionQuery, (querySnapshot: any) => {
        const notes: Note[] = [];

        querySnapshot.forEach((doc: any) => {
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
    clearNotes() {
      this.notes = [];
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
