import { FormHelperText } from "@material-ui/core";
import { FieldMetaProps } from "formik";
import React from "react";
import { formikFieldErrorProps } from "../../utilities/formikError";

export const FormikErrorText = ({ meta }: { meta: FieldMetaProps<any> }) => {
  const { error, helperText } = formikFieldErrorProps(meta);

  return <FormHelperText error={error}>{helperText}</FormHelperText>;
};