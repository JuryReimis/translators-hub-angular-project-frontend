

export interface IUserProfile {
  slug: string
  experience: string
  description: string
  profile_image: string
  titles: Array<string>
  reputation: number
}


export interface IUser {
  username: string
  first_name: string
  last_name: string
  email: string
  is_staff: boolean
  is_active: boolean
  date_joined: string
  userprofile: IUserProfile
}

export interface IUserProfileUpdate {
  experience: string
  description: string
  profile_image: string
}

export interface IUserUpdate {
  username: string
  first_name: string
  last_name: string
  userprofile: IUserProfileUpdate
}

export interface IToken {
  auth_token: string
}
