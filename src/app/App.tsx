import { useMemo } from 'react';
import { Container } from 'react-bootstrap';
import { Navigate, Route, Routes } from 'react-router-dom';
import { v4 as uuidV4 } from 'uuid';
import EditNote from '../components/EditNote';
import NewNote from '../components/NewNote';
import Note from '../components/Note';
import NoteLayout from '../components/NoteLayout';
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

/**
 * It takes an id and a NoteData object, and returns a new array of notes where the note with the given
 * id has its data updated with the given data
 * @param {string} id - The id of the note to update
 * @param {NoteData}  - `id` is the id of the note to update
 */
  const onUpdateNote = (id: string, { tags, ...data }: NoteData) => {
    setNotes((prevNotes) => {
      return prevNotes.map((note) => {
        if (note.id === id) {
          return { ...note, ...data, tagIds: tags.map((tag) => tag.id) };
        } else {
          return note;
        }
      });
    });
  };

/**
 * We're filtering out the note that has the id that we pass in
 * @param {string} id - The id of the note that we want to delete.
 */
  const onDeleteNote = (id: string) => {
    setNotes((prevNote) => {
      return prevNote.filter((note) => note.id !== id);
    });
  };

 /**
  * If the tag's id matches the id passed in, return a new tag object with the label property set to
  * the label passed in. Otherwise, return the tag as is
  * @param {string} id - string - the id of the tag to update
  * @param {string} label - The new label for the tag
  */
  const updateTag = (id: string, label: string) => {
    setTags((prevTags) => {
      return prevTags.map((tag) => {
        if (tag.id === id) {
          return { ...tag, label };
        } else {
          return tag;
        }
      });
    });
  };

/**
 * We're returning a new array of tags that doesn't include the tag with the id that was passed in
 * @param {string} id - The id of the tag to be deleted
 */
  const deleteTag = (id: string) => {
    setTags((prevTags) => {
      return prevTags.filter((tag) => tag.id !== id);
    });
  };

  return (
    <Container className="my-4">
      <Routes>
        <Route
          path="/"
          element={
            <NoteList
              notes={notesWithTags}
              availableTags={tags}
              onUpdateTag={updateTag}
              onDeleteTag={deleteTag}
            />
          }
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
        <Route path="/:id" element={<NoteLayout notes={notesWithTags} />}>
          <Route index element={<Note onDelete={onDeleteNote} />} />

          <Route
            path="edit"
            element={
              <EditNote
                onSubmit={onUpdateNote}
                onAddTag={addTag}
                availableTags={tags}
              />
            }
          />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  );
};

export default App;
