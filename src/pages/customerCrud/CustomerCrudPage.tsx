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
import { CustomerType, type Customer } from '@dibimo/core-lib'
import { CustomerTypeOptions } from '../../types/enums/customer'
import AddCustomerDrawer from './components/AddCustomerDrawer/AddCustomerDrawer'
import { useCustomerCrudStore } from './CustomerCrudStore'
import UpdateCustomerDrawer from './components/UpdateCustomerDrawer/UpdateCustomerDrawer'
import type CustomerFormFields from './types/CustomerFormFields'

export default function CustomerCrudPage() {

  const { customers, loadCustomers } = useCustomerCrudStore()

  const [addCustomerOpen, setAddCustomerOpen] = useState(false)
  const showAddCustomer = () => setAddCustomerOpen(true)
  const closeAddCustomer = () => setAddCustomerOpen(false)

  const [updateCustomerOpen, setUpdateCustomerOpen] = useState(false)
  const [customerToEdit, setCustomerToEdit] = useState<Customer>()
  const showUpdateCustomer = () => setUpdateCustomerOpen(true)
  const closeUpdateCustomer = () => setUpdateCustomerOpen(false)



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
          <a onClick={() => editCustomer(customer)}>Deletar</a>
        </Space>
      )
    },
  ]

  const [editForm] = Form.useForm<CustomerFormFields>()
  const editCustomer = (customer: Customer) => {
    editForm.setFieldsValue({
      name: customer.name,
      phone: customer.CustomerContact?.phone,
      email: customer.CustomerContact?.email,
      cpf: customer.Cpf?.Value,
      cpnj: customer.Cnpj?.Value,
      id: customer.id,
      corporativeName: customer.name,
      customerType: getCustomerType(customer),
      surname: customer.name,
    })
    showUpdateCustomer()
  }

  const getCustomerType = (customer: Customer): CustomerType => {
    if (customer.Cnpj) return CustomerType.LEGAL_PERSON
    return CustomerType.NATURAL_PERSON
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
        customerForm={editForm}
        customer={customerToEdit!}
      />
    </div>
  )
}
