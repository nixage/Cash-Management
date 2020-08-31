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

export interface IUserInfo{
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  lastVisit: string,
  balance: number,
  icon?: string
}