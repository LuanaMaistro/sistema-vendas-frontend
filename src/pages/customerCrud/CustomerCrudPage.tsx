import { Button, Card, Col, Drawer, Flex, Form, Input, Radio, Row, Select, Table, type RadioChangeEvent, type TableColumnsType } from 'antd'
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

  const [addType, setAddType] = useState(0)

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
            <Select options={customerTypes}/>
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
          options={customerTypes}
          optionType='button'
          buttonStyle='solid'
          value={addType}
          onChange={changeAddCustomerType}
        />

        <div>
          <Form
            layout='vertical'
          >
            <Row gutter={16}>

              <Col span={12}>
                <Form.Item label="Razão social">
                  <Input />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item label="CNPJ">
                  <Input />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item label="E-mail">
                  <Input />
                </Form.Item>
              </Col>

            </Row>
          </Form>
        </div>
      </Drawer>
    </div>
  )
}
