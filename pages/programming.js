import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/stylesheet.module.css'
import React, {Component} from 'react'
import { get } from './api/questions';

export default class Programming extends Component 
{
  constructor(props)
  {
    super(props);
    this.state =
    {
      question: [],
    }
  }

  componentDidMount()
  {
    this.getQuestion();
  }

  async getQuestion()
  {
    const route = "/programming";
    const headers = { 'Content-Type': 'application/json'};
    const response = await get(route,headers);
    this.setState({question: response});
  }

  render()
  {
    return (
      <div>
        <Head>
          <title>Programming</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
          <div className = {styles.container}>
              <header>
              <h1 className = {styles.h1}>Programming Question</h1>
              <nav className = {styles.navBar}> 
                  <a href = "grammar" className={styles.a}>Grammar</a>
                  <a href = "programming" className={styles.a + ' ' + styles.active}>Programming</a>
                  <a href = "trace" className={styles.a}>Trace</a>
              </nav>
              </header>
              <article className = {styles.article}>
                <h2 className = {styles.h2} >Write a program that corresponds to the flow chart on the right below.</h2>
                <textarea rows= "30" className={styles.textarea} defaultValue = {this.state.question.msg}> 
                </textarea>
                <button className = {styles.button} > Submit </button>
              </article>
          </div>
      </div>
    );
  }
}