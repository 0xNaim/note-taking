import { useMemo } from 'react';
import { Container } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import { v4 as uuidV4 } from 'uuid';
import NewNote from '../components/NewNote';
import NoteList from '../components/NoteList';
import useLocalStorage from '../hooks/useLocalStrorage';

export type Note = {
  id: string;
} & NoteData;

export type RawNote = {
  id: string;
} & RawNoteData;

export type RawNoteData = {
  title: string;
  markdown: string;
  tagIds: string[];
};

export type NoteData = {
  title: string;
  markdown: string;
  tags: Tag[];
};

export type Tag = {
  id: string;
  label: string;
};

const App = (): JSX.Element => {
  const [notes, setNotes] = useLocalStorage<RawNote[]>('NOTES', []);
  const [tags, setTags] = useLocalStorage<Tag[]>('TAGS', []);

  /* It's a memoized version of the notes array. */
  const notesWithTags = useMemo(() => {
    return notes.map((note) => {
      return {
        ...note,
        tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
      };
    });
  }, [notes, tags]);

  /**
   * We're taking in a NoteData object, destructuring it to get the tags property, and then spreading
   * the rest of the data into a new object
   * @param {NoteData}  - { tags, ...data }: NoteData
   */
  const onCreateNote = ({ tags, ...data }: NoteData) => {
    setNotes((prevNotes) => [
      ...prevNotes,
      { ...data, id: uuidV4(), tagIds: tags.map((tag) => tag.id) },
    ]);
  };

  /**
   * AddTag is a function that takes a Tag as an argument and returns a function
   * @param {Tag} tag - Tag - this is the tag that we want to add to the list of tags
   */
  const addTag = (tag: Tag) => {
    setTags((prev) => [...prev, tag]);
  };

  return (
    <Container className="my-4">
      <Routes>
        <Route
          path="/"
          element={<NoteList notes={notesWithTags} availableTags={tags} />}
        />
        <Route
          path="/new"
          element={
            <NewNote
              onSubmit={onCreateNote}
              onAddTag={addTag}
              availableTags={tags}
            />
          }
        />
      </Routes>
    </Container>
  );
};

export default App;
