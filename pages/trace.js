import Head from 'next/head';
import styles from '../styles/trace.module.css';
import global from '../styles/global.module.css';
import React, {useState, useEffect} from 'react';
import { get } from './api/questions';
import {InputTraceTable} from './shared/inputTraceTable.js';
import {TraceTable }from './shared/traceTable.js';

export default function Trace(props)
{
    const [question,setQuestion] = useState([]);
    const [loaded,setLoaded] = useState(false);
    const [answered,setAnswered] = useState(false);
    const [var1Values,setVar1Values] = useState([null,null,null,null,null,null]);
    const [var2Values,setVar2Values] = useState([null,null,null,null,null,null]);
    const [var3Values,setVar3Values] = useState([null,null,null,null,null,null]);
    const [correct,setCorrect] = useState(0);

    useEffect(() => {
      getQuestion();
    },[]);

    const getQuestion = async() =>
    {
      const route = "/trace";
      const headers = { 'Content-Type': 'application/json'};
      const response = await get(route,headers);
      setQuestion(response);
      setLoaded(true);
      setAnswered(false);
    }

    const questionAnswered = () =>
    {
      var correctly = 0;
      for (let index = 0; index < var1Values.length; index++) {
        if(var1Values[index] == question.traceTable[0].variableStages[index].stageValue)
        {
          correctly += 1;
        }
        if(var2Values[index] == question.traceTable[1].variableStages[index].stageValue)
        {
          correctly += 1;
        }
        if(var3Values[index] == question.traceTable[2].variableStages[index].stageValue)
        {
          correctly += 1;
        }
      }
      //Compare the answers from the correct trace table to their one.
      //Give them a score that can be marked at the top.
      setCorrect(correctly);
      setAnswered(true);

    }

    const handleInput = (var1Values,var2Values,var3Values) =>
    {
      setVar1Values(var1Values);
      setVar2Values(var2Values);
      setVar3Values(var3Values);
    }

    if(loaded)
    {
      const varNames = [question.traceTable[0].variableName,question.traceTable[1].variableName,question.traceTable[2].variableName];
      if(answered)
      {
        var correctVar1 = [];
        var correctVar2 = [];
        var correctVar3 = [];
        for (let index = 0; index < question.traceTable[0].variableStages.length; index++) {
          const var1 = question.traceTable[0].variableStages[index].stageValue;
          const var2 = question.traceTable[1].variableStages[index].stageValue;
          const var3 = question.traceTable[2].variableStages[index].stageValue;
          correctVar1.push(var1);
          correctVar2.push(var2);
          correctVar3.push(var3);
        }
        var title = "You got "+ correct +" out of 18 of the values in the trace table correct." 
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
              <article className = {styles.backgroundDiv}>
                <h2 className = {global.h2} >{title} </h2>
                <div className={styles.fullDiv}>
                  <div className={styles.codeDiv}>
                    <textarea rows= "30" className={global.codeInput} defaultValue = {question.questionCode} />
                  </div>
                  <div className={styles.tableDiv}>
                    <h2>Your Answer </h2>
                    <TraceTable varNames={varNames} var1Values={var1Values} var2Values={var2Values} var3Values={var3Values} tableStyle={styles.tablePosition}/>
                    <h2>Correct Answer </h2>
                    <TraceTable varNames={varNames}var1Values={correctVar1} var2Values={correctVar2} var3Values={correctVar3} tableStyle={styles.tablePosition}/>
                  </div>
                </div>
                <button className = {global.button} onClick={() => getQuestion()} > Next Question </button>
              </article>
            </div>
          </div>
          );
      }
      else
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
              <article className = {styles.backgroundDiv}>
                <h2 className = {global.h2} >Fill in the trace table to follow the changes in the following program.</h2>
                <div className={styles.fullDiv}>
                  <div className={styles.codeDiv}>
                    <textarea rows= "30" className={global.codeInput} defaultValue = {question.questionCode} />
                  </div>
                  <div className={styles.tableDiv}>
                    <InputTraceTable table={question.traceTable} handleInput = {handleInput} tableStyle={styles.tablePosition}/>
                  </div>
                </div>
                <button className = {global.button} onClick={() => questionAnswered() } > Submit </button>
              </article>
            </div>
          </div>
          );
      }
    }
    else
    {
      return(<div> Loading </div>);
    }
}