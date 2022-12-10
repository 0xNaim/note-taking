import { NoteData, Tag } from '../app/App';
import NoteForm from './NoteForm';

/**
 * NewNoteProps is an object with two functions and an array of Tag objects.
 * @property onSubmit - This is a function that will be called when the user submits the form. It will
 * be passed the data that the user entered.
 * @property onAddTag - This is a function that will be called when the user adds a new tag.
 * @property {Tag[]} availableTags - An array of Tag objects that are available to be added to the
 * note.
 */
type NewNoteProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
};

const NewNote = ({
  onSubmit,
  onAddTag,
  availableTags,
}: NewNoteProps): JSX.Element => {
  return (
    <>
      <h3 className="mb-4 h3">New Note</h3>
      <NoteForm
        onSubmit={onSubmit}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </>
  );
};

export default NewNote;
