import Head from 'next/head';
import NoteItem from '../components/NoteItem';
import { getAuth } from '@firebase/auth';
import axios from 'axios';
import { useState } from 'react';

export const getStaticProps = async () => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
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

  const renderNotes = () => {
    return notes?.map(note => <NoteItem key={note.id} note={note} />);
  };

  const handleNewNote = async e => {
    e.preventDefault();
    //create new note in firestore
    setIsAddingNote(false);
    setNewNote('');
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
    <div className='h-screen my-[10%]'>
      <Head>
        <title>BabyManager | Notes</title>
      </Head>
      <section>
        <h1>Notes</h1>
        <button onClick={() => setIsAddingNote(!isAddingNote)}>Add Note</button>
        {isAddingNote ? renderAddNote() : null}
        {renderNotes()}
      </section>
    </div>
  );
};

export default Notes;
