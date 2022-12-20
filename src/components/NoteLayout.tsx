import {
  Navigate,
  Outlet,
  useOutletContext,
  useParams,
} from 'react-router-dom';
import { Note } from '../app/App';

type NoteLayoutProps = {
  notes: Note[];
};

const NoteLayout = ({ notes }: NoteLayoutProps): JSX.Element => {
  const { id } = useParams();
  const note = notes.find((n) => n.id === id);

  if (note == null) return <Navigate to="/" replace />;

  return <Outlet context={note} />;
};

export default NoteLayout;

export const useNote = () => useOutletContext<Note>();
