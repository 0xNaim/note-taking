import { Badge, Button, Col, Row, Stack } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import { Link, useNavigate } from 'react-router-dom';
import { useNote } from './NoteLayout';

type NoteProps = {
  onDelete: (id: string) => void;
};

const Note = ({ onDelete }: NoteProps): JSX.Element => {
  const note = useNote();
  const navigate = useNavigate();

  const handleDelete = (id: string) => {
    const confirm = window.confirm('Are you sure to delete this note');
    if (confirm) {
      onDelete(id);
      navigate('/');
    }
  };

  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h2>{note.title}</h2>
          {note.tags.length > 0 && (
            <Stack gap={1} direction="horizontal" className="flex-wrap">
              {note.tags.map((tag) => (
                <Badge className="text-truncate" key={tag.id}>
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to={`/${note.id}/edit`}>
              <Button variant="primary">Edit</Button>
            </Link>
            <Button
              onClick={() => handleDelete(note.id)}
              variant="outline-danger"
            >
              Delete
            </Button>
            <Link to="/">
              <Button variant="outline-secondary">Back</Button>
            </Link>
          </Stack>
        </Col>
      </Row>
      <ReactMarkdown>{note.markdown}</ReactMarkdown>
    </>
  );
};

export default Note;
