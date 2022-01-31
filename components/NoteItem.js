import { useState } from 'react';
import { doc, deleteDoc, updateDoc } from '@firebase/firestore';
import { db } from '../firebaseConfig';

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
        <p>{note.data.body}</p>
      )}
      <button onClick={() => setIsEditing(!isEditing)}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </article>
  );
};

export default NoteItem;
