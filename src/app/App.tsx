import { Container } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import NewNote from '../components/NewNote';

export type Note = {
  id: string;
} & NoteData;

export type RawNote = {
  id: string;
};

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

  return (
    <Container className="my-4">
      <Routes>
        <Route path="/" element={<h3>Note Taking App With TypeScript</h3>} />
        <Route path="/new" element={<NewNote />} />
      </Routes>
    </Container>
  );
};

export default App;
