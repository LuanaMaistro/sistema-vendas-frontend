import { Button } from "antd"

interface ActionButtonProps {
  onClick: () => void
  icon: React.ReactNode
  tooltip: string
  danger?: boolean
  color?: "blue" | "red" | "yellow" | "green"
}

const colorMap: Record<string, string> = {
  blue: "#1890ff",
  red: "#ff4d4f",
  yellow: "#faad14",
  green: "#52c41a",
}

export default function ActionButton({
  onClick,
  icon,
  tooltip,
  danger = false,
  color,
}: ActionButtonProps) {
  return (
    <Button
      type="text"
      danger={danger}
      icon={icon}
      onClick={onClick}
      title={tooltip}
      style={
        color && colorMap[color]
          ? { color: colorMap[color] }
          : undefined
      }
    />
  )
}
