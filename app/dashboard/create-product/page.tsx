import { FormCreateProduct } from "@/components/dashboard/form-create-product"
import { auth } from "@clerk/nextjs/server"

const CreateProductPage = async () => {
  const { userId, getToken } = auth()
  const token = await getToken()
  return <FormCreateProduct userId={userId} token={token} />
}

export default CreateProductPage
