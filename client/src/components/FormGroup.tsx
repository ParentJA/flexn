import React, { ChangeEventHandler } from 'react';
import { Form } from 'react-bootstrap';

interface Props {
  errors: any;
  handleChange: ChangeEventHandler;
  name: string;
  value: string;
}

export default function FormGroup({
  errors,
  handleChange,
  name,
  value,
}: Props) {
  const title = (text: string): string => {
    if (text.length < 1) {
      return text;
    }
    if (text.length === 1) {
      return text.toUpperCase();
    }
    return text.substring(0, 1).toUpperCase() + text.substring(1);
  };

  const label = `${title(name)}:`;

  return (
    <Form.Group className="mb-3" controlId={name}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        className={name in errors ? 'is-invalid' : ''}
        name={name}
        onChange={handleChange}
        required
        value={value}
      />
      {name in errors && (
        <Form.Control.Feedback type="invalid">
          {errors[name]}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
}
