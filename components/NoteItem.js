import { useState } from 'react';
import { doc, deleteDoc, updateDoc } from '@firebase/firestore';
import { db } from '../firebaseConfig';
import { Button } from '@mui/material';

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
          <Button
            className='min-w-[125px] max-w-[20%] text-stone-900 bg-emerald-50  hover:bg-cyan-200 mt-[4%] '
            variant='contained'
            type='submit'
          >
            Submit
          </Button>
        </form>
      ) : (
        <p>{note.data.body}</p>
      )}
      <Button
        onClick={() => setIsEditing(!isEditing)}
        className='min-w-[125px] max-w-[20%] text-stone-900 bg-emerald-50  hover:bg-cyan-200 mt-[4%] '
        variant='contained'
      >
        Edit
      </Button>
      <Button
        className='min-w-[125px] max-w-[20%] text-stone-900 bg-emerald-50  hover:bg-cyan-200 mt-[4%] '
        variant='contained'
        onClick={handleDelete}
      >
        Delete
      </Button>
    </article>
  );
};

export default NoteItem;
