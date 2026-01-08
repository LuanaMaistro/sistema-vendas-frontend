import { Button, Drawer, Form, Space } from "antd";
import CustomerForm from "../CustomerForm/CustomerForm";
import { CustomerType, fold, type Customer } from "@dibimo/core-lib";
import application from "../../../../infra/applicationInstance";
import type CustomerFormFields from "../../types/CustomerFormFields";
import { useCustomerCrudStore } from "../../CustomerCrudStore";
import { eitherToBoolean } from "../../../../tools/either";

interface UpdateCustomerDrawerProps {
  open: boolean,
  onClose: () => void,
  customer: Customer
}

export default function UpdateCustomerDrawer({ open, onClose, customer }: UpdateCustomerDrawerProps) {

  const { loadCustomers } = useCustomerCrudStore()

  const [editForm] = Form.useForm<CustomerFormFields>()

  const customerToForm = () => {
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
  }

  const getCustomerType = (customer: Customer): CustomerType => {
    if (customer.Cnpj) return CustomerType.LEGAL_PERSON
    return CustomerType.NATURAL_PERSON
  }


  const updateCustomer = async (customerFormData: CustomerFormFields) => {
    const response = await application.UpdateCustomer.execute({
      id: customerFormData.id!,
      cnpj: customerFormData.cpnj,
      cpf: customerFormData.cpf,
      email: customerFormData.email,
      phone: customerFormData.phone,
      name: customerFormData.name,

    })

    const message = fold(response, (erro: Error) => erro.message, () => 'deu tudo certo')
    const success = eitherToBoolean(response)

    if(success) {
      loadCustomers()
      onClose()
    }
  }

  const mountCustomerName = (customerFormData: CustomerFormFields): string => {
    if(customerFormData.cpf) return `${customerFormData.name} ${customerFormData.surname}`
    return customerFormData.corporativeName || 'Error'
  }


  const extraActions = (
    <Space>
      <Button onClick={() => editForm.submit()}>
        Atualizar
      </Button>
    </Space>
  )
  return (
    <Drawer
      title="Atualizar Cliente"
      open={open}
      onClose={onClose}
      extra={extraActions}
    >

      <CustomerForm
        form={editForm}
        customerType={getCustomerType(customer)}
        onFinish={updateCustomer}
      />
    </Drawer>
  )
}
