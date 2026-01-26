import { Select, type SelectProps } from "antd";
import { brazilianStates } from "@/data/brazilianStates";

interface StateSelectProps extends Omit<SelectProps, 'options'> {
}

export default function StateSelect(props: StateSelectProps) {
  const options = brazilianStates.map(state => ({
    value: state.uf,
    label: `${state.uf} - ${state.name}`
  }));

  return (
    <Select
      {...props}
      options={options}
      placeholder="Selecione o estado"
      showSearch
    />
  );
}
