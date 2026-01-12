import { Button,
  Card,
  Flex,
  Form,
  Select
} from 'antd'
import styles from './CustomerCrudPage.module.css'
import Title from 'antd/es/typography/Title'
import Paragraph from 'antd/es/typography/Paragraph'
import { type Customer } from '@dibimo/core-lib'
import { CustomerTypeOptions } from '../../types/enums/customer'
import AddCustomerDrawer from './components/AddCustomerDrawer/AddCustomerDrawer'
import UpdateCustomerDrawer from './components/UpdateCustomerDrawer/UpdateCustomerDrawer'
import { DeleteConfirmationModal } from '../../components/modals/DeleteConfirmationModal'
import CustomerTable from './components/CustomerTable/CustomerTable'
import useDeleteCustomer from './hooks/useDeleteCustomer'
import useAddCustomer from './hooks/useAddCustomer'
import useEditCustomer from './hooks/useEditCustomer'

export default function CustomerCrudPage() {

  const addCustomer = useAddCustomer()
  const deleteCustomer = useDeleteCustomer()
  const editCustomer1 = useEditCustomer()

  const [updateCustomerOpen, setUpdateCustomerOpen] = useState(false)
  const [customerToEdit, setCustomerToEdit] = useState<Customer>()
  const showUpdateCustomer = () => setUpdateCustomerOpen(true)
  const closeUpdateCustomer = () => setUpdateCustomerOpen(false)

  const editCustomer = (customer: Customer) => {
    setCustomerToEdit(customer)
    showUpdateCustomer()
  }

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

      <Card>
        <Form>
          <Form.Item label="Tipo de cliente">
            <Select options={CustomerTypeOptions}/>
          </Form.Item>
        </Form>
      </Card>

      <CustomerTable
        editCustomer={editCustomer}
        deleteCustomer={deleteCustomer.confirm}
      />

      <AddCustomerDrawer
        open={addCustomer.show}
        onClose={addCustomer.close}
      />

      <UpdateCustomerDrawer
        open={updateCustomerOpen}
        onClose={closeUpdateCustomer}
        customer={customerToEdit!}
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
