import { Tour } from 'antd'
import { useTour } from './useTour'


export default function TourProvider() {

  const {
    curretSteps,
    open,
    currentStep,
    handleClose,
    handleChangeStep,
    handleCloseTour
  } = useTour()

  return (
    <Tour
      open={open}
      current={currentStep}
      steps={curretSteps}
      onClose={handleClose}
      onChange={handleChangeStep}
      onFinish={handleCloseTour}
      type="primary"
    />
  )
}
