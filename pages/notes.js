import Head from 'next/head';
import NoteItem from '../components/NoteItem';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebaseConfig';
import { useRouter } from 'next/router';
import { collection, addDoc, getDocs, doc } from '@firebase/firestore';

const Notes = () => {
  const [notes, setNotes] = useState(null);
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!user && !loading) {
      router.push('/login');
    } else if (user) {
      fetchNotes();
    }
  }, [user, loading]); // eslint-disable-line

  const fetchNotes = async () => {
    try {
      const notesRef = collection(db, 'users', user.uid, 'notes');
      const notesSnap = await getDocs(notesRef);
      const notesData = [];
      notesSnap.forEach(note => notesData.push({ id: note.id, data: note.data() }));
      notesData.sort((a, b) => (a.data.createdAt > b.data.createdAt ? -1 : 1));
      setNotes(notesData);
    } catch (err) {
      console.log(err);
    }
  };

  const handleNewNote = async e => {
    try {
      e.preventDefault();
      const notesRef = collection(db, 'users', user.uid, 'notes');
      const docRef = await addDoc(notesRef, {
        body: newNote,
        createdAt: new Date().toISOString(),
      });
    } catch (err) {
      console.error('Error adding document: ', err);
    } finally {
      fetchNotes();
      setIsAddingNote(false);
      setNewNote('');
    }
  };

  const renderAddNote = () => (
    <form onSubmit={e => handleNewNote(e)}>
      <input
        type='text'
        value={newNote}
        onChange={e => setNewNote(e.target.value)}
        autoFocus
      />
      <button type='submit'>Submit</button>
    </form>
  );

  const renderNotes = () =>
    notes?.map(note => (
      <NoteItem key={note.id} note={note} fetchNotes={fetchNotes} user={user} />
    ));

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
