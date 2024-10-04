export interface User {
  id: string;
  userName : string;
  email : string;
  password: string,
  profilePicture?: string,
  dateOfBirth?: Date
  role: string
  location?: string,
}

export interface Artist extends User{
  biography?: string,

  
}
