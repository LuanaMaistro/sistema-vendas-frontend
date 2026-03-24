import { Button, Checkbox, Form, Input, Typography } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import styles from "./LoginPage.module.css";
import useLogin, { loadSavedCredentials, type LoginFormFields } from "./hooks/useLogin";

export default function LoginPage() {
  const { login, loading } = useLogin()
  const saved = loadSavedCredentials()

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginCard}>

        <div className={styles.logoArea}>
          <ShoppingCartOutlined style={{ fontSize: 40, color: 'var(--ant-color-primary)' }} />
          <Typography.Title level={3} style={{ margin: 0 }}>
            Sistema de Vendas
          </Typography.Title>
          <Typography.Text type="secondary">
            Faça login para continuar
          </Typography.Text>
        </div>

        <Form<LoginFormFields>
          className={styles.loginForm}
          layout="vertical"
          onFinish={login}
          requiredMark={false}
          initialValues={{
            email: saved?.email ?? '',
            senha: saved?.senha ?? '',
            lembrar: !!saved,
          }}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Informe seu email' },
              { type: 'email', message: 'Informe um email válido' },
            ]}
          >
            <Input placeholder="seu@email.com" size="large" />
          </Form.Item>

          <Form.Item
            label="Senha"
            name="senha"
            rules={[{ required: true, message: 'Informe sua senha' }]}
          >
            <Input.Password placeholder="••••••••" size="large" />
          </Form.Item>

          <Form.Item name="lembrar" valuePropName="checked" style={{ marginBottom: 16 }}>
            <Checkbox>Lembrar-me</Checkbox>
          </Form.Item>

          <Form.Item style={{ marginBottom: 0 }}>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={loading}
              className={styles.submitButton}
            >
              Entrar
            </Button>
          </Form.Item>
        </Form>

      </div>
    </div>
  )
}
