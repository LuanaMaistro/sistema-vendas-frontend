import { Card, Checkbox, Input, Select, Space, Button } from 'antd'
import { ClearOutlined } from '@ant-design/icons'
import { useCallback, useEffect, useState } from 'react'
import { useProductCrudStore } from '../../ProductCrudStore'
import styles from './ProductFilters.module.css'

const CATEGORIA_OPTIONS = [
  { label: 'Eletrônicos', value: 'Eletrônicos' },
  { label: 'Roupas', value: 'Roupas' },
  { label: 'Alimentos', value: 'Alimentos' },
  { label: 'Livros', value: 'Livros' },
  { label: 'Móveis', value: 'Móveis' },
  { label: 'Esportes', value: 'Esportes' },
]

export default function ProductFilters() {
  const { filters, setNomeFilter, setCategoriaFilter, setOnlyActives, clearFilters } = useProductCrudStore()
  const [nomeInput, setNomeInput] = useState(filters.nome || '')

  // Fix debounce: use useEffect with cleanup
  useEffect(() => {
    const timer = setTimeout(() => {
      if (nomeInput === '') {
        setNomeFilter(undefined)
      } else {
        setNomeFilter(nomeInput)
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [nomeInput, setNomeFilter])

  const handleNomeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setNomeInput(e.target.value)
  }, [])

  const handleCategoriaChange = useCallback((value?: string) => {
    setCategoriaFilter(value)
  }, [setCategoriaFilter])

  const handleOnlyActivesChange = useCallback((e: any) => {
    setOnlyActives(e.target.checked)
  }, [setOnlyActives])

  const handleClearFilters = useCallback(() => {
    setNomeInput('')
    clearFilters()
  }, [clearFilters])

  return (
    <Card className={styles.filtersCard} size="small">
      <Space wrap size="middle">
        <div className={styles.filterItem}>
          <span className={styles.filterLabel}>Produto:</span>
          <Input
            placeholder="Buscar por nome..."
            value={nomeInput}
            onChange={handleNomeChange}
            allowClear
            style={{ width: 200 }}
          />
        </div>

        <div className={styles.filterItem}>
          <span className={styles.filterLabel}>Categoria:</span>
          <Select
            placeholder="Selecione uma categoria..."
            options={CATEGORIA_OPTIONS}
            value={filters.categoria}
            onChange={handleCategoriaChange}
            allowClear
            style={{ width: 200 }}
          />
        </div>

        <div className={styles.filterItem}>
          <Checkbox
            checked={filters.onlyActives}
            onChange={handleOnlyActivesChange}
          >
            Apenas ativos
          </Checkbox>
        </div>

        <Button
          icon={<ClearOutlined />}
          onClick={handleClearFilters}
        >
          Limpar Filtros
        </Button>
      </Space>
    </Card>
  )
}
