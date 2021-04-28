import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/grammar.module.css';
import global from '../styles/global.module.css';
import React, {Component, useState, useEffect} from 'react'
import { get } from './api/questions';

export default function Grammar(props)
{
  const [question,setQuestion] = useState([]);
  const [answered, setAnswered] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [errors,setErrors] = useState([]);

  //If you pass [] then it works like componentDidMount without it works like componentDidUnmount.
  useEffect(() => {
    getQuestion();
  },[])

  const getQuestion = async() =>
  {
    setLoaded(false);
    const route = "/grammar";
    const headers = { 'Content-Type': 'application/json', 'Origin' : 'http://localhost:3333/grammar'};
    const response = await get(route,headers);
    setQuestion(response);
    setAnswer(response.questionCode);
    setErrors(response.errors);
    setAnswered(false);
    setLoaded(true);
  }

  const markAnswer = () =>
  {
    // This splits them with the same line numbers as intended so the correction will always be correct.
    const errorsWithCorrect = errors;
    const tempAnswer =  answer;
    const answerLines = tempAnswer.toString().split('\n');
    const correctLines = question.answerCode.split('\n');
    errorsWithCorrect.forEach(error => {
      const lineNumber = error.lineNumber-1;
      var answerLine;
      if(answerLines[lineNumber] != undefined)
      {
         answerLine = answerLines[lineNumber].replaceAll(/\s/g, "");
        const correctLine = correctLines[lineNumber].replaceAll(/\s/g,"");
        if( answerLine === correctLine)
        {
          error.correct = true;
        }
        else
        {
          if(answerLines[lineNumber].includes(error.missingValue))
          {
            error.correct = true;
          }
          else
          {
            error.correct = false;
          }
        }
      }
      else
      {
        error.correct = false;
      }
    });
    setAnswered(true);
    setErrors(errorsWithCorrect)

  }
  if(!loaded)
  {
    return (<div> Loading </div>);
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
            <div className = {global.container}>
                <header>
                <h1 className = {global.h1}>Grammar Question</h1>
                <nav className = {global.navBar}>
                    <a href = "grammar" className={global.active + ' '+ global.navBarLink}>Grammar</a>
                    <a href = "programming" className={global.navBarLink}>Programming</a>
                    <a href = "trace" className={global.navBarLink}>Trace</a>
                </nav>
                </header>
                <div className = {styles.halfArticleGS2}>
                  <div className = {styles.halfDivGS2}>
                    
                    <div className={styles.answerDiv}>
                      <div className={styles.verticalAnswerArea}>
                        <h3 className={styles.answerLabels}> Your Answer </h3>
                        <textarea readOnly={true} rows="12" className={styles.answerBoxes} value={answer}  />
                      </div>
                      <div className={styles.verticalAnswerArea}>
                        <h3 className={styles.answerLabels}> Correct Answer </h3>
                        <textarea readOnly={true} rows="12" className={styles.answerBoxes} value={question.answerCode}  />
                      </div>
                    </div>
                  </div>
                <div className={styles.halfDivGS2}>
                  <h2 className = {styles.h2} > {title} </h2> 
                  <ErrorTable errors={errors} tableStyle={styles.tablePosition}/>
                  <button className = {global.button} onClick = {()  => getQuestion()} > Next Question </button>
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
          <div className = {global.container}>
              <header>
              <h1 className = {global.h1}>Grammar Question</h1>
              <nav className = {global.navBar}> 
                  <a href = "grammar" className={global.active + ' '+ global.navBarLink}>Grammar</a>
                  <a href = "programming" className={global.navBarLink}>Programming</a>
                  <a href = "trace" className={global.navBarLink}>Trace</a>
              </nav>
              </header>
              <article className = {styles.codeInputArticle}>
                <h2 className = {global.h2} >Fix the grammatical errors that are present in the following code. </h2>
                <textarea rows="30" className={styles.textarea} defaultValue={answer} onInput={(event) => setAnswer(event.target.value)}/>
                <button className = {global.button} onClick = {()  => markAnswer()} > Submit </button>
              </article>
          </div>
        </div>
    );
}

function ErrorTable(props) 
{
    return (
        <div className={props.tableStyle}>
            <table className={global.table} >
                <thead>
                    <tr className={global.tableHeaderRow}>
                        <th className = {global.tableHeaderText}>Description</th>
                        <th className = {global.tableHeaderText}>Line Number</th>
                        <th className = {global.tableHeaderText}>Line Position</th>
                        <th className = {global.tableHeaderText}>Corrected</th>
                    </tr>
                </thead>
                <tbody>
                    {props.errors.map(error => <ErrorTableRow err={error}/>)}
                </tbody>
            </table>
        </div>
    );
}



function ErrorTableRow(props) 
{
    var correctedText;
    if (props.err.correct)
    {
        correctedText = "Y";
    }   
    else
    {
        correctedText = "N";
    }
    return(
    <tr className ={global.tableRow}>
        <td>{props.err.description}</td>
        <td className ={global.tableCell}>{props.err.lineNumber}</td>
        <td className ={global.tableCell}>{props.err.linePosition}</td>
        <td className ={global.tableCell}>{correctedText}</td>
    </tr>);
}



