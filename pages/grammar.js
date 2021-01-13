
export default function Grammar() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Grammar</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <div className={styles.container}>
            <header>
            <h1>Grammar Question</h1>
            <nav> 
                <Link href = "grammar"><button type = "button" >Grammar</button></Link>
                <Link href = "programming"><button type ="button" >Programming</button></Link>
                <Link href = "trace"><button type = "button" >Trace</button></Link>
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
