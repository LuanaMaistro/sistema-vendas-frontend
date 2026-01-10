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
import { useCustomerCrudStore } from './CustomerCrudStore'
import UpdateCustomerDrawer from './components/UpdateCustomerDrawer/UpdateCustomerDrawer'
import { DeleteConfirmationModal } from '../../components/modals/DeleteConfirmationModal'
import application from '../../infra/applicationInstance'
import useNotification from '../../hooks/notification/notification'
import CustomerTable from './components/CustomerTable/CustomerTable'

export default function CustomerCrudPage() {

  const { loadCustomers } = useCustomerCrudStore()

  const [addCustomerOpen, setAddCustomerOpen] = useState(false)
  const showAddCustomer = () => setAddCustomerOpen(true)
  const closeAddCustomer = () => setAddCustomerOpen(false)

  useEffect(() => {
    loadCustomers()
  }, [])

  const [updateCustomerOpen, setUpdateCustomerOpen] = useState(false)
  const [customerToEdit, setCustomerToEdit] = useState<Customer>()
  const showUpdateCustomer = () => setUpdateCustomerOpen(true)
  const closeUpdateCustomer = () => setUpdateCustomerOpen(false)

  const editCustomer = (customer: Customer) => {
    setCustomerToEdit(customer)
    showUpdateCustomer()
  }

  const [showDeleteCustomerModal, setShowDeleteCustomerModal] = useState(false)
  const [customerToDelete, setCustomerToDelete] = useState<Customer>()

  const confirmCustomerDelete = (customer: Customer) => {
    setCustomerToDelete(customer)
    setShowDeleteCustomerModal(true)
  }

  const [notify, contextHolder] = useNotification()

  const deleteCustomer = async () => {
    const response = await application.RemoveCustomer.execute({
      id: customerToDelete!.id!
    })

    notify(operationResultToNotification(response))

    setShowDeleteCustomerModal(false)
    loadCustomers()

  }

  const cancelCustomerDelete = () => {
    setShowDeleteCustomerModal(false)
  }

 return (
    <div className={styles.customerCrudPage}>
      {contextHolder}
      <header className={styles.crudPageHeader}>
        <Flex vertical>
          <Title level={2}>Clientes</Title>
          <Paragraph>Gerencie os clientes do sistema</Paragraph>
        </Flex>

        <div>
          <Button
            variant="solid"
            color="primary"
            onClick={() => showAddCustomer()}
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
        deleteCustomer={confirmCustomerDelete}
      />

      <AddCustomerDrawer
        open={addCustomerOpen}
        onClose={closeAddCustomer}
      />

      <UpdateCustomerDrawer
        open={updateCustomerOpen}
        onClose={closeUpdateCustomer}
        customer={customerToEdit!}
      />

      <DeleteConfirmationModal
        show={showDeleteCustomerModal}
        title='Deletar cliente?'
        message='Deseja mesmo deletar o cliente?'
        onConfirmClick={deleteCustomer}
        onCancelClick={cancelCustomerDelete}
      />

    </div>
  )
}
