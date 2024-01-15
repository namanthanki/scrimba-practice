import React from "react"
import Sidebar from "./components/Sidebar"
import Editor from "./components/Editor"
// import { data } from "./data"
import Split from "react-split"
// import {nanoid} from "nanoid"
import { onSnapshot, addDoc, doc, deleteDoc, setDoc } from "firebase/firestore"
import { db, notesCollection } from "../firebase"

export default function App() {
    const [notes, setNotes] = React.useState([])
    const [tempNoteText, setTempNoteText] = React.useState("");
    const [currentNoteId, setCurrentNoteId] = React.useState(
        (notes[0]?.id) || ""
    )

    const currentNote =
        notes.find(note => note.id === currentNoteId)
        || notes[0];

    const sortedNotes = 
        notes.sort((a, b) => b.updatedAt - a.updatedAt);
    
    React.useEffect(() => {
        const unsubscribe = onSnapshot(notesCollection, (snapshot) => {
            const newNotesArray = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }));

            setNotes(newNotesArray);
        });

        return unsubscribe;
    }, []);

    React.useEffect(() => {
        if (!currentNoteId) {
            setCurrentNoteId(notes[0]?.id)
        }
    }, [currentNoteId, notes]);

    React.useEffect(() => {
        if(currentNote) {
            setTempNoteText(currentNote.body);
        }
    }, [currentNote]);

    React.useEffect(() => {
        const timeoutId = setTimeout(() => {
            if(tempNoteText !== currentNote.body) {
                updateNote(tempNoteText);
            }
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [updateNote, tempNoteText]);

    async function createNewNote() {
        const newNote = {
            body: "# Type your markdown note's title here",
            createdAt: Date.now(),
            updatedAt: Date.now()
        }
        const newNoteRef = await addDoc(notesCollection, newNote);
        setCurrentNoteId(newNoteRef.id)

    }

    async function updateNote(text) {
        /* setNotes(oldNotes => oldNotes.map(oldNote => {
            return oldNote.id === currentNoteId
                ? { ...oldNote, body: text }
                : oldNote
        })) */

        /*setNotes(oldNotes => {
            const newArray = [];
            for(let i = 0; i < oldNotes.length; i++) {
                if(oldNotes[i].id === currentNoteId) {
                    newArray.unshift({...oldNotes[i], body: text});
                } else {
                    newArray.push(oldNotes[i]);
                }
            }
            return newArray;
        });*/

        const docRef = doc(db, "notes", currentNoteId)
        await setDoc(
            docRef, 
            { body: text, updatedAt: Date.now() }, 
            { merge: true }
        );
    }

    /* function findCurrentNote() {
        return notes.find(note => {
            return note.id === currentNoteId
        }) || notes[0]
    } */

    async function deleteNote(noteId) {
        const docRef = doc(db, "notes", noteId);
        await deleteDoc(docRef);
    }

    return (
        <main>
            {
                notes.length > 0
                    ?
                    <Split
                        sizes={[30, 70]}
                        direction="horizontal"
                        className="split"
                    >
                        <Sidebar
                            notes={sortedNotes}
                            currentNote={currentNote}
                            setCurrentNoteId={setCurrentNoteId}
                            newNote={createNewNote}
                            deleteNote={deleteNote}
                        />
                        {
                            currentNoteId &&
                            notes.length > 0 &&
                            <Editor
                                tempNoteText={tempNoteText}
                                setTempNoteText={setTempNoteText}
                            />
                        }
                    </Split>
                    :
                    <div className="no-notes">
                        <h1>You have no notes</h1>
                        <button
                            className="first-note"
                            onClick={createNewNote}
                        >
                            Create one now
                        </button>
                    </div>

            }
        </main>
    )
}