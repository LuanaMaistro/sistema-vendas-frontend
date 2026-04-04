import type { Sale } from "@luanamaistro/core-lib"
import application from "../../../infra/applicationInstance"
import useNotification from "../../../hooks/notification/notification"
import { useSaleCrudStore } from "../SaleCrudStore"

const useCancelSale = () => {
  const { loadSales } = useSaleCrudStore()
  const { notify } = useNotification()

  const [showConfirm, setShowConfirm] = useState(false)
  const [sale, setSaleToCancel] = useState<Sale>()

  const confirm = (sale: Sale) => {
    setSaleToCancel(sale)
    setShowConfirm(true)
  }

  const cancel = () => {
    setShowConfirm(false)
  }

  const cancelSale = async () => {
    const result = await application.CancelSale.execute({
      saleId: sale!.id!
    })

    notify(operationResultToNotification(result))

    setShowConfirm(false)
    loadSales()
  }

  return {
    cancelSale,
    cancel,
    confirm,
    showConfirm,
    sale
  }
}

export default useCancelSale
