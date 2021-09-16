import { FieldMetaProps } from "formik";

export const formikError = (meta: FieldMetaProps<any>) =>
  meta.touched && meta.error;

export const hasFormikError = (meta: FieldMetaProps<any>) =>
  formikError(meta) ? true : false;

export const formikFieldErrorProps = (meta: FieldMetaProps<any>) => {
  return {
    error: hasFormikError(meta),
    helperText: formikError(meta),
  };
};