import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/stylesheet.module.css'

export default function Trace() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Trace Question</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <div id ="container">
            <header>
            <h1>Trace Question</h1>
            <nav> 
                <Link href = "grammar" className={styles.navBar}><button type = "button" >Grammar</button></Link>
                <Link href = "programming" className={styles.navBar}><button type ="button" >Programming</button></Link>
                <Link href = "trace" className={styles.navBar}><button type = "button" >Trace</button></Link>
            </nav>
            </header>
            
            <article id = "question">
            <h2>Fill in the trace table below to predict the outcome of the program.</h2>
            <textarea rows= "30" className={styles.textarea}>

            </textarea>
            
            
            
            </article>
            
            
        </div>
    </body>
    </div>
  );
}