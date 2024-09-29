export interface User {
  id: string;
  userName : string;
  email : string;
  password: string,
  profilePicture?: string,
  biography?: string,
  location?: string,
  dateOfBirth?: Date
  role: string
}
