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

  const [question, setQuestion] = useState([]);
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
    setQuestion(response);
    setAnswer(response.questionCode);
    setUpFlowchart(response.flowChart);
  }

  const sendAnswer = async() =>
  {
    const route = "/programming";
    const headers = {'Content-Type': 'application/json'};
    const body = getJSONProgrammingPost(question.flowChart,answer);
    const response = await post(route,headers,body);
    setQuestion(response);
    setAnswered(true);
    
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
  }
  
  if(loaded)
  {
    if(answered)
    {
      const correctOutput = question.correctOutput;
      const theirOutput = question.compilerOutput;
      var included = 0;
      question.operationsTable.forEach(op => {
          if (op.included)
          {
            included ++;
          }
      });
      var operationNumbers = 9;
      var outputText = "";
      if (question.compilerOutput === question.correctOutput)
      {
        outputText = "and got the correct output.";
      }
      else
      {
        outputText = "and didn't get the correct output.";
      }
      const title = "You included "+ included + " out of " +operationNumbers+ " from the flowchart "+ outputText;
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
            <h2 className={global.h2}>{title}</h2>
            <div className={styles.splitDiv}>
              <div className={styles.leftDiv}>
                <h2>Your Solution </h2>
                <textarea  value ={answer} rows = {20} readOnly={true}/>
                <p> Your Output: {theirOutput}</p>
                <h2>Correct Solution: </h2>
                <textarea value={question.correctSolution} readOnly={true} rows={20}/>
                <p> Correct Output: {correctOutput}</p> 
              </div>
              <div className={styles.rightDiv}>
                <MarkingTable operations={question.operationsTable} />
                <Flowchart chartCode={chartCode} options={chartOptions}/>
              </div>
            </div>
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
    return(<div>
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
          <h1 className={global.loading}>Loading Question ...</h1>          
        </div>
      </div>
    );
  }
}

function MarkingTable(props) 
{
    return (
        <div className={props.tableStyle}>
            <table className={global.table} >
                <thead>
                    <tr className={global.tableHeaderRow}>
                        <td className = {global.tableHeaderText}>Operation Type</td>
                        <td className = {global.tableHeaderText}>JavaCode</td>
                        <td className = {global.tableHeaderText}>Included</td>
                    </tr>
                </thead>
                <tbody>
                    {props.operations.map(op => <MarkingTableRow op={op}/>)}
                </tbody>
            </table>
        </div>
    );
}



function MarkingTableRow(props) 
{
    var includedText;
    if (props.op.included)
    {
        includedText = "Y";
    }   
    else
    {
        includedText = "N";
    }
    return(
    <tr className ={global.tableRow}>
        <td className={global.tableCell}> {props.op.operationType}</td>
        <td className ={global.tableCell}>{props.op.javaCode}</td>
        <td className ={global.tableCell}>{includedText}</td>
    </tr>);
}