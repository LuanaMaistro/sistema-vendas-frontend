import type { Customer } from "@dibimo/core-lib"
import { Space, Table, type TableColumnsType } from "antd"
import styles from './CustomerTable.module.css'
import { useCustomerCrudStore } from "../../CustomerCrudStore"

interface CustomerTableProps {
  editCustomer: (c: Customer) => void,
  deleteCustomer: (c: Customer) => void,
}

export default function CustomerTable({ editCustomer, deleteCustomer }: CustomerTableProps) {

  const { customers, loadCustomers } = useCustomerCrudStore()

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
          <a onClick={() => deleteCustomer(customer)}>Deletar</a>
        </Space>
      )
    },
  ]


  return (
    <div
      className={styles.customersTable}
    >
      <Table<Customer>
        columns={columns}
        dataSource={customers}
      />
    </div>


  )
}
