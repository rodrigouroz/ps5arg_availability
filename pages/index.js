import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Store from '../components/Store'
import getStores from '../lib/stores'

export async function getStaticProps(context) {

  return {
    props: { stores: await getStores() }, // will be passed to the page component as props
    revalidate: 60 * 5
  }
}

export default function Home({ stores }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>¿Dónde hay una PS5?</title>
        <meta name="description" content="¿Donde hay una PS5?" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          ¿Dónde hay una PS5?
        </h1>
        <p className={styles.description}>Si no se puede determinar que esta &quot;No disponible&quot;, se pone el estado &quot;Verificar&quot; para que
          el usuario vaya directamente al sitio y se fije.</p>

        <div className={styles.grid}>
          {stores.map(store => (
            <Store key={store.name} {...store} />
          ))}
        </div>
      </main>
    </div>
  )
}
