import styles from './CrudHeader.module.css'
import { Button, Flex } from "antd"
import Paragraph from "antd/es/typography/Paragraph"
import Title from "antd/es/typography/Title"

interface CrudHeaderProps {
  addButtonText: string,
  addButtonAction: () => void,
  title: string,
  description: string
}

const CrudHeader = ({ title, description, addButtonText, addButtonAction }: CrudHeaderProps) => {
  return (
    <header className={styles.crudPageHeader}>
      <Flex vertical>
        <Title level={2}>{ title }</Title>
        <Paragraph>{ description }</Paragraph>
      </Flex>

      <div>
        <Button
          variant="solid"
          color="primary"
          onClick={addButtonAction}
        >
          { addButtonText }
        </Button>
      </div>
    </header>
  )
}

export default CrudHeader

