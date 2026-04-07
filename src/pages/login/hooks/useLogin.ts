import { useNavigate } from "react-router-dom";
import createApiClients from "@/infra/api/apiClientFactory";
import useNotification from "@/hooks/notification/notification";
import { useAuth } from "@/hooks/useAuth";

const [authApi] = createApiClients('AuthApi')

const SAVED_CREDENTIALS_KEY = 'app-login-credentials'

export type SavedCredentials = {
  email: string;
  senha: string;
}

export type LoginFormFields = {
  email: string;
  senha: string;
  lembrar: boolean;
}

export function loadSavedCredentials(): SavedCredentials | null {
  const raw = localStorage.getItem(SAVED_CREDENTIALS_KEY)
  return raw ? JSON.parse(raw) : null
}

export default function useLogin() {
  const [loading, setLoading] = useState(false)
  const { notify } = useNotification()
  const navigate = useNavigate()
  const { setToken } = useAuth()

  const login = async ({ email, senha, lembrar }: LoginFormFields) => {
    setLoading(true)
    try {
      const response = await authApi.apiAuthLoginPost({ email, senha })
      const token = (response as any).data?.token ?? (response as any).data

      if (lembrar) {
        localStorage.setItem(SAVED_CREDENTIALS_KEY, JSON.stringify({ email, senha }))
      } else {
        localStorage.removeItem(SAVED_CREDENTIALS_KEY)
      }

      setToken(token)
      navigate('/dashboard', { replace: true })
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
