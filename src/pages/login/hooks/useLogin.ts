import { useNavigate } from "react-router-dom";
import createApiClients from "@/infra/api/apiClientFactory";
import useNotification from "@/hooks/notification/notification";
import { useAuth } from "@/hooks/useAuth";

const [authApi] = createApiClients('AuthApi')

type LoginFormFields = {
  email: string;
  senha: string;
}

export default function useLogin() {
  const [loading, setLoading] = useState(false)
  const { notify } = useNotification()
  const navigate = useNavigate()
  const { setToken } = useAuth()

  const login = async ({ email, senha }: LoginFormFields) => {
    setLoading(true)
    try {
      const response = await authApi.apiAuthLoginPost({ email, senha })
      const token = (response as any).data?.token ?? (response as any).data
      setToken(token)
      navigate('/customers')
    } catch {
      notify({
        type: 'error',
        title: 'Falha no login',
        description: 'Email ou senha inválidos. Verifique suas credenciais e tente novamente.',
      })
    } finally {
      setLoading(false)
    }
  }

  return { login, loading }
}
