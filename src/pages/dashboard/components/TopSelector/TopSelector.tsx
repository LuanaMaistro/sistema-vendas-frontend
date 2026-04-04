import { Select } from 'antd'
import type { TopOption } from '../../DashboardFilterStore'

interface TopSelectorProps {
  value: TopOption
  onChange: (value: TopOption) => void
}

const TOP_OPTIONS = [
  { label: 'Top 5', value: 5 },
  { label: 'Top 10', value: 10 },
  { label: 'Top 15', value: 15 },
  { label: 'Top 30', value: 30 },
]

export default function TopSelector({ value, onChange }: TopSelectorProps) {
  return (
    <Select
      value={value}
      options={TOP_OPTIONS}
      onChange={(val: TopOption) => onChange(val)}
      size="small"
      style={{ width: 90 }}
    />
  )
}
