import { Select, type SelectProps } from "antd";
import { useCallback } from "react";
import type { Product } from "@luanamaistro/core-lib";
import { useProductCrudStore } from "@/pages/productCrud/ProductCrudStore";

interface ProductSelectProps extends Omit<SelectProps, 'options'> {
  onProductChange?: (product: Product | undefined) => void;
  onlyActive?: boolean;
}

export default function ProductSelect({ onProductChange, onlyActive = true, ...props }: ProductSelectProps) {
  const { products, setOnlyActives } = useProductCrudStore();

  useEffect(() => {
    setOnlyActives(onlyActive);
  }, [setOnlyActives, onlyActive]);

  const options = products
    .filter(product => !onlyActive || product.active)
    .map(product => ({
      value: product.id!,
      label: `${product.code} - ${product.name}`,
      product: product
    }));

  const handleChange = useCallback((value: string) => {
    const selectedProduct = products.find(p => p.id === value);
    onProductChange?.(selectedProduct);
    props.onChange?.(value, options);
  }, [products, onProductChange, props, options]);

  return (
    <Select
      {...props}
      options={options}
      onChange={handleChange}
      placeholder="Selecione um produto"
      showSearch
      filterOption={(input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
      }
    />
  );
}
