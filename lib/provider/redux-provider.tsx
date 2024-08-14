"use client"

import { store } from "@/redux/store"
import { WithChildren } from "@/types"
import { Provider } from "react-redux"

export const ReduxProvider = ({ children }: WithChildren) => {
  return <Provider store={store}>{children}</Provider>
}
