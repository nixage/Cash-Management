export interface IFinance {
  id?: number,
  balance: number,
  expenses: number,
  income: number,
}

export interface ISavings{
  id?: number,
  name: string,
  img: string,
  amount: number
}
export interface ISavingsOptions{
  id?: number,
  name: string
}

export interface ISpends{
  id?: number,
  name: string,
  img: string,
  amount: number,
  savingId: number,
}
export interface ISpendsOptions{
  id?: number,
  name: string
}
