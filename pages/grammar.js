import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/stylesheet.module.css'
import React, {Component, useState, useEffect} from 'react'
import { get } from './api/questions';
import Table from './shared/table';

export default function Grammar(props)
{
  const [question,setQuestion] = useState([]);
  const [answered, setAnswered] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [errors,setErrors] = useState([]);

  //If you pass [] then it works like componentDidMount without it works like componentDidUnmount.
  useEffect(() => {
    getQuestion();
  },[])

  const getQuestion = async() =>
  {
    const route = "/grammar";
    const headers = { 'Content-Type': 'application/json', 'Origin' : 'http://localhost:3333/grammar'};
    const response = await get(route,headers);
    setQuestion(response);
    setAnswer(response.questionCode);
    setErrors(response.errors);
    setAnswered(false);
  }

  const markAnswer = () =>
  {
    // This splits them with the same line numbers as intended so the correction will always be correct.
    const errorsWithCorrect = errors;
    const tempAnswer =  answer;
    const answerLines = tempAnswer.toString().split('\n');
    const correctLines = question.answerCode.split('\r\n');
    errorsWithCorrect.forEach(error => {
      const lineNumber = error.lineNumber-1;
      console.log(error.lineNumber);
      console.log("Answer: " + answerLines[lineNumber] + " Correct: " +correctLines[lineNumber]);
      if(answerLines[lineNumber] === correctLines[lineNumber])
      {
        error.correct = true;
      }
      else
      {
        error.correct = false;
      }
    });
    setAnswered(true);
    setErrors(errorsWithCorrect)

  }

  if (answered === true)
    {
      var correct = 0;
      errors.forEach(error => {
        if(error.correct === true)
        {
          correct ++;
        }
      })
      const title = "You corrected " + correct + " out of " + 5 + " errors.";
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
                    <a href = "grammar" className={styles.active + ' '+ styles.navBarLink}>Grammar</a>
                    <a href = "programming" className={styles.navBarLink}>Programming</a>
                    <a href = "trace" className={styles.navBarLink}>Trace</a>
                </nav>
                </header>
                <div className = {styles.halfArticleGS2}>
                  <div className = {styles.halfDivGS2}>
                    <h2 className = {styles.h2} > {title} </h2>
                    <div className={styles.answerDiv}>
                      <div className={styles.verticalAnswerArea}>
                        <h3 className={styles.answerLabels}> Your Answer </h3>
                        <textarea readOnly={true} rows="25" className={styles.answerBoxes} value={answer}  />
                      </div>
                      <div className={styles.verticalAnswerArea}>
                        <h3 className={styles.answerLabels}> Correct Answer </h3>
                        <textarea readOnly={true} rows="25" className={styles.answerBoxes} value={question.answerCode}  />
                      </div>
                    </div>
                  </div>
                <div className={styles.halfDivGS2}> 
                  <Table errors={errors} tableStyle={styles.tablePosition}/>
                  <button className = {styles.button} onClick = {()  => getQuestion()} > Next Question </button>
                </div>
              </div>
            </div>
          </div> );
    }
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
                  <a href = "grammar" className={styles.active + ' '+ styles.navBarLink}>Grammar</a>
                  <a href = "programming" className={styles.navBarLink}>Programming</a>
                  <a href = "trace" className={styles.navBarLink}>Trace</a>
              </nav>
              </header>
              <article className = {styles.codeInputArticle}>
                <h2 className = {styles.h2} >Fix the grammatical errors that are present in the following code. </h2>
                <textarea rows="30" className={styles.textarea} defaultValue={answer} onInput={(event) => setAnswer(event.target.value)}/>
                <button className = {styles.button} onClick = {()  => markAnswer()} > Submit </button>
              </article>
          </div>
        </div>
    );
}



