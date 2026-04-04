import { Button } from 'antd'
import styles from './SaleCrudPage.module.css'
import PageHeader from '../../components/headers/PageHeader/PageHeader'
import SaleFilters from './components/SaleFilters'
import SaleList from './components/SaleList'
import AddSaleDrawer from './components/AddSaleDrawer'
import ConfirmSaleModal from './components/ConfirmSaleModal'
import { DeleteConfirmationModal } from '../../components/modals/DeleteConfirmationModal'
import useAddSale from './hooks/useAddSale'
import useCancelSale from './hooks/useCancelSale'
import useConfirmSale from './hooks/useConfirmSale'

export default function SaleCrudPage() {
  const addSale = useAddSale()
  const cancelSale = useCancelSale()
  const confirmSale = useConfirmSale()

  return (
    <div className={styles.saleCrudPage}>
      <PageHeader
        title='Vendas'
        subtitle='Gerencie as vendas do sistema'
        extra={<Button type="primary" onClick={addSale.open}>Nova Venda</Button>}
      />

      <SaleFilters />

      <SaleList
        onConfirmSale={confirmSale.open}
        onCancelSale={cancelSale.confirm}
      />

      <AddSaleDrawer
        open={addSale.show}
        onClose={addSale.close}
      />

      <ConfirmSaleModal
        open={confirmSale.showModal}
        sale={confirmSale.sale}
        paymentMethod={confirmSale.paymentMethod}
        onPaymentMethodChange={confirmSale.setPaymentMethod}
        onConfirm={confirmSale.confirmSale}
        onCancel={confirmSale.close}
      />

      <DeleteConfirmationModal
        show={cancelSale.showConfirm}
        title='Cancelar venda?'
        message='Deseja mesmo cancelar esta venda? Esta ação não pode ser desfeita.'
        onConfirmClick={cancelSale.cancelSale}
        onCancelClick={cancelSale.cancel}
      />
    </div>
  )
}
