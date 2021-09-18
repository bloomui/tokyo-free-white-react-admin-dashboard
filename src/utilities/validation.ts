import moment from "moment";

export const dateFormat = "YYY-MM-DD";

export const parseDate = (dateString: string) =>
  moment.utc(dateString, dateFormat, true);

export const stringToDate = (dateString: string): Date =>
  parseDate(dateString).toDate();
export const isValidDate = (value: string): boolean => {
  const date = parseDate(value);
  return date.isValid();
};

export const isBeforeOrOnToday = (dateString: string): boolean => {
  const date = parseDate(dateString);

  return date <= moment();
};

export const isAfterOrOnToday = (dateString: string): boolean => {
  const date = parseDate(dateString);

  return moment().diff(date, "day") <= 0;
};

export function isValidIban(iban: string): boolean {
  const IBAN_IDENTIFICATION_REGEXP = /^([0-9]|[A-Z])*$/;
  const IBAN_COUNTRY_REGEXP = /^([A-Z])*$/;
  const IBAN_CHECKSUM_REGEXP = /^([0-9])*$/;

  const validCountry = IBAN_COUNTRY_REGEXP.test(iban.substring(0, 2));
  const validCheckSum = IBAN_CHECKSUM_REGEXP.test(iban.substring(2, 4));
  const validIdentification =
    IBAN_IDENTIFICATION_REGEXP.test(iban.substring(4)) &&
    iban.substring(4).length <= 30;

  if (!validCountry || !validCheckSum || !validIdentification) return false;

  iban = iso13616Prepare(iban);
  const remainder = iso7064Mod97_10(iban);
  return remainder === 1;
}

export function isEmail(email: string): boolean {
  // Source: http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
  const EMAIL_REGEXP =
    /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*)?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*)?$/;

  return EMAIL_REGEXP.test(email);
}

export function isAddress(address: string): boolean {
  /// Matches addresses to Name {optional second name} Number, PostCode, city
  /// Look 2, 5644GJ, Eindhoven example match
  const Address_REGEXP =
    /^[A-z]+( [A-z]+)? \d+, (\d{4})([A-Z]{2}), ([A-z]+)$/gm;

  return Address_REGEXP.test(address);
}

export function isValidPhone(value: string): boolean {
  const PHONE_REGEXP = /^([0-9]|\(|\)|\*|\+|#)*$/;
  return PHONE_REGEXP.test(value);
}

export const passwordLength = 8;

export const isValidPassword = (value: string): boolean => {
  return value.length >= 8;
};

/**
 * Prepare an IBAN for mod 97 computation by moving the first 4 chars to the end and transforming the letters to
 * numbers (A = 10, B = 11, ..., Z = 35), as specified in ISO13616.
 */
const iso13616Prepare = (iban: string): string => {
  iban = iban.substr(4) + iban.substr(0, 4);

  const A = "A".charCodeAt(0),
    Z = "Z".charCodeAt(0);

  return iban
    .split("")
    .map(function (n) {
      const code = n.charCodeAt(0);
      if (code >= A && code <= Z) {
        // A = 10, B = 11, ... Z = 35
        return code - A + 10;
      } else {
        return n;
      }
    })
    .join("");
};

/**
 * Calculates the MOD 97 10 of the passed IBAN as specified in ISO7064.
 */
const iso7064Mod97_10 = (iban: string): number => {
  var remainder = iban,
    block;

  while (remainder.length > 2) {
    block = remainder.slice(0, 9);
    remainder = (parseInt(block, 10) % 97) + remainder.slice(block.length);
  }

  return parseInt(remainder, 10) % 97;
};

export const yearMonthFormat = "YYYY-MM";

const parseYearMonth = (yearMonthString: string) =>
  moment(yearMonthString, yearMonthFormat, true);

export const isValidYearMonth = (value: string): boolean => {
  const yearMonth = parseYearMonth(value);
  return yearMonth.isValid();
};

export const isInOrAfterCurrentMonth = (value: string): boolean => {
  const yearMonth = parseYearMonth(value);

  const currentDate = moment();

  return (
    yearMonth.month() >= currentDate.month() &&
    yearMonth.year() >= currentDate.year()
  );
};