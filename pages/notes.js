import Head from 'next/head';
import NoteItem from '../components/NoteItem';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebaseConfig';
import { useRouter } from 'next/router';

const Notes = () => {
  const [notes, setNotes] = useState();
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!user && !loading) {
      router.push('/login');
    } else {
      fetchNotes();
    }
  }, [user, loading, router]);

  const fetchNotes = async () => {
    try {
      const { data } = await axios.get('https://jsonplaceholder.typicode.com/todos');
      setNotes(data);
    } catch (err) {
      console.log(err);
    }
  };

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
