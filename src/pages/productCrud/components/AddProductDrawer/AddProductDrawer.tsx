import { Button, Drawer, Form, Space } from "antd";
import ProductForm from "../ProductForm/ProductForm";
import application from "../../../../infra/applicationInstance";
import type ProductFormFields from "../../types/ProductFormFields";
import { useProductCrudStore } from "../../ProductCrudStore";
import { eitherToBoolean } from "../../../../tools/either";
import useNotification from "../../../../hooks/notification/notification";

interface AddProductDrawerProps {
  open: boolean,
  onClose: () => void
}

export default function AddProductDrawer({ open, onClose }: AddProductDrawerProps) {
  const { loadProducts } = useProductCrudStore()
  const { notify } = useNotification()


  const [formAdd] = Form.useForm<ProductFormFields>()
  const addProduct = async (productFormData: ProductFormFields) => {
    const response = await application.AddProduct.execute({
      name: productFormData.name!,
      description: productFormData.description!,
      code: productFormData.code!,
      price: productFormData.price!,
      quantity: productFormData.quantity!,
    })

    notify(operationResultToNotification(response))

    if(eitherToBoolean(response)) {
      loadProducts()
      onClose()
      formAdd.resetFields()
    }
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
      title="Adicionar novo Produto"
      open={open}
      onClose={onClose}
      extra={extraActions}
    >
      <ProductForm
        form={formAdd}
        onFinish={addProduct}
        isEdit={false}
      />
    </Drawer>
  )
}
