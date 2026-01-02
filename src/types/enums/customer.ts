import { CustomerType } from "@dibimo/core-lib";

export const CustomerTypeView = {
  [CustomerType.NATURAL_PERSON]: {
    label: 'Físico',
    value: CustomerType.NATURAL_PERSON
  },
  [CustomerType.LEGAL_PERSON]: {
    label: 'Jurídico',
    value: CustomerType.LEGAL_PERSON
  }
}

export const CustomerTypeOptions = Object.keys(CustomerTypeView).map((key) => {
  const safeKey = key as keyof typeof CustomerTypeView
  return {
    label: CustomerTypeView[safeKey].label,
    value: CustomerTypeView[safeKey].value
  }
})

