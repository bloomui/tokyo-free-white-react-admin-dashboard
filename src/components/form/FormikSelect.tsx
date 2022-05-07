import { InputLabel, MenuItem, Select } from "@material-ui/core";
import { useField } from "formik";
import React from "react";
import { Validator } from "../../utilities/formikValidators";
import { FormikErrorText } from "../error/formik";

export const FormikSelect = ({
  placeholder,
  title,
  name,
  validate,
  children,
}: {
  placeholder?: string;
  title?: string;
  name: string;
  validate?: Validator;
  children: any[]; // todo implement static check
}) => {
  const [field, meta] = useField({
    name,
    validate,
  });

  return (
    <>
      <InputLabel>{title}</InputLabel>
      <Select
      defaultValue={placeholder}
        fullWidth
        variant="outlined"
        size="small"
        name={name}
        value={field.value}
        onChange={field.onChange}
      >
        {children}
      </Select>
      <FormikErrorText meta={meta} />
    </>
  );
};
