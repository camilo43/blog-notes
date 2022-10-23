export const NotePost = ({ note, toggleImportance }) => {
    const label = note.important? 'make not important' : 'make important'
   
    return <li>
        {note.content} <br></br>
        <button onClick={toggleImportance}>{label}</button>
        <br></br>
        <br></br>
    </li>
  }
  