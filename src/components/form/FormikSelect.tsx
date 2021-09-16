import { InputLabel, MenuItem, Select } from "@material-ui/core";
import { useField } from "formik";
import React from "react";
import { Validator } from "../../utilities/formikValidators";
import { FormikErrorText } from "../error/formik";

export const FormikSelect = ({
  title,
  name,
  validate,
  children,
}: {
  title: string;
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
      <Select name={name} value={field.value} onChange={field.onChange}>
        {children}
      </Select>
      <FormikErrorText meta={meta} />
    </>
  );
};