export interface WithChildren {
  children: React.ReactNode
}

export interface TokenProps {
  token: string
}

export type TimeProps =
  | "today"
  | "oneWeekAgo"
  | "oneMonthAgo"
  | "threeMonthsAgo"
  | "sixMonthsAgo"
  | "oneYearAgo"

export interface WithTokenAndUserId extends TokenProps {
  userId: string
}
