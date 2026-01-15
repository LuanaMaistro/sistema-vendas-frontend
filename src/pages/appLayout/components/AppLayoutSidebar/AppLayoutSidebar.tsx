import styles from './AppLayoutSidebar.module.css'

export default function AppLayoutSidebar() {

  const systemLogo = (
    <div className={ styles.systemLogo }>
      S
    </div>
  )

  return (
    <div>

      <div className={styles.systemLogoContainer}>
        {systemLogo}
      </div>


    </div>
  )
}
