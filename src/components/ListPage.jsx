import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const ListPage = (props) => {
  const { id } = useParams()
  const [notes, setNotes] = useState([])
  let [noteValue, SetNoteValue] = useState([])
  useEffect(() => {
    const getList = async () => {
      let response = await fetch(`http://localhost:5000/notes?list_like=${id}`) //filter by list id
      let data = await response.json()
      setNotes(data)
    }
    getList()
  }, [])

  const addNote = async () => {
    let reponse = await fetch('http://localhost:5000/notes', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(
        {
          "body": noteValue,
          "list": id,
          "isComplete": 0,
        }
      )
    })
    let data = await reponse.json()
    console.log(data.id)
    let note = {
      "id": data.id,
      "body": data.body,
      "isComplete": data.isComplete
    }
    const newNotes = [...notes, note];
    setNotes(newNotes);
    SetNoteValue([])
  }

  const deleteNote = async (id) => {
    const removedArr = [...notes].filter(note => note.id !== id);

    let reponse = await fetch(`http://localhost:5000/notes/${id}`, {
      method: 'DELETE',
    })

    setNotes(removedArr);
  }


  const completeNote = async (id) => {
    let response = await fetch(`http://localhost:5000/notes/${id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(
        {
          "isComplete": 1,
        }
      )
    })
    let updatedNotes = notes.map(note => {
      if (note.id === id) {
        note.isComplete = !note.isComplete;
      }
      return note;
    });


    setNotes(updatedNotes);
  }

  return (
    <div>
      <h1>List of notes</h1>
      <p align='center'><input value={noteValue} onInput={(e) => SetNoteValue(e.target.value)} placeholder='Input new note'/> <button onClick={addNote} >Add new</button></p>
      {notes.map((note, index) => (
          <div className={note.isComplete == 1 ? 'note-item complete' : 'note-item'}>
              <p>{note.body}</p>
              <div>
                <EditIcon/>
                <DeleteIcon onClick={() => deleteNote(note.id)}/>
                <CheckCircleIcon onClick={() => completeNote(note.id)}/>
              </div>
          </div>
      ))}
    </div>
  );
}

export default ListPage;
