import Head from 'next/head'
import Link from 'next/link'
import global from '../styles/global.module.css';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
        <div className={global.container}>
            <header>
            <h1 className ={global.h1}>Choose Question</h1>
            <nav className={global.navBar}> 
                <a href = "grammar" className={global.navBarLink}>Grammar</a>
                <a href = "programming" className={global.navBarLink}>Programming</a>
                <a href = "trace" className={global.navBarLink}>Trace</a>
            </nav>
            </header>
        </div>
    </div>
  );
}
