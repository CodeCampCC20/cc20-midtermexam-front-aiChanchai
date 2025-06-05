export default function yupValidate(inputError) {
  const errorYup = inputError.inner.reduce((acc, cur) => {
    acc[cur.path] = cur.message;
    return acc;
  }, {});

  return errorYup;
}
