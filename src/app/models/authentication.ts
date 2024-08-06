

export interface IUser {
  username: string
  firstName: string
  lastName: string
  email: string
  isStaff: boolean
  isActive: boolean
  dateJoined: string
}

export interface IUserProfile {
  user: IUser
  url: string
  experience: string
  description: string
  profile_image: string
  titles: string
  reputation: number
}

export interface IUserData {
  user: IUser
  userProfile: IUserProfile
}
