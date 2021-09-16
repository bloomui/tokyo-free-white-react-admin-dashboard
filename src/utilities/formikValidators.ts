import {
    isValidDate,
    dateFormat,
    isBeforeOrOnToday,
    isValidIban,
    isEmail,
    isValidPhone,
    isValidPassword,
    passwordLength,
    stringToDate,
    isValidYearMonth,
    yearMonthFormat,
    isInOrAfterCurrentMonth,
    isAfterOrOnToday,
    isAddress,
  } from "./validation";
  
  export type Validator = (value: any | undefined) => any | undefined;
  
  export const required: Validator = (value) => {
    return value ? undefined : "Dit veld is verplicht";
  };
  
  export const mustBeAddress: Validator = (value) => {
    // regex(isAddress) checks for empty address as well
    return value && isAddress(value) ? undefined : "Invoer moet een adres zijn";
  };
  
  export const mustNotContainSpecialCharacters: Validator = (value) => {
    const format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;  
    return !format.test(value) ? undefined : "Invoer moet een geldige tekenreeks zijn";
  }
  
  export const mustBeYear: Validator = (value) => {
    return value && mustBeNumber(value) && mustBeLargerThan(1)
      ? "Invoer moet een jaar zijn"
      : undefined;
  };
  
  export const mustBeNumber: Validator = (value) =>
    value && isNaN(+value) ? "Invoer moet een getal zijn" : undefined;
  
  export const mustBeLargerThan: (lowerbound: number) => Validator =
    (lowerbound) => (value) =>
      value && Number(value) < lowerbound
        ? "Invoer moet groter of gelijk zijn aan " + lowerbound
        : undefined;
  
  export const mustBeDate: Validator = (value) =>
    value && isValidDate(value)
      ? undefined
      : `Moet een datum zijn met format ${dateFormat}`;
  
  export const mustBeBeforeOrOnToday: Validator = (value) =>
    value && isBeforeOrOnToday(value)
      ? undefined
      : `Datum moet voor of op de huidige datum zijn`;
  
  export const mustBeIban: Validator = (value) =>
    value && isValidIban(value) ? undefined : "Ongeldige iban";
  
  export const mustBePhoneNumber: Validator = (value) =>
    value && isValidPhone(value) ? undefined : `Ongeldig telefoon nummer`;
  
  export const mustBeEmail: Validator = (value) =>
    value && isEmail(value) ? undefined : `Ongeldig email adres`;
  
  export const mustBePassword: Validator = (value) =>
    value && isValidPassword(value)
      ? undefined
      : `Wachtwoorden moeten ten minste ${passwordLength} karakters lang zijn.`;
  
  export const mustBeAfterOrOnDate: (date: Date, message: string) => Validator =
    (date, message) => (value) => {
      return value && stringToDate(value) >= date ? undefined : message;
    };
  
  export const mustBeAfterOrOnToday: Validator = (value) =>
    value && isAfterOrOnToday(value)
      ? undefined
      : `Date must be after or on the current date`;
  
  export const mustBeAfterDate: (date: Date, message: string) => Validator =
    (date, message) => (value) => {
      return value && stringToDate(value) > date ? undefined : message;
    };
  
  export const mustBeBeforeOrOnDate: (date: Date, message: string) => Validator =
    (date, message) => (value) => {
      return value && stringToDate(value) <= date ? undefined : message;
    };
  
  export const mustBeUnique: (numbers: Array<string>) => Validator =
    (numbers) => (value) => {
      let occurence = numbers.filter((v) => v === value).length;
      if (occurence > 1) {
        return `${value} is al gedefinieerd`;
      }
    };
  
  export const mustBeBetween: (boundary: {
    lowerBound: number;
    upperBound: number;
  }) => Validator =
    ({ lowerBound, upperBound }) =>
    (value) => {
      const message = `Waarde moet tussen ${lowerBound} en ${upperBound} liggen`;
      if (!value) {
        return message;
      }
  
      const number = Number(value);
  
      const isValid = number >= lowerBound && number <= upperBound;
  
      return isValid ? undefined : message;
    };
  
  export const mustBeYearMonth: Validator = (value) =>
    value && isValidYearMonth(value)
      ? undefined
      : `Must be a year month combination in format ${yearMonthFormat}`;
  
  export const mustBeInOrAfterCurrentMonth: Validator = (value) =>
    value && isInOrAfterCurrentMonth(value)
      ? undefined
      : `Must be a year month combination in or after the current month`;
  
  export const mustHaveFileSize =
    (maxFileSize: number): Validator =>
    (value: File) => {
      return value && value.size <= maxFileSize
        ? undefined
        : "Bestand is te groot";
    };
  
  export const mustHaveExtension =
    (extension: string, fileName: string): Validator =>
    (value: File | undefined) =>
      value && value.name.split(".").pop() == extension
        ? undefined
        : `Bestand moet een ${fileName} file zijn`;
  
  export const composeValidators =
    (...validators: Array<Validator>): Validator =>
    (value) =>
      validators.reduce(
        (error: string | undefined, validator: Validator) =>
          error || validator(value),
        undefined
      );