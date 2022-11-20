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

let unsubscribeSnapshots: any = null;

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

      unsubscribeSnapshots = onSnapshot(
        notesCollectionQuery,
        (querySnapshot: any) => {
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
        }
      );
    },
    clearNotes() {
      this.notes = [];
      if (unsubscribeSnapshots) unsubscribeSnapshots(); // Unsubscribe for any active listener when logging out
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
      await updateDoc(doc(notesCollectionRef, id), {
        id,
        content: newNoteContent,
      });
    },
    async toggleDoneNote(id: string, doneValue: boolean) {
      await updateDoc(doc(notesCollectionRef, id), {
        id,
        done: doneValue,
      });
    },
    async clearDoneNotes() {
      const doneNotes = this.notes.filter((note) => note.done === true);
      doneNotes.forEach((note) => {
        this.deleteNote(note.id as string);
      });
    },
  },
});
