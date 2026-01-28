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
      title: 'Ativo',
      render: (_, record) => record.active ? 'Sim' : 'Não'
    },
    {
      title: 'Documento',
      render: (_, record) => record.Cpf?.Value || record.Cnpj?.Value || '-'
    },
    {
      title: 'E-mail',
      render: (_, record) => record.email?.Value || '-'
    },
    {
      title: 'Telefone',
      render: (_, record) => record.phone?.Value || '-'
    },
    {
      title: 'Celular',
      render: (_, record) => record.mobile?.Value || '-'
    },
    {
      title: 'Endereço',
      render: (_, record) => record.address?.FullAddress || '-'
    },
    {
      title: 'Ações',
      key: 'actions',
      fixed: 'right',
      width: 150,
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
