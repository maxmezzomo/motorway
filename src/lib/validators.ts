const emailError = ["Please enter a valid email."] as const;

const validateEmail = (input: string) => {
  const emailParts = input.split("@");

  if (emailParts.length !== 2) return emailError;

  const account = emailParts[0];
  const address = emailParts[1];

  if (account.length > 64) return emailError;
  else if (address.length > 255) return emailError;

  const domainParts = address.split(".");
  if (
    domainParts.some(function (part) {
      return part.length > 63;
    })
  )
    return emailError;

  return [];
};

const isDateTuple = (
  dateArr: string[] | [string, string, string]
): dateArr is [string, string, string] => dateArr.length === 3;

const dateError = ["Please enter a valid date."];

const validateDate = (input: string) => {
  const dateArr = input.split("-");
  if (!isDateTuple(dateArr)) return dateError;
  if (dateArr.some((d) => isNaN(parseInt(d)))) return dateError;
  //could do other validation but lets say the input numbers are okay..
  //could try parse Date to timestamp and check if valid or NaN
  return [];
};

const validators = {
  email: validateEmail,
  date: validateDate,
} as const;

export default validators;
