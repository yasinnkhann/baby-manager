import { useState } from 'react';
import { doc, deleteDoc, updateDoc } from '@firebase/firestore';
import { db } from '../firebaseConfig';
import { Paper, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const NoteItem = ({ note, fetchNotes, user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedNote, setEditedNote] = useState(note.data.body);
  const noteRef = doc(db, 'users', user.uid, 'notes', note.id);

  const handleEdit = async e => {
    e.preventDefault();
    try {
      await updateDoc(noteRef, { body: editedNote });
    } catch (err) {
      console.log(err);
    } finally {
      fetchNotes();
      setIsEditing(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteDoc(noteRef);
    } catch (err) {
      console.log(err);
    } finally {
      fetchNotes();
    }
  };

  return (
    <article>
      {isEditing ? (
        <form onSubmit={e => handleEdit(e)}>
          <input
            type='text'
            value={editedNote}
            onChange={e => setEditedNote(e.target.value)}
            autoFocus
          />
          <button type='submit'>Submit</button>
        </form>
      ) : (
        // <p>{note.data.body}</p>
        <Paper elevation={6} className='p-3 content-center'>
          {note.data.body}
        </Paper>
      )}
      {/* <button onClick={() => setIsEditing(!isEditing)}>Edit</button> */}
      <Button
        className='min-w-[100px] max-w-[20%] text-stone-900 bg-emerald-50  hover:bg-cyan-200 mt-[10px] '
        onClick={() => setIsEditing(!isEditing)}
        variant='contained'
        startIcon={<EditIcon />}
      >
        Edit
      </Button>

      <button onClick={handleDelete}>Delete</button>
    </article>
  );
};

export default NoteItem;
