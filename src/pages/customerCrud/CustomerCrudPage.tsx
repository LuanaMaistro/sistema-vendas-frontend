import styles from './CustomerCrudPage.module.css'
import AddCustomerDrawer from './components/AddCustomerDrawer/AddCustomerDrawer'
import UpdateCustomerDrawer from './components/UpdateCustomerDrawer/UpdateCustomerDrawer'
import { DeleteConfirmationModal } from '../../components/modals/DeleteConfirmationModal'
import CustomerTable from './components/CustomerTable/CustomerTable'
import useDeleteCustomer from './hooks/useDeleteCustomer'
import useAddCustomer from './hooks/useAddCustomer'
import useEditCustomer from './hooks/useEditCustomer'
import CustomerFilters from './components/CustomerFilters/CustomerFilters'
import CrudHeader from '../../components/headers/CrudHeader/CrudHeader'

export default function CustomerCrudPage() {

  const addCustomer = useAddCustomer()
  const deleteCustomer = useDeleteCustomer()
  const editCustomer = useEditCustomer()


 return (
    <div className={styles.customerCrudPage}>

      {deleteCustomer.contextHolder}

      <CrudHeader
        addButtonAction={addCustomer.open}
        addButtonText='Adicionar cliente'
        description='Gerencie os clientes do sistema'
        title='Cliente'
      />

      <CustomerFilters />

      <CustomerTable
        editCustomer={editCustomer.open}
        deleteCustomer={deleteCustomer.confirm}
      />

      <AddCustomerDrawer
        open={addCustomer.show}
        onClose={addCustomer.close}
      />

      <UpdateCustomerDrawer
        open={editCustomer.show}
        onClose={editCustomer.close}
        customer={editCustomer.customer!}
      />

      <DeleteConfirmationModal
        show={deleteCustomer.showConfirm}
        title='Deletar cliente?'
        message='Deseja mesmo deletar o cliente?'
        onConfirmClick={deleteCustomer.deleteCustoner}
        onCancelClick={deleteCustomer.cancel}
      />

    </div>
  )
}
