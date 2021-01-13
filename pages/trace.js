import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Trace() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <div id ="container">
            <header>
            <h1>Grammar Question</h1>
            <nav> 
                <a href = "grammar.js"><button type = "button" >Grammar</button></a>
                <a href = "programming.php"><button type ="button" >Programming</button></a>
                <a href = "trace.php"><button type = "button" >Trace</button></a>
            </nav>
            </header>
            <article id = "question">
            <h2>Fix the grammatical errors that are present in the following code. </h2>
            <textarea rows= "30"> 
            </textarea>
            
            
            
            </article>
            
            
        </div>
    </body>
    </div>
  );
}