import { Card, Checkbox, Input, Space, Button } from 'antd'
import { ClearOutlined } from '@ant-design/icons'
import { useCallback, useEffect, useState } from 'react'
import { useProductCrudStore } from '../../ProductCrudStore'
import styles from './ProductFilters.module.css'

export default function ProductFilters() {
  const { filters, setNomeFilter, setCategoriaFilter, setOnlyActives, clearFilters } = useProductCrudStore()
  const [nomeInput, setNomeInput] = useState(filters.nome || '')
  const [categoriaInput, setCategoriaInput] = useState(filters.categoria || '')

  useEffect(() => {
    setCategoriaInput(filters.categoria || '')
  }, [filters.categoria])

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

  useEffect(() => {
    const timer = setTimeout(() => {
      if (categoriaInput === '') {
        setCategoriaFilter(undefined)
      } else {
        setCategoriaFilter(categoriaInput)
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [categoriaInput, setCategoriaFilter])

  const handleNomeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setNomeInput(e.target.value)
  }, [])

  const handleCategoriaChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoriaInput(e.target.value)
  }, [])

  const handleOnlyActivesChange = useCallback((e: any) => {
    setOnlyActives(e.target.checked)
  }, [setOnlyActives])

  const handleClearFilters = useCallback(() => {
    setNomeInput('')
    setCategoriaInput('')
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
          <Input
            placeholder="Filtrar por categoria..."
            value={categoriaInput}
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
