import { useState } from 'react';
import { doc, deleteDoc, updateDoc } from '@firebase/firestore';
import { db } from '../firebaseConfig';
import { Paper, Button, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

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
          <div className='flex flex-col justify-center'>
            <TextField
              className='mt-[2%]'
              type='text'
              value={editedNote}
              onChange={e => setEditedNote(e.target.value)}
              autoFocus
              variant='outlined'
            ></TextField>

            <Button
              className='min-w-[125px] max-w-[20%] text-stone-900 bg-cyan-200  hover:bg-pink-500 mt-[4%] self-center'
              variant='contained'
              type='submit'
              endIcon={<KeyboardArrowUpIcon />}
            >
              Submit
            </Button>
          </div>
        </form>
      ) : (
        <Paper elevation={6} className='p-3 content-center'>
          {note.data.body}
        </Paper>
      )}
      <div className='mb-[2%]'>
        <Button
          className='min-w-[100px] max-w-[20%] text-stone-900 bg-cyan-200  hover:bg-pink-500 my-[10px] mr-[10px]'
          onClick={() => setIsEditing(!isEditing)}
          variant='contained'
          startIcon={<EditIcon />}
        >
          Edit
        </Button>

        <Button
          className='min-w-[100px] max-w-[20%] text-stone-900 bg-cyan-200  hover:bg-pink-500 my-[10px] mr-[10px]'
          onClick={handleDelete}
          variant='contained'
          startIcon={<DeleteForeverIcon />}
        >
          Delete
        </Button>
      </div>
    </article>
  );
};

export default NoteItem;
