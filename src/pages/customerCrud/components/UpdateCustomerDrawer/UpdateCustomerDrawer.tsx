import { Button, Drawer, Form, Space } from "antd";
import CustomerForm from "../CustomerForm/CustomerForm";
import { CustomerType, type Customer } from "@dibimo/core-lib";
import application from "../../../../infra/applicationInstance";
import type CustomerFormFields from "../../types/CustomerFormFields";
import { useCustomerCrudStore } from "../../CustomerCrudStore";
import { convertCustomerToFormFields } from "@/infra/servicesImp/mappers/customerMappers";
import useNotification from "@/hooks/notification/notification";

interface UpdateCustomerDrawerProps {
  open: boolean,
  onClose: () => void,
  customer: Customer | undefined
}

export default function UpdateCustomerDrawer({ open, onClose, customer }: UpdateCustomerDrawerProps) {

  const { loadCustomers } = useCustomerCrudStore()
  const { notify } = useNotification()

  const [editForm] = Form.useForm<CustomerFormFields>()

  useEffect(() => {
    if (customer) {
      editForm.setFieldsValue(convertCustomerToFormFields(customer))
    }
  }, [customer])

  const getCustomerType = (): CustomerType => {
    if (!customer) return CustomerType.NATURAL_PERSON
    return customer.Cnpj ? CustomerType.LEGAL_PERSON : CustomerType.NATURAL_PERSON
  }

  const updateCustomer = async (formData: CustomerFormFields) => {
    if (!customer) return


    const result = await application.UpdateCustomer.execute({
      id: customer.id!,
      name: formData.name,
      address: {
        street: formData.street!,
        number: formData.number!,
        complement: formData.complement,
        neighborhood: formData.neighborhood!,
        city: formData.city!,
        state: formData.state!,
        zipCode: formData.zipCode!
      }
    })

    notify(operationResultToNotification(result))
    const success = eitherToBoolean(result)

    if (success) {
      loadCustomers()
      editForm.resetFields()
      onClose()
    }

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
      size={720}
    >

      <CustomerForm
        form={editForm}
        customerType={getCustomerType()}
        onFinish={updateCustomer}
        isEditing={true}
      />
    </Drawer>
  )
}
