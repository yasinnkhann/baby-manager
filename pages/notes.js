import Head from 'next/head';
import NoteItem from '../components/NoteItem';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebaseConfig';
import { useRouter } from 'next/router';
import { collection, addDoc, getDocs, doc } from '@firebase/firestore';
import { Paper, Button } from '@mui/material';

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
      <Button
        className='min-w-[125px] max-w-[20%] text-stone-900 bg-emerald-50  hover:bg-cyan-200 mt-[4%] '
        variant='contained'
        type='submit'
      >
        Submit
      </Button>
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

      <section className="font-['Rubik'] h-full mx-auto w-3/4 mt-2 flex flex-col justify-start px-4">
        <div className='flex flex-row justify-between'>
          <h1 className='font-medium self-center text-[26px] md:text-4xl lg:text-5xl'>
            Notes
          </h1>
          <Button
            onClick={() => setIsAddingNote(!isAddingNote)}
            variant='contained'
            className='bg-pink-500 m-5 max-w-[25%] self-center'
          >
            Add Note
          </Button>
        </div>

        {isAddingNote ? renderAddNote() : null}
        <div className='flex flex-col'>{renderNotes()}</div>
      </section>
    </div>
  );
};

export default Notes;
