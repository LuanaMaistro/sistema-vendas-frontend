import type { Product } from "@dibimo/core-lib"
import application from "../../../infra/applicationInstance"
import useNotification from "../../../hooks/notification/notification"
import { useProductCrudStore } from "../ProductCrudStore"

const useDeleteProduct = () => {

  const { loadProducts } = useProductCrudStore()
  const { notify, contextHolder } = useNotification()

  const [showConfirm, setShowConfirm] = useState(false)
  const [product, setProductToDelete] = useState<Product>()

  const confirm = (product: Product) => {
    setProductToDelete(product)
    setShowConfirm(true)
  }

  const cancel = () => {
    setShowConfirm(false)
  }

  const deleteProduct = async () => {
    const result = await application.RemoveProduct.execute({
      id: product!.id!
    })

    notify(operationResultToNotification(result))

    setShowConfirm(false)
    loadProducts()

  }

  return {
    contextHolder,
    deleteProduct,
    cancel,
    confirm,
    showConfirm
  }
}

export default useDeleteProduct

