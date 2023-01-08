const NewNote = ( props ) => {

return <div>
        <form onSubmit={props.addNote}>
            <input
                placeholder="Add a new note..." 
                value={props.newNote}
                onChange={props.handleNoteChange} />
            <button 
                onClick={props.addNote}
                type="submit">save</button>
        </form>
        <div>
            <button 
                onClick={() => props.changeImportance()}> show {props.showAll ? 'all' : 'important' }</button>
        </div>
    </div>
} 

export { NewNote }