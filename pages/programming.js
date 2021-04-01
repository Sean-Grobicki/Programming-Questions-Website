import Head from 'next/head';
import React, {useEffect, useState} from 'react';
import dynamic from 'next/dynamic';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-markup';
import styles from '../styles/programming.module.css';
import global from '../styles/global.module.css';
import { get, post, getJSONProgrammingPost } from './api/questions';

const Flowchart = dynamic(() => import('react-simple-flowchart'),{ssr:false,});

export default function Programming(props)
{

  const [question, setQuestion] = useState({});
  const [chartCode, setchartCode] = useState(``);
  const [chartOptions,setchartOptions] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [answer, setAnswer] = useState('');


  useEffect(() =>
  {
    getQuestion();
  },[]);

  

  const getQuestion = async() =>
  {
    const route = "/programming";
    const headers = { 'Content-Type': 'application/json'};
    const response = await get(route,headers);
    console.log(response);
    setQuestion(response);
    setAnswer(response.questionCode);
    setUpFlowchart(response.flowChart);
  }

  const sendAnswer = async() =>
  {
    setLoaded(false);
    const route = "/programming";
    const headers = {'Content-Type': 'application/json'};
    const body = getJSONProgrammingPost(question.flowChart,answer);
    console.log(body);
    const response = await post(route,headers,body);
    setAnswered(true);
    setQuestion(response);
    setLoaded(true);
  }

  const setUpFlowchart = (flowchart) =>
  {
    var chartNodes = `st=>start: Start\ne=>end: End\n`;

    var chartConnections = `st->node0\n`;
    
  flowchart.forEach(node => {
      //Decide the node type here based on condition
      var nodeType;
      if (node.falseNodeChildID === -1)
      {
        if (node.nodeText.includes("Output"))
        {
          nodeType = "inputoutput";
        }
        else
        {
          nodeType = "operation";
        }
      }
      else
      {
        nodeType = "condition";
      }
      // Declare the node in chartNodes
      chartNodes += `node${node.nodeID}=>${nodeType}: ${node.nodeText}\n`
      // Add the connection to its child nodes here if its null add to end
      if(nodeType === "condition")
      {
        chartConnections += `node${node.nodeID}(yes,right)->node${node.trueNodeChildID}\n`;
        chartConnections += `node${node.nodeID}(no,bottom)->node${node.falseNodeChildID}\n`;
      }
      else
      {
        if (node.trueNodeChildID === -1)
        {
          chartConnections += `node${node.nodeID}->e\n`;
        }
        else
        {
          chartConnections += `node${node.nodeID}->node${node.trueNodeChildID}\n`;
        }
      }
      
  });
    const options = {
    x: 0,
    y: 0,
    'line-width': 2,
    'line-length': 10,
    'text-margin': 5,
    'font-size': 18,
    'font-color': 'black',
    'line-color': 'black',
    'element-color': 'black',
    fill: 'white',
    'yes-text': 'true',
    'no-text': 'false',
    'arrow-end': 'block',
    scale: 0.6,
    symbols: {
      start: {
        'font-color': 'red',
        'element-color': 'green',
        'font-weight': 'bold',
      },
      end: {
        'font-color': 'red',
        'element-color': 'green',
        'font-weight': 'bold',
      },
    },
    flowstate: {
      department1: { fill: 'pink' },
      department2: { fill: 'yellow' },
      external: { fill: 'green' },
    },
  };
  setchartOptions(options);
  setchartCode(chartNodes + chartConnections);
  setLoaded(true);
  console.log(chartCode);
  }
  
  if(loaded)
  {
    if(answered)
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
            <p> {question.msg} </p>
            <Flowchart chartCode={chartCode} options={chartOptions}/>
          </div>
        </div>
      )
    }
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
              <div className = {styles.splitDiv}>
                <div className={styles.textareaDiv}>
                  <Editor 
                    value={answer}  
                    onValueChange={(code) => setAnswer(code)}
                    highlight={() => highlight(answer,languages.java,'java')}
                    padding={10}
                    tabSize={4}
                    preClassName={global.codeInput}
                    />
                </div>
                <div className={styles.flowchartDiv} >
                  <Flowchart chartCode={chartCode} options={chartOptions}/>
                </div>
              </div>
              <button className = {global.button} onClick={() => sendAnswer()} > Submit </button>
            </article>
          </div>
        </div>
      )
  }
  else
  {
    return(<div> <p>Loading </p> </div>);
  }
}