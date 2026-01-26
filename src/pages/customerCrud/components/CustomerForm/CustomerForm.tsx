import { CustomerType } from "@dibimo/core-lib";
import { Col, Form, Input, Row, type FormInstance, type FormProps } from "antd";
import type CustomerFormFields from "../../types/CustomerFormFields";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import { fetchAddressByZipCode } from "@/tools/viaCep";
import useNotification from "@/hooks/notification/notification";
import StateSelect from "@/components/StateSelect";

interface CustomerFormProps {
  customerType: CustomerType
  form: FormInstance<CustomerFormFields>
  onFinish: FormProps['onFinish']
  isEditing?: boolean
}

export default function CustomerForm({ customerType, form, onFinish, isEditing = false }: CustomerFormProps) {
  const [loadingCep, setLoadingCep] = useState(false);
  const { notify } = useNotification();

  const handleZipCodeBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const zipCode = e.target.value;

    if (!zipCode || zipCode.replace(/\D/g, '').length !== 8)
      return;


    setLoadingCep(true);

    const result = await fetchAddressByZipCode(zipCode);
    fold(
      result,
      () => {
        notify({
          type: 'error',
          description: 'Erro ao buscar informações do CEP',
          title: 'Não foi possível buscar as informações do CEP'
        })
      },
      (addressInfo) => {
        form.setFieldsValue({
          street: addressInfo.street,
          neighborhood: addressInfo.neighborhood,
          city: addressInfo.city,
          state: addressInfo.state
        });
      }
    );

    setLoadingCep(false);
  };


  const cnpjInput = (
    <Col span={12}>
      <Form.Item name="cnpj" label="CNPJ">
        <Input disabled={isEditing} />
      </Form.Item>
    </Col>
  )

  const cpfInput = (
    <Col span={12}>
      <Form.Item name="cpf" label="CPF">
        <Input disabled={isEditing} />
      </Form.Item>
    </Col>
  )

  const isLegalPerson = customerType == CustomerType.LEGAL_PERSON

  return (

    <div>
      <Form
        form={form}
        layout='vertical'
        onFinish={onFinish}
      >
        <Row gutter={16}>
          <Col span={24}>
            <Title level={5}>Dados báscios</Title>
            <Paragraph>Dados básicos do cliente</Paragraph>
          </Col>

          <Col span={12}>
            <Form.Item name="name" label={isLegalPerson ? 'Razão social' : 'Nome completo'}>
              <Input />
            </Form.Item>
          </Col>
          { isLegalPerson ? cnpjInput : cpfInput }

        </Row>


        <Row gutter={16}>

          <Col span={24}>
            <Title level={5}>Contato</Title>
            <Paragraph>Informações para contato com o cliente</Paragraph>
          </Col>

          <Col span={24}>
            <Form.Item name="email" label="E-mail principal">
              <Input disabled={isEditing} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="phone" label="Telefone">
              <Input disabled={isEditing} />
            </Form.Item>

          </Col>
          <Col span={12}>
            <Form.Item name="mobile" label="Celular">
              <Input disabled={isEditing} />
            </Form.Item>
          </Col>
        </Row>


        <Row gutter={16}>
          <Col span={24}>
            <Title level={5}>Endereço</Title>
            <Paragraph>Endereço principal do cliente</Paragraph>
          </Col>

          <Col span={8}>
            <Form.Item name="zipCode" label="CEP">
              <Input
                onBlur={handleZipCodeBlur}
                disabled={loadingCep}
                placeholder="00000-000"
              />
            </Form.Item>
          </Col>

          <Col span={16}>
            <Form.Item name="street" label="Logradouro">
              <Input disabled={loadingCep} />
            </Form.Item>
          </Col>

          <Col span={4}>
            <Form.Item name="number" label="Número">
              <Input />
            </Form.Item>
          </Col>

          <Col span={20}>
            <Form.Item name="complement" label="Complemento">
              <Input />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item name="state" label="Estado">
              <StateSelect disabled={loadingCep} />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item name="city" label="Cidade">
              <Input disabled={loadingCep} />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item name="neighborhood" label="Bairro">
              <Input disabled={loadingCep} />
            </Form.Item>
          </Col>



        </Row>
      </Form>
    </div>
  )
}
