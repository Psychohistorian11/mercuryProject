export interface User {
  id: string;
  userName : string;
  email : string;
  password: string,
  profilePicture?: string,
  dateOfBirth?: string
  role: string
  location?: string,
}

export interface Artist extends User{
  biography?: string,

  
}
