//import axios from "axios";
import { useEffect, useState } from 'react'
import { NotePost } from './components_notesPost/NotePost'
import { noteService } from  './modules_notesPost/noteService'
import { Notification } from './components_notesPost/Notification'
import { NewNote } from './components_notesPost/NewNote'

export const FormsAxiosPostModule = () => {
    
    const [ notes, setNotes ] = useState([])
    const [ newNote, setNewNote ] = useState('')
    const [ showAll, setShowAll ] = useState(true)
    const [ errorMessage, setErrorMessage ] = useState('')
    const [ refresh, setRefresh ] = useState(true)
    const [ identifier, setIdentifier ] = useState("") 
    
    //const [id, setId] = useState("") 

    useEffect(() => {  
       noteService.getAll()
       .then(initialNotes => setNotes(initialNotes))              
       }, [newNote, refresh])
        
    const handleNoteChange = (event) => {
        setNewNote(event.target.value)
        console.log("EVENT1", event)
    }
   
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5? true : false
    }

    const addNote = async (event) => {
        event.preventDefault()
        await noteService.create(noteObject)
        setRefresh(!refresh)
        setNewNote("")
    }
    //const notesToShow = showAll? notes: notes.filter(note => note.important === true)
   
    const toggleImportanceOf = async (id) => {
        // const noteFilter =  notes.filter(n => n.id === id)
        // console.log("note", noteFilter)
        console.log("OLD NOTES", notes)       
        const a  = notes.map(note=> note.id !== id? note : {...note, important:!note.important})
        console.log("newNotes", a)
        const algo = a.filter(e=> e.id ===id)   
        console.log("ALGO", algo)     
        noteService.update(id, algo[0])
        setNotes(a)
                // console.log("ALGO2", algo)        
        // return setRefresh(!refresh)
        }
        
        //     .catch(error => {    
        //       console.log("CATCHING ERRORS")           
        //       setErrorMessage(`the note '${note.content}' was already deleted from server`)  
        //       console.log("ERROR MESSAGE", errorMessage)           
        //       setTimeout(()=>setErrorMessage(null),5000)
        //       setNotes(notes.filter(n => n.id !== id))
        //     })
    //}
 
    const changeImportance = () => {
      setShowAll(!showAll)
      let filteredNotes =  notes.filter(note => note.important === true)
      console.log("FILTERED NOTES", filteredNotes)
      setNotes(filteredNotes)
      return showAll===false? notes : setRefresh(!refresh)
    }

  return (
    <div>
        <h1>Blog Notes</h1>
        <Notification message={errorMessage}></Notification>
        <NewNote
          newNote={newNote}
          addNote={addNote}
          handleNoteChange={handleNoteChange}
          showAll={showAll}
          changeImportance={changeImportance}          
          >
        </NewNote>    
                 
        <NotePost
          notes={notes} 
          toggleImportanceOf={toggleImportanceOf}>
        </NotePost>
         
    </div>
  )
}