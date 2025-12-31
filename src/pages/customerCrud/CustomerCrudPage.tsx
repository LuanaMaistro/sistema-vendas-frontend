import { Button, Card, Flex, Form, Select, Table, type TableColumnsType } from 'antd'
import styles from './CustomerCrudPage.module.css'
import Title from 'antd/es/typography/Title'
import Paragraph from 'antd/es/typography/Paragraph'
import application from '../../infra/applicationInstance'
import { useEffect, useState } from 'react'
import { fold, type Customer } from '@dibimo/core-lib'

export default function CustomerCrudPage() {
  //TODO: converter para um Enum depois
  const customerTypes = [
    {
      value: 0,
      label: "Físico"
    },
    {
      value: 1,
      label: "Jurídico"
    }
  ]

  const [clientes, setClientes] = useState<Array<Customer>>([])

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
    }
  ]

  return (
    <div className={styles.customerCrudPage}>
      <header className={styles.crudPageHeader}>
        <Flex vertical>
          <Title level={2}>Clientes</Title>
          <Paragraph>Gerencie os clientes do sistema</Paragraph>
        </Flex>

        <div>
          <Button variant="solid" color="primary">+ Novo Cliente</Button>
        </div>
      </header>

      <Card>
        <Form>
          <Form.Item label="Tipo de cliente">
            <Select options={customerTypes}/>
          </Form.Item>
        </Form>
      </Card>

      <div className="customers">
        <Table<Customer>
          columns={columns}
          dataSource={clientes}
        />
      </div>
    </div>
  )
}
