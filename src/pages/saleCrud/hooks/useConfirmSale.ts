import { PaymentMethod, type Sale } from "@dibimo/core-lib"
import application from "../../../infra/applicationInstance"
import useNotification from "../../../hooks/notification/notification"
import { useSaleCrudStore } from "../SaleCrudStore"

const useConfirmSale = () => {
  const { loadSales } = useSaleCrudStore()
  const { notify } = useNotification()

  const [showModal, setShowModal] = useState(false)
  const [sale, setSale] = useState<Sale>()
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(PaymentMethod.PIX)

  const open = (sale: Sale) => {
    setSale(sale)
    setShowModal(true)
  }

  const close = () => {
    setShowModal(false)
    setPaymentMethod(PaymentMethod.PIX)
  }

  const confirmSale = async () => {
    const result = await application.ConfirmSale.execute({
      saleId: sale!.id!,
      paymentMethod
    })

    notify(operationResultToNotification(result))

    close()
    loadSales()
  }

  return {
    showModal,
    open,
    close,
    confirmSale,
    sale,
    paymentMethod,
    setPaymentMethod
  }
}

export default useConfirmSale
