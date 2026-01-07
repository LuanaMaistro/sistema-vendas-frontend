import { Button, Drawer, Form, Radio, Space, type RadioChangeEvent } from "antd";
import CustomerForm from "../CustomerForm/CustomerForm";
import { CustomerTypeOptions } from "../../../../types/enums/customer";
import { CustomerType, fold } from "@dibimo/core-lib";
import { useState } from "react";
import application from "../../../../infra/applicationInstance";
import type CustomerFormFields from "../../types/CustomerFormFields";
import { useCustomerCrudStore } from "../../CustomerCrudStore";
import { eitherToBoolean } from "../../../../tools/either";

interface AddCustomerDrawerProps {
  open: boolean,
  onClose: () => void
}

export default function AddCustomerDrawer({ open, onClose }: AddCustomerDrawerProps) {
  const [addCustomerType, setAddType] = useState(CustomerType.NATURAL_PERSON)
  const changeAddCustomerType = (e: RadioChangeEvent) => setAddType(e.target.value!)

  const [formAdd] = Form.useForm<CustomerFormFields>()
  const { loadCustomers } = useCustomerCrudStore()
  const addCustomer = async (customerData: CustomerFormFields) => {
    const customerName = mountCustomerName(customerData)
    const response = await application.AddCustomer.execute({
      name: customerName,
      email: customerData.email,
      phone: customerData.phone,
      cnpj: customerData.cpnj,
      cpf: customerData.cpf,
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
      <Button onClick={() => formAdd.submit()}>
        Adicionar
      </Button>
    </Space>
  )
  return (
    <Drawer
      title="Adicionar novo Cliente"
      open={open}
      onClose={onClose}
      extra={extraActions}
    >
      <Radio.Group
        options={CustomerTypeOptions}
        optionType='button'
        buttonStyle='solid'
        value={addCustomerType}
        onChange={changeAddCustomerType}
      />

      <CustomerForm
        form={formAdd}
        customerType={addCustomerType}
        onFinish={addCustomer}
      />
    </Drawer>
  )
}
