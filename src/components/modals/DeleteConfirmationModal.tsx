import { Modal } from "antd";

interface DeleteConfirmationModalProps {
  title: string,
  message?: string,
  onConfirmClick: () => void,
  onCancelClick: () => void,
  show: boolean,
}

 export function DeleteConfirmationModal({ show, title, message, onCancelClick, onConfirmClick }: DeleteConfirmationModalProps) {
  const modalMessage = message || 'Deseja mesmo deletar esse item? Essa ação não pode ser desfeita'

   return (
    <Modal
      open={show}
      title={title}
      onOk={onConfirmClick}
      onCancel={onCancelClick}
    >
      <p>
        {modalMessage}
      </p>

    </Modal>
   )
 }
