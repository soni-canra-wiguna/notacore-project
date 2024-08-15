import React from "react"
import { ProductCard } from "./product-card"

const ListsProducts = () => {
  return (
    <div className="flex h-full w-full flex-col gap-4">
      {Array.from({ length: 10 }, (_, i) => (
        <ProductCard key={i} />
      ))}
    </div>
  )
}

export default ListsProducts
