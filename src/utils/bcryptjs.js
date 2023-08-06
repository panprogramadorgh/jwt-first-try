import bcryptjs from "bcryptjs";

export const hash = (string) => {
  return bcryptjs.hashSync(string, 12);
};

export const compare = (textPlain, textHash) => {
  return bcryptjs.compareSync(textPlain, textHash);
};
