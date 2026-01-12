import { Button,
  Card,
  Flex,
  Form,
  Select
} from 'antd'
import styles from './CustomerCrudPage.module.css'
import Title from 'antd/es/typography/Title'
import Paragraph from 'antd/es/typography/Paragraph'
import { CustomerTypeOptions } from '../../types/enums/customer'
import AddCustomerDrawer from './components/AddCustomerDrawer/AddCustomerDrawer'
import UpdateCustomerDrawer from './components/UpdateCustomerDrawer/UpdateCustomerDrawer'
import { DeleteConfirmationModal } from '../../components/modals/DeleteConfirmationModal'
import CustomerTable from './components/CustomerTable/CustomerTable'
import useDeleteCustomer from './hooks/useDeleteCustomer'
import useAddCustomer from './hooks/useAddCustomer'
import useEditCustomer from './hooks/useEditCustomer'
import CustomerFilters from './components/CustomerFilters/CustomerFilters'

export default function CustomerCrudPage() {

  const addCustomer = useAddCustomer()
  const deleteCustomer = useDeleteCustomer()
  const editCustomer = useEditCustomer()


 return (
    <div className={styles.customerCrudPage}>

      {deleteCustomer.contextHolder}

      <header className={styles.crudPageHeader}>
        <Flex vertical>
          <Title level={2}>Clientes</Title>
          <Paragraph>Gerencie os clientes do sistema</Paragraph>
        </Flex>

        <div>
          <Button
            variant="solid"
            color="primary"
            onClick={addCustomer.open}
          >
            + Novo Cliente
          </Button>
        </div>
      </header>

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
