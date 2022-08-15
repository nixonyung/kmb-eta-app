import {object, string} from 'yup';

const User = object({
  First_Name: string().min(5).required(),
  Email: string().min(5).required(), // string().required() also invalidates empty strings
});

export default User;

export const UserInitialValue = {
  First_Name: '',
  Email: '',
};
