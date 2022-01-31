import Head from 'next/head';
import NoteItem from '../components/NoteItem';
import { getAuth } from '@firebase/auth';
import axios from 'axios';
import { useState } from 'react';

export const getStaticProps = async () => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    console.log(user);
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/todos');
    return {
      props: {
        notes: data,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: {
        error: err.toString(),
      },
    };
  }
};

const Notes = ({ notes }) => {
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [newNote, setNewNote] = useState('');
  // const [notes, setNotes] = useState(notes);

  const renderNotes = () => notes?.map(note => <NoteItem key={note.id} note={note} />);

  const handleNewNote = async e => {
    try {
      e.preventDefault();
      //create new note in firestore
    } catch (err) {
      console.log(err);
    } finally {
      //render new note
      setIsAddingNote(false);
      setNewNote('');
    }
  };

  const renderAddNote = () => {
    return (
      <form onSubmit={e => handleNewNote(e)}>
        <input type='text' value={newNote} onChange={e => setNewNote(e.target.value)} />
        <button type='submit'>Submit</button>
      </form>
    );
  };

  return (
    <>
      <Head>
        <title>BabyManager | Notes</title>
      </Head>
      <section>
        <h1>Notes</h1>
        <button onClick={() => setIsAddingNote(!isAddingNote)}>Add Note</button>
        {isAddingNote ? renderAddNote() : null}
        {renderNotes()}
      </section>
    </>
  );
};

export default Notes;
