import { Button,
  Card,
  Flex,
  Form,
  Select,
  Space,
  Table,
  type TableColumnsType
} from 'antd'
import styles from './CustomerCrudPage.module.css'
import Title from 'antd/es/typography/Title'
import Paragraph from 'antd/es/typography/Paragraph'
import { useEffect, useState } from 'react'
import { fold, type Customer } from '@dibimo/core-lib'
import { CustomerTypeOptions } from '../../types/enums/customer'
import AddCustomerDrawer from './components/AddCustomerDrawer/AddCustomerDrawer'
import { useCustomerCrudStore } from './CustomerCrudStore'
import UpdateCustomerDrawer from './components/UpdateCustomerDrawer/UpdateCustomerDrawer'
import { DeleteConfirmationModal } from '../../components/modals/DeleteConfirmationModal'
import application from '../../infra/applicationInstance'
import { eitherToBoolean } from '../../tools/either'

export default function CustomerCrudPage() {

  const { customers, loadCustomers } = useCustomerCrudStore()

  const [addCustomerOpen, setAddCustomerOpen] = useState(false)
  const showAddCustomer = () => setAddCustomerOpen(true)
  const closeAddCustomer = () => setAddCustomerOpen(false)

  useEffect(() => {
    loadCustomers()
  }, [])

  const columns: TableColumnsType<Customer> = [
    {
      title: 'Nome',
      dataIndex: 'name'
    },
    {
      title: 'E-mail',
      dataIndex: ['CustomerContact', 'email'],
    },
    {
      title: 'Cnpj',
      dataIndex: ['Cnpj', 'Value']
    },
    {
      title: 'Ações',
      key: 'actions',
      render: (_, customer) =>  (
        <Space>
          <a onClick={() => editCustomer(customer)}>Editar</a>
          <a onClick={() => confirmCustomerDelete(customer)}>Deletar</a>
        </Space>
      )
    },
  ]

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

  const deleteCustomer = async () => {
    const response = await application.RemoveCustomer.execute({
      id: customerToDelete!.id!
    })

    const success = eitherToBoolean(response)
    const message = fold(response, (err: Error) => err.message, () => '')

    setShowDeleteCustomerModal(false)
    loadCustomers()

    if(success) {
      console.log('deu tudo certinho')
    }
    else
      console.log(message)
  }

  const cancelCustomerDelete = () => {
    setShowDeleteCustomerModal(false)
  }

 return (
    <div className={styles.customerCrudPage}>
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

      <div
        className={styles.customersTable}
      >
        <Table<Customer>
          scroll={{ y: 55 * 7 }}
          columns={columns}
          dataSource={customers}
        />
      </div>


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
