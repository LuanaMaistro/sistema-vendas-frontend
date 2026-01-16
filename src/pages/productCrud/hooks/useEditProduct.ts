import type { Product } from "@dibimo/core-lib"

const useEditProduct = () => {
  const [show, setShow] = useState(false)
  const [product, setProduct] = useState<Product | null>(null)

  const open = (product: Product) => {
    setProduct(product)
    setShow(true)
  }

  const close = () => setShow(false)

  return {
    show,
    open,
    close,
    product
  }
}

export default useEditProduct
