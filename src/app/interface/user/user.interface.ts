export interface IUserData{
  user: {
    id: string,
    firstName: string,
    lastName: string,
  },
  accessToken: string,
  refreshToken: string,
  expiresIn: string
}


export interface IUser{
  id: string,
  firstName: string,
  lastName: string,
}