import type { Product } from "@luanamaistro/core-lib"

export default function useStockMovement() {
  const [showAddStock, setShowAddStock] = useState(false)
  const [showRemoveStock, setShowRemoveStock] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const openAddStock = (product: Product) => {
    setSelectedProduct(product)
    setShowAddStock(true)
  }

  const closeAddStock = () => setShowAddStock(false)

  const openRemoveStock = (product: Product) => {
    setSelectedProduct(product)
    setShowRemoveStock(true)
  }

  const closeRemoveStock = () => setShowRemoveStock(false)

  return {
    showAddStock,
    showRemoveStock,
    selectedProduct,
    openAddStock,
    closeAddStock,
    openRemoveStock,
    closeRemoveStock,
  }
}
