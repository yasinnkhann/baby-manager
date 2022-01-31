import { useState } from 'react';

const NoteItem = ({ note }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedNote, setEditedNote] = useState(note.title);

  const handleEdit = async e => {
    e.preventDefault();
    //editing note in firestore
    setIsEditing(false);
  };
  const handleDelete = async () => {
    //delete note from firestore
  };

  return (
    <article>
      {isEditing ? (
        <form onSubmit={e => handleEdit(e)}>
          <input
            type='text'
            value={editedNote}
            onChange={e => setEditedNote(e.target.value)}
          />
          <button type='submit'>Submit</button>
        </form>
      ) : (
        <p>{note.body}</p>
      )}
      <button onClick={() => setIsEditing(!isEditing)}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </article>
  );
};

export default NoteItem;
