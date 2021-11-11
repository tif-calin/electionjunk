import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="index addict" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        hello!
        <ul>
          <li>
            <Link href="vagov2021">
              <a>Virginia Gubernational 2021</a>
            </Link>
          </li>
        </ul>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  )
}

export default Home
