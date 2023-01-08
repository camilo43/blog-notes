import React from 'react'

export const NotePost = (props) => {
    //const label = props.notes.important? 'make not important' : 'make important'
   
    return <>
        {props.notes.map((e,i)=>{
            return <form>
            <ul>
                <li key={e.id}>
                    {e.content}
                </li>
                <button 
                    onClick={(f)=> {
                        f.preventDefault()
                        props.toggleImportanceOf(e.id)
                    }}
                        > {e.important? 'make not important' : 'make important'}</button>
                <br></br>
            </ul>
            </form>
    })}
    
    </>
  }
  