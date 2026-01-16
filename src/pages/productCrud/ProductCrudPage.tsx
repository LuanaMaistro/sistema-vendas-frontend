import styles from './ProductCrudPage.module.css'
import AddProductDrawer from './components/AddProductDrawer/AddProductDrawer'
import UpdateProductDrawer from './components/UpdateProductDrawer/UpdateProductDrawer'
import { DeleteConfirmationModal } from '../../components/modals/DeleteConfirmationModal'
import ProductTable from './components/ProductTable/ProductTable'
import useDeleteProduct from './hooks/useDeleteProduct'
import useAddProduct from './hooks/useAddProduct'
import useEditProduct from './hooks/useEditProduct'
import ProductFilters from './components/ProductFilters/ProductFilters'
import CrudHeader from '../../components/headers/CrudHeader/CrudHeader'

export default function ProductCrudPage() {

  const addProduct = useAddProduct()
  const deleteProduct = useDeleteProduct()
  const editProduct = useEditProduct()


 return (
    <div className={styles.productCrudPage}>

      <CrudHeader
        addButtonAction={addProduct.open}
        addButtonText='Adicionar produto'
        description='Gerencie os produtos do sistema'
        title='Produto'
      />

      <ProductFilters />

      <ProductTable
        editProduct={editProduct.open}
        deleteProduct={deleteProduct.confirm}
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

      {deleteProduct.contextHolder}

    </div>
  )
}
