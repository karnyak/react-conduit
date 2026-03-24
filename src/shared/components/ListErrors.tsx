import type { Errors } from '../../core/models/errors.model';

interface Props {
  errors: Errors | null;
}

export function ListErrors({ errors }: Props) {
  if (!errors) return null;
  const messages = Object.entries(errors.errors).map(([key, vals]) =>
    vals.map((v) => `${key} ${v}`)
  ).flat();
  if (!messages.length) return null;
  return (
    <ul className="error-messages">
      {messages.map((msg, i) => <li key={i}>{msg}</li>)}
    </ul>
  );
}
