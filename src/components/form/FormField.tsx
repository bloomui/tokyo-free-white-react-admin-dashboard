import { useField } from "formik";
import { TextField, TextFieldProps } from "@material-ui/core";
import { formikFieldErrorProps } from "../../utilities/formikError";
import { Validator } from "../../utilities/formikValidators";

export type FieldProps = {
  name: string;
  label: string;
  validator?: Validator;
  otherFieldProps?: Partial<TextFieldProps>;
};

export const FormField = (props: FieldProps) => {
  const { name, label, validator, otherFieldProps } = props;

  const [field, meta] = useField({
    name,
    validate: validator,
  });

  return (
    <TextField
      {...(otherFieldProps as any)}
      {...field}
      fullWidth
      {...formikFieldErrorProps(meta)}
      label={label}
    //   autoComplete={name}
    />
  );
};