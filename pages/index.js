import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/stylesheet.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <div className={styles.container}>
            <header>
            <h1>Choose Question</h1>
            <nav> 
                <Link href = "grammar" className={styles.navBar}><button type = "button" >Grammar</button></Link>
                <Link href = "programming" className={styles.navBar}><button type ="button" >Programming</button></Link>
                <Link href = "trace" className={styles.navBar}><button type = "button" >Trace</button></Link>
            </nav>
            </header>
        </div>
    </body>
    </div>
  );
}
