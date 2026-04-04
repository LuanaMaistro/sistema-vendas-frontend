import { Card, Col, Checkbox, Input, Row, Select } from 'antd'
import { useCallback, useMemo, useState } from 'react'
import { useProductCrudStore } from '../../ProductCrudStore'

const CATEGORIA_OPTIONS = [
  { label: 'Eletrônicos', value: 'Eletrônicos' },
  { label: 'Roupas', value: 'Roupas' },
  { label: 'Alimentos', value: 'Alimentos' },
  { label: 'Livros', value: 'Livros' },
  { label: 'Móveis', value: 'Móveis' },
  { label: 'Esportes', value: 'Esportes' },
]

export default function ProductFilters() {
  const { filters, setNomeFilter, setCategoriaFilter, setOnlyActives } = useProductCrudStore()
  const [nomeInput, setNomeInput] = useState(filters.nome || '')

  useMemo(() => {
    return setTimeout(() => {
      if (nomeInput === '') {
        setNomeFilter(undefined)
      } else {
        setNomeFilter(nomeInput)
      }
    }, 500)
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

  return (
    <Card>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={8}>
          <Input
            placeholder="Buscar por nome..."
            value={nomeInput}
            onChange={handleNomeChange}
            allowClear
          />
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Select
            placeholder="Selecione uma categoria..."
            options={CATEGORIA_OPTIONS}
            value={filters.categoria}
            onChange={handleCategoriaChange}
            allowClear
            style={{ width: '100%' }}
          />
        </Col>
        <Col xs={24} lg={8}>
          <Checkbox
            checked={filters.onlyActives}
            onChange={handleOnlyActivesChange}
          >
            Apenas ativos
          </Checkbox>
        </Col>
      </Row>
    </Card>
  )
}
