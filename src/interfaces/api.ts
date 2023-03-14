export interface User {
  name: { first: string; last: string };
  email: string;
  location: {
    country: string;
  };
  dob: {
    date: string;
  };
  gender: string;
  nat: string;
  phone: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
}

export enum Names {
  EMAIL = "Email",
  PROFILE = "Profile",
  LOCATION = "Location",
  BIRTHDAY = "Birthday",
  GENDER = "Gender",
  NATIONALITY = "Nationality",
  PHONE = "Phone",
}

export enum Genders {
  MALE = "male",
  FEMALE = "female",
}
