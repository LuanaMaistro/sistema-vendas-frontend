import type { Customer } from "@dibimo/core-lib"
import application from "../../../infra/applicationInstance"
import useNotification from "../../../hooks/notification/notification"
import { useCustomerCrudStore } from "../CustomerCrudStore"

const useDeleteCustomer = () => {

  const { loadCustomers } = useCustomerCrudStore()
  const { notify, contextHolder } = useNotification()

  const [showConfirm, setShowConfirm] = useState(false)
  const [customer, setCustomerToDelete] = useState<Customer>()

  const confirm = (customer: Customer) => {
    setCustomerToDelete(customer)
    setShowConfirm(true)
  }

  const cancel = () => {
    setShowConfirm(false)
  }

  const deleteCustoner = async () => {
    const result = await application.RemoveCustomer.execute({
      id: customer!.id!
    })

    notify(operationResultToNotification(result))

    setShowConfirm(false)
    loadCustomers()

  }

  return {
    contextHolder,
    deleteCustoner,
    cancel,
    confirm,
    showConfirm
  }
}

export default useDeleteCustomer

