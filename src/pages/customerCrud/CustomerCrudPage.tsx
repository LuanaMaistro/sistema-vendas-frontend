import styles from './CustomerCrudPage.module.css'

export default function CustomerCrudPage() {
  return (
    <div className={styles.customerCrudPage}>
      <header>
        <div>
          <h1>Clientes</h1>
          <p>Gerencie os clientes do sistema</p>
        </div>

        <div>
          <button>+ Novo Cliente</button>
        </div>
      </header>
    </div>
  )
}
