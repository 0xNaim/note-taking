import { NoteData, Tag } from '../app/App';
import NoteForm from './NoteForm';
import { useNote } from './NoteLayout';

type EditNoteProps = {
  onSubmit: (id: string, data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
};

const EditNote = ({
  onSubmit,
  onAddTag,
  availableTags,
}: EditNoteProps): JSX.Element => {
  const note = useNote();

  return (
    <>
      <h3 className="mb-4 h3">Edit Note</h3>
      <NoteForm
        title={note.title}
        markdown={note.markdown}
        tags={note.tags}
        onSubmit={(data) => onSubmit(note.id, data)}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </>
  );
};

export default EditNote;
