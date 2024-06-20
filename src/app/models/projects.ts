import {IUser} from "./authentication";


export interface IProject {
  title: string
  slug: string
  description: string
  game: IGame
  originalContent: IOriginalContent
  sourceLanguage: ILanguage
  targetLanguage: ILanguage
  image: string
  authors: IRoles[]
  status: string
  views: number
  createdDate: string
}


export interface IGame {
  gameTitle: string
  description: string
}


export interface ILanguage {
  languageTitle: string
}


export interface IRoles {
  user: IUser
  role: string
}

export interface IOriginalContent {
  title: string,
  url: string
}
