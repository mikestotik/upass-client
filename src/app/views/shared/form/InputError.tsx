import { ErrorMessage } from 'formik';

interface InputErrorProps {
  name: string;
}

export const InputError = ({ name }: InputErrorProps) => {
  return <ErrorMessage component="div" name={name} className="form-error" />;
};
