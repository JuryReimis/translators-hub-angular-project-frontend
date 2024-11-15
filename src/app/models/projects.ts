import {IUser} from "./authentication";


export interface IProject {
  pk: number
  title: string
  description: string
  authors: ISortedRoles
  category: ICategory
  original_content: IOriginalContent
  source_language: ILanguage
  target_language: ILanguage
  image: string
  status: string
  views: number
  created_date: string

  [key: string]: any
}


export interface ICategory {
  title: string
  slug: string
  description: string
}


export interface IOriginalContent {
  title: string
  slug: string
  description: string
}


export interface ILanguage {
  languageTitle: string
}


export interface ISortedRoles {
  mdr: IUser[]

  tst: IUser[]

  org: IUser[]

  trs: IUser[]

  [key: string]: any
}

export interface IOriginalContent {
  title: string,
  url: string
}
