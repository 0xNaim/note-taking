import NoteForm from './NoteForm';

const NewNote = (): JSX.Element => {
  return (
    <>
      <h3 className="mb-4 h3">New Note</h3>
      <NoteForm />
    </>
  );
};

export default NewNote;
