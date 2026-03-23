
interface ActionButtonProps {
  onClick: () => void,
  icon: React.ReactNode,
  tooltip: string,
}

export default function ActionButton({ onClick, icon, tooltip }: ActionButtonProps) {
  return (
    <a onClick={onClick} title={tooltip}>
      {icon}
    </a>
  )
}
