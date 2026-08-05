import { createContext } from "react";

export const User = createContext({
  name: "",
  id: "",
  occupation: '',
  location: '',
  interest: [''],
  diate: false,
  fitness: '',
  language: '',
  family: '',
  education: '',
  religion:'',
  isAuthenticated: false,
  bio: "",
  photos: [
    {
      profile: "",
    },
    { upload: "" },
  ],
});
