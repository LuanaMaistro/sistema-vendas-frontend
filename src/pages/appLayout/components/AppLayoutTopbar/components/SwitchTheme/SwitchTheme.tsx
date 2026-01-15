import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useTheme } from "../../../../../../hooks/useTheme";

export default function SwitchTheme() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <Button
        icon={theme === 'light' ? <SunOutlined /> : <MoonOutlined />}
        onClick={toggleTheme}
      />

    </div>
  )
}
