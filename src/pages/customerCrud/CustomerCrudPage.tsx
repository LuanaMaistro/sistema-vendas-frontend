import { Button } from 'antd'
import styles from './CustomerCrudPage.module.css'
import PageHeader from '../../components/headers/PageHeader/PageHeader'
import AddCustomerDrawer from './components/AddCustomerDrawer/AddCustomerDrawer'
import UpdateCustomerDrawer from './components/UpdateCustomerDrawer/UpdateCustomerDrawer'
import RecommendationsDrawer from './components/RecommendationsDrawer/RecommendationsDrawer'
import { DeleteConfirmationModal } from '../../components/modals/DeleteConfirmationModal'
import CustomerTable from './components/CustomerTable/CustomerTable'
import useDeleteCustomer from './hooks/useDeleteCustomer'
import useAddCustomer from './hooks/useAddCustomer'
import useEditCustomer from './hooks/useEditCustomer'
import useCustomerRecommendations from './hooks/useCustomerRecommendations'
import CustomerFilters from './components/CustomerFilters/CustomerFilters'

export default function CustomerCrudPage() {

  const addCustomer = useAddCustomer()
  const deleteCustomer = useDeleteCustomer()
  const editCustomer = useEditCustomer()
  const recommendations = useCustomerRecommendations()


 return (
    <div className={styles.customerCrudPage}>

      <PageHeader
        title='Cliente'
        subtitle='Gerencie os clientes do sistema'
        extra={<Button type="primary" onClick={addCustomer.open}>Adicionar cliente</Button>}
      />

      <CustomerFilters />

      <CustomerTable
        editCustomer={editCustomer.open}
        deleteCustomer={deleteCustomer.confirm}
        viewRecommendations={recommendations.open}
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

      <RecommendationsDrawer
        open={recommendations.show}
        onClose={recommendations.close}
        customer={recommendations.customer!}
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
