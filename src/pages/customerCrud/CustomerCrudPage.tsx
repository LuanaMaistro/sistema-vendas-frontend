import { Button,
  Card,
  Drawer,
  Flex,
  Form,
  Radio,
  Select,
  Table,
  type RadioChangeEvent,
  type TableColumnsType
} from 'antd'
import styles from './CustomerCrudPage.module.css'
import Title from 'antd/es/typography/Title'
import Paragraph from 'antd/es/typography/Paragraph'
import application from '../../infra/applicationInstance'
import { useEffect, useState } from 'react'
import { CustomerType, fold, type Customer } from '@dibimo/core-lib'
import { CustomerTypeOptions } from '../../types/enums/customer'
import CustomerForm from './components/CustomerForm/CustomerForm'

export default function CustomerCrudPage() {

  const [clientes, setClientes] = useState<Array<Customer>>([])

  const [addCustomerOpen, setAddCustomerOpen] = useState(false)

  const showAddCustomer = () => {
    setAddCustomerOpen(true)
  }

  const closeAddCustomer = () => {
    setAddCustomerOpen(false)
  }

  const getCustomers = async () => {
    const response = await application.ListCustomers.execute()
    const customers = fold(response, () => [], (customers: Customer[]) => customers)

    setClientes(customers)
  }

  useEffect(() => {
    getCustomers()
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
    }
  ]

  const [addCustomerType, setAddType] = useState(CustomerType.NATURAL_PERSON)

  const changeAddCustomerType = (e: RadioChangeEvent) => {
    setAddType(e.target.value!)
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

      {/*esse é o card para filtros*/}
      <Card>
        <Form>
          <Form.Item label="Tipo de cliente">
            <Select options={CustomerTypeOptions}/>
          </Form.Item>
        </Form>
      </Card>

      {/*TODO: Existe um margin na páginação da table que faz a página scrollar, depois tem que ver como que faz para resolver corretamente*/}
      <Table<Customer>
        className={styles.customersTable}
        columns={columns}
        dataSource={clientes}
      />

      <Drawer
        title="Adicionar novo Cliente"
        open={addCustomerOpen}
        onClose={closeAddCustomer}
      >
        <Radio.Group
          options={CustomerTypeOptions}
          optionType='button'
          buttonStyle='solid'
          value={addCustomerType}
          onChange={changeAddCustomerType}
        />

        <CustomerForm />
      </Drawer>
    </div>
  )
}
