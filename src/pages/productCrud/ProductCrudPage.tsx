import { Button } from 'antd'
import styles from './ProductCrudPage.module.css'
import PageHeader from '../../components/headers/PageHeader/PageHeader'
import AddProductDrawer from './components/AddProductDrawer/AddProductDrawer'
import UpdateProductDrawer from './components/UpdateProductDrawer/UpdateProductDrawer'
import { DeleteConfirmationModal } from '../../components/modals/DeleteConfirmationModal'
import ProductTable from './components/ProductTable/ProductTable'
import useDeleteProduct from './hooks/useDeleteProduct'
import useAddProduct from './hooks/useAddProduct'
import useEditProduct from './hooks/useEditProduct'
import useStockMovement from './hooks/useStockMovement'
import ProductFilters from './components/ProductFilters/ProductFilters'
import AddStockModal from './components/AddStockModal/AddStockModal'
import RemoveStockModal from './components/RemoveStockModal/RemoveStockModal'

export default function ProductCrudPage() {

  const addProduct = useAddProduct()
  const deleteProduct = useDeleteProduct()
  const editProduct = useEditProduct()
  const stockMovement = useStockMovement()


 return (
    <div className={styles.productCrudPage}>

      <PageHeader
        title='Produto'
        subtitle='Gerencie os produtos do sistema'
        extra={<Button type="primary" onClick={addProduct.open} data-tour="adicionar_produto">Adicionar produto</Button>}
      />

      <ProductFilters />

      <ProductTable
        editProduct={editProduct.open}
        deleteProduct={deleteProduct.confirm}
        toggleProductStatus={editProduct.openInactivateConfirm}
        openAddStock={stockMovement.openAddStock}
        openRemoveStock={stockMovement.openRemoveStock}
      />

      <AddProductDrawer
        open={addProduct.show}
        onClose={addProduct.close}
      />

      <UpdateProductDrawer
        open={editProduct.show}
        onClose={editProduct.close}
        product={editProduct.product!}
      />

      <DeleteConfirmationModal
        show={deleteProduct.showConfirm}
        title='Deletar produto?'
        message='Deseja mesmo deletar o produto?'
        onConfirmClick={deleteProduct.deleteProduct}
        onCancelClick={deleteProduct.cancel}
      />

      <DeleteConfirmationModal
        show={editProduct.showInactivateConfirm}
        title='Inativar produto?'
        message='Deseja mesmo inativar o produto?'
        onConfirmClick={editProduct.inactivateProduct}
        onCancelClick={editProduct.closeInactivateConfirm}
      />

      <AddStockModal
        open={stockMovement.showAddStock}
        onClose={stockMovement.closeAddStock}
        product={stockMovement.selectedProduct}
      />

      <RemoveStockModal
        open={stockMovement.showRemoveStock}
        onClose={stockMovement.closeRemoveStock}
        product={stockMovement.selectedProduct}
      />

    </div>
  )
}
