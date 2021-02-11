import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/stylesheet.module.css'
import React, {Component} from 'react'
import { get } from './api/questions';


export default class Grammar extends Component
{

  constructor(props)
  {
    super(props);
    this.state = {
      question: [],
    };
  }


  componentDidMount()
  {
    this.getQuestion();
  }


  async getQuestion()
  {
    const route = "/grammar";
    const headers = { 'Content-Type': 'application/json', 'Origin' : 'http://localhost:3000/grammar'};
    const response = await get(route,headers);
    this.setState({question: response});
  }

  render()
  {
    return (
      <div>
        <Head>
          <title>Grammar</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
          <div className = {styles.container}>
              <header>
              <h1 className = {styles.h1}>Grammar Question</h1>
              <nav className = {styles.navBar}> 
                  <a href = "grammar" className={styles.active + ' '+ styles.a}>Grammar</a>
                  <a href = "programming" className={styles.a}>Programming</a>
                  <a href = "trace" className={styles.a}>Trace</a>
              </nav>
              </header>
              <article className = {styles.article}>
                <h2 className = {styles.h2} >Fix the grammatical errors that are present in the following code. </h2>
                <textarea rows= "30" className={styles.textarea} defaultValue = {this.state.question.msg}/>
                <button className = {styles.button} > Submit </button>
              </article>
          </div>
        </div>
    );
  }
}
