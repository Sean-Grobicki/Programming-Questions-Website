import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/trace.module.css';
import global from '../styles/global.module.css';
import React, {Component} from 'react'
import { get } from './api/questions';

export default class Trace extends Component
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
      const route = "/trace";
      const headers = { 'Content-Type': 'application/json'};
      const response = await get(route,headers);
      this.setState({question: response});
    }

    render()
    {
      return (
        <div>
          <Head>
            <title>Trace</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <div className = {global.container}>
              <header>
              <h1 className = {global.h1}>Trace Question</h1>
              <nav className = {global.navBar}> 
                  <a href = "grammar" className={global.navBarLink}>Grammar</a>
                  <a href = "programming" className={global.navBarLink}>Programming</a>
                  <a href = "trace" className={global.navBarLink + ' ' + global.active}>Trace</a>
              </nav>
              </header>
              <article className = {styles.codeInputArticle}>
                <h2 className = {global.h2} >Fill in the trace table to follow the changes in the following program.</h2>
                <textarea rows= "30" className={styles.textarea} defaultValue = {this.state.question.msg}>
                </textarea>
                <button className = {global.button} > Submit </button>
              </article>
          </div>
      </div>
      );
    }
}