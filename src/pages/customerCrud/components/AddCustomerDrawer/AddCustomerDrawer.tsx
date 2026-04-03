import { Button, Drawer, Form, Radio, Space, type RadioChangeEvent } from "antd";
import CustomerForm from "../CustomerForm/CustomerForm";
import { CustomerTypeOptions } from "../../../../types/enums/customer";
import { CustomerType } from "@luanamaistro/core-lib";
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
  const { loadCustomers } = useCustomerCrudStore()

  const [addCustomerType, setAddType] = useState(CustomerType.NATURAL_PERSON)
  const changeAddCustomerType = (e: RadioChangeEvent) => setAddType(e.target.value!)

  const [formAdd] = Form.useForm<CustomerFormFields>()
  const addCustomer = async (customerFormData: CustomerFormFields) => {
    const response = await application.AddCustomer.execute({
      name: customerFormData.name!,
      email: customerFormData.email,
      phone: customerFormData.phone,
      cnpj: customerFormData.cnpj,
      cpf: customerFormData.cpf,
      address: {
        street: customerFormData.street || '',
        number: customerFormData.number || '',
        complement: customerFormData.complement || '',
        neighborhood: customerFormData.neighborhood || '',
        city: customerFormData.city || '',
        state: customerFormData.state || '',
        zipCode: customerFormData.zipCode || '',
      }
    })

    const success = eitherToBoolean(response)

    if(success) {
      loadCustomers()
      onClose()
      clearAddForm()
    }
  }

  const clearAddForm = () => {
    formAdd.resetFields()
    setAddType(CustomerType.NATURAL_PERSON)
  }

  const _onClose = () => {
    clearAddForm()
    onClose()
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
      onClose={_onClose}
      extra={extraActions}
      size={720}
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
