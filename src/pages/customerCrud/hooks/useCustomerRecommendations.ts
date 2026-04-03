import type { Customer } from '@luanamaistro/core-lib'

const useCustomerRecommendations = () => {
  const [show, setShow] = useState(false)
  const [customer, setCustomer] = useState<Customer>()

  const open = (customer: Customer) => {
    setCustomer(customer)
    setShow(true)
  }

  const close = () => setShow(false)

  return { show, open, close, customer }
}

export default useCustomerRecommendations
