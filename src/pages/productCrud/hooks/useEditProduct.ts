import application from "@/infra/applicationInstance"
import type { Product } from "@luanamaistro/core-lib"
import { useProductCrudStore } from "../ProductCrudStore"
import useNotification from "@/hooks/notification/notification"

const useEditProduct = () => {
  const [show, setShow] = useState(false)
  const [showInactivateConfirm, setShowInactivateConfirm] = useState(false)
  const [product, setProduct] = useState<Product | null>(null)

  const { loadProducts } = useProductCrudStore()
  const { notify } = useNotification()


  const openInactivateConfirm = (product: Product) => {
    setProduct(product)
    setShowInactivateConfirm(true)
  }

  const closeInactivateConfirm = () => setShowInactivateConfirm(false)

  const inactivateProduct = async () => {
    const result = await application.ToggleProductActiveStatus.execute({
      product: product!
    })

    notify(operationResultToNotification(result))

    setShowInactivateConfirm(false)
    loadProducts()
  }

  const open = (product: Product) => {
    setProduct(product)
    setShow(true)
  }

  const close = () => setShow(false)

  return {
    show,
    open,
    close,
    product,
    showInactivateConfirm,
    openInactivateConfirm,
    closeInactivateConfirm,
    inactivateProduct
  }
}

export default useEditProduct
