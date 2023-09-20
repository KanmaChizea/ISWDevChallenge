export const EmptyStringValidation = (value: string) => {
  if (value == '') {
    return "This field can't be empty";
  } else {
    return undefined;
  }
};

export const NumberValidation = ({
  value,
  errorMessage,
}: {
  value: string;
  errorMessage?: string;
}) => {
  if (/^\d+$/.test(value)) {
    return undefined;
  } else {
    return errorMessage ?? 'Invalid format. Only numbers allowed';
  }
};
export const NoSpecialCharactersValidation = (value: string) => {
  const pattern = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\|/]/;
  if (pattern.test(value)) {
    return 'Invalid format. No special characters allowed';
  } else {
    return undefined;
  }
};
export const ExactLengthValidation = (props: {
  value: string;
  length: number;
}) => {
  if (props.value.length !== props.length) {
    return 'Value should have ' + props.length + ' characters';
  } else {
    return undefined;
  }
};
