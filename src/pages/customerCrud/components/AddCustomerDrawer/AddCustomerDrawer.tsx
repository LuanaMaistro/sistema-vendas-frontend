import { Drawer, Radio, type RadioChangeEvent } from "antd";
import CustomerForm from "../CustomerForm/CustomerForm";
import { CustomerTypeOptions } from "../../../../types/enums/customer";
import { CustomerType } from "@dibimo/core-lib";
import { useState } from "react";

interface AddCustomerDrawerProps {
  open: boolean,
  onClose: () => void
}

export default function AddCustomerDrawer({ open, onClose }: AddCustomerDrawerProps) {
  const [addCustomerType, setAddType] = useState(CustomerType.NATURAL_PERSON)
  const changeAddCustomerType = (e: RadioChangeEvent) => setAddType(e.target.value!)

  return (
    <Drawer
      title="Adicionar novo Cliente"
      open={open}
      onClose={onClose}
    >
      <Radio.Group
        options={CustomerTypeOptions}
        optionType='button'
        buttonStyle='solid'
        value={addCustomerType}
        onChange={changeAddCustomerType}
      />

      <CustomerForm customerType={addCustomerType} />
    </Drawer>
  )
}
