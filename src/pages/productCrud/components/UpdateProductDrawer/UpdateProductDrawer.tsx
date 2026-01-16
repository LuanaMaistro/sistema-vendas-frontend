import { Button, Drawer, Form, Space } from "antd";
import ProductForm from "../ProductForm/ProductForm";
import application from "../../../../infra/applicationInstance";
import type ProductFormFields from "../../types/ProductFormFields";
import { useProductCrudStore } from "../../ProductCrudStore";
import { eitherToBoolean } from "../../../../tools/either";
import { type Product } from "@dibimo/core-lib";

interface UpdateProductDrawerProps {
  open: boolean,
  onClose: () => void,
  product: Product
}

export default function UpdateProductDrawer({ open, onClose, product }: UpdateProductDrawerProps) {
  const { loadProducts } = useProductCrudStore()

  const [formUpdate] = Form.useForm<ProductFormFields>()

  useEffect(() => {
    if (product) {
      formUpdate.setFieldsValue({
        name: product.name,
        description: product.description,
        code: product.code,
        price: product.price.Value,
        quantity: product.quantity.Value,
      })
    }
  }, [product, formUpdate])

  const updateProduct = async (productFormData: ProductFormFields) => {
    const response = await application.UpdateProduct.execute({
      id: product.id!,
      name: productFormData.name!,
      description: productFormData.description!,
      price: productFormData.price!,
      quantity: productFormData.quantity!,
    })

    const success = eitherToBoolean(response)

    if(success) {
      loadProducts()
      onClose()
      formUpdate.resetFields()
    }
  }

  const extraActions = (
    <Space>
      <Button onClick={() => formUpdate.submit()}>
        Salvar
      </Button>
    </Space>
  )

  return (
    <Drawer
      title="Editar Produto"
      open={open}
      onClose={onClose}
      extra={extraActions}
    >
      <ProductForm
        form={formUpdate}
        onFinish={updateProduct}
      />
    </Drawer>
  )
}
