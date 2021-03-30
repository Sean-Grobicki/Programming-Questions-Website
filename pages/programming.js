import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/programming.module.css';
import global from '../styles/global.module.css';
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
          <div className = {global.container}>
              <header>
              <h1 className = {global.h1}>Programming Question</h1>
              <nav className = {global.navBar}> 
                  <a href = "grammar" className={global.navBarLink}>Grammar</a>
                  <a href = "programming" className={global.navBarLink + ' ' + global.active}>Programming</a>
                  <a href = "trace" className={global.navBarLink}>Trace</a>
              </nav>
              </header>
              <article className = {styles.article}>
                <h2 className = {global.h2} >Write a program that corresponds to the flow chart on the right below.</h2>
                <textarea rows= "30" className={styles.textarea} defaultValue = {this.state.question.questionCode}> 
                </textarea>
                <button className = {global.button} > Submit </button>
              </article>
          </div>
      </div>
    );
  }
}