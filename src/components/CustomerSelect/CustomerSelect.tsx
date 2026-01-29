import { Select, type SelectProps } from "antd";
import { useCallback } from "react";
import type { Customer } from "@dibimo/core-lib";
import { useCustomerCrudStore } from "@/pages/customerCrud/CustomerCrudStore";

interface CustomerSelectProps extends Omit<SelectProps, 'options'> {
  onCustomerChange?: (customer: Customer | undefined) => void;
}

export default function CustomerSelect({ onCustomerChange, ...props }: CustomerSelectProps) {
  const { customers, loadCustomers, setOnlyActives } = useCustomerCrudStore();

  useEffect(() => {
    setOnlyActives(true);
  }, [setOnlyActives]);

  const options = customers
    .filter(customer => customer.active)
    .map(customer => ({
      value: customer.id!,
      label: customer.name,
      customer: customer
    }));

  const handleChange = useCallback((value: string) => {
    const selectedCustomer = customers.find(c => c.id === value);
    onCustomerChange?.(selectedCustomer);
    props.onChange?.(value, options);
  }, [customers, onCustomerChange, props, options]);

  return (
    <Select
      {...props}
      options={options}
      onChange={handleChange}
      placeholder="Selecione um cliente"
      showSearch
      filterOption={(input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
      }
    />
  );
}
