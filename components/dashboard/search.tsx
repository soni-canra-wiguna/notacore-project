import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet"
import { useState } from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useDebounce } from "use-debounce"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Product } from "@prisma/client"
import { useAuth } from "@clerk/nextjs"
import { Loader2, SearchIcon, XIcon, ArrowUpFromLine } from "lucide-react"
import { ProductCard } from "./product-card"
import { Container } from "../layout/container"

export const SearchBar = ({ token }: { token: string }) => {
  const { userId } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [searchInput, setSeachInput] = useState("")
  const [debounceSearchInput] = useDebounce(
    searchInput.replace(/\s+/g, "-"),
    500,
  )

  const {
    data: searchResults,
    isPending,
    isError,
  } = useQuery<Product[]>({
    queryKey: ["search_input", debounceSearchInput],
    queryFn: async () => {
      const { data } = await axios.get(
        `/api/products?search=${debounceSearchInput}`,
        {
          headers: {
            Authorization: token,
            userId,
          },
        },
      )
      return data.data
    },
    enabled: !!debounceSearchInput,
  })

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <div className="relative h-8 w-full cursor-text rounded-lg bg-secondary selection:bg-transparent">
          <span className="absolute left-2.5 top-1/2 flex -translate-y-1/2 items-center gap-2 text-sm capitalize text-muted-foreground">
            <SearchIcon className="size-4 text-inherit" />
            cari produk
          </span>
        </div>
      </SheetTrigger>
      <SheetContent side="top" className="h-max w-full px-0 py-4">
        <SheetHeader className="sr-only">
          <SheetTitle>cari produk</SheetTitle>
          <SheetDescription>cari produk yang kamu suka</SheetDescription>
        </SheetHeader>
        <Container className="flex w-full flex-col gap-6">
          <div className="relative h-max w-full">
            <Input
              className="h-8 rounded-lg border-none bg-secondary px-4 text-sm placeholder:text-sm placeholder:capitalize focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
              placeholder="cari produk"
              value={searchInput}
              onChange={(e) => setSeachInput(e.target.value)}
            />
            {searchInput.length > 0 && (
              <XIcon
                onClick={() => setSeachInput("")}
                className="absolute-vertical right-2 z-50 size-4 cursor-pointer text-destructive"
              />
            )}
          </div>
          {/*  */}
          {debounceSearchInput.length === 0 ? null : isPending ? (
            <div className="flex items-center justify-center">
              <Loader2 className="size-6 animate-spin stroke-[1.5]" />
            </div>
          ) : searchResults?.length === 0 ? (
            <div className="text-center">produk tidak di temukan</div>
          ) : isError ? (
            <p className="text-center">koneksi kamu lambat, coba lagi</p>
          ) : (
            <div className="flex max-h-[500px] w-full flex-col gap-4 overflow-y-auto transition-all">
              {searchResults.map((result) => (
                <ProductCard
                  product={result}
                  key={result.id}
                  userId={userId!}
                  token={token}
                />
              ))}
            </div>
          )}
        </Container>
        <Button
          onClick={() => setIsOpen(!isOpen)}
          variant="link"
          className="absolute -bottom-12 right-6 px-0 capitalize tracking-wide text-background"
        >
          <ArrowUpFromLine className="mr-1.5 size-4 text-inherit" />
          tutup
        </Button>
      </SheetContent>
    </Sheet>
  )
}
