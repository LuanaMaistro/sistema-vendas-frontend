import type { Customer } from "@luanamaistro/core-lib"
import { Space, Table, Tag, type TableColumnsType } from "antd"
import styles from './CustomerTable.module.css'
import { useCustomerCrudStore } from "../../CustomerCrudStore"
import useTableScrollY from "@/hooks/useTableScrollY"
import { CheckCircleOutlined, EditOutlined, StarOutlined, StopOutlined } from "@ant-design/icons"
import ActionButton from "@/components/table/ActionButton/ActionButton"

interface CustomerTableProps {
  editCustomer: (c: Customer) => void,
  deleteCustomer: (c: Customer) => void,
  viewRecommendations: (c: Customer) => void,
}

export default function CustomerTable({ editCustomer, deleteCustomer, viewRecommendations }: CustomerTableProps) {

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
      render: (_, record) => {
        const statusText = record.active ? 'Sim' : 'Não'
        const styles = record.active ? 'success' : 'red'
        return (
          <Tag color={styles}>
            {statusText}
          </Tag>
        )
      }
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
       width: 160,
       render: (_, customer) => (
         <Space>
           <ActionButton
             onClick={() => editCustomer(customer)}
             icon={<EditOutlined />}
             tooltip="Editar"
             color="blue"
           />
           <ActionButton
             onClick={() => deleteCustomer(customer)}
             icon={customer.active ? <StopOutlined /> : <CheckCircleOutlined />}
             tooltip={customer.active ? "Inativar" : "Ativar"}
             color={customer.active ? "red" : "green"}
           />
           <ActionButton
             onClick={() => viewRecommendations(customer)}
             icon={<StarOutlined />}
             tooltip="Recomendações"
             color="yellow"
           />
         </Space>
       )
     },
  ]

  const { containerRef, scrollY } = useTableScrollY(56);


  return (
    <div
      className={styles.customersTable}
      ref={containerRef}
    >
       <Table<Customer>
         columns={columns}
         dataSource={customers}
         scroll={{ x: 1000, y: scrollY }}
       />
    </div>


  )
}
