import * as Yup from "yup";

const dateRegex = /^(19|20)\d\d-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;
export const yupDate = Yup.string().matches(dateRegex);

const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;
export const yupTime = Yup.string().matches(timeRegex);
