import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/stylesheet.module.css'
import React, {Component, useState, useEffect} from 'react'
import { get } from './api/questions';

export default function Grammar(props)
{
  const [question,setQuestion] = useState([]);
  const [answered, setAnswered] = useState([]);
  const [answer, setAnswer] = useState([]);

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
  }

  const markAnswer = () =>
  {
    setAnswered(true);
  }

  if (answered === true)
    {
      const title = "You corrected " + 4 + " out of " + 5 + " errors.";
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
                <div className = {styles.article}>
                  <div className = {styles.halfDiv}>
                    <h2 className = {styles.h2} > {title} </h2>
                    <div className={styles.answerArea}>
                      <div className={styles.verticalAnswerArea}>
                        <h3 className={styles.answerLabels}> Your Answer </h3>
                        <textarea contentEditable={false} rows="25" className={styles.answerBoxes} value={answer}  />
                      </div>
                      <div className={styles.verticalAnswerArea}>
                        <h3 className={styles.answerLabels}> Correct Answer </h3>
                        <textarea contentEditable={false} rows="25" className={styles.answerBoxes} value={question.answerCode}  />
                      </div>
                    </div>
                  </div>
                <div className={styles.halfDiv}> 
                  <table className={styles.table}>
                    <tr> 
                      <th>Description</th>
                      <th>Line Number</th>
                      <th>Line Position</th>
                      <th>Corrected</th>
                    </tr>
                    <tr>
                      <td>{question.Errors[0].description}</td>
                      <td>{question.Errors[0].lineNum}</td>
                      <td>{question.Errors[0].linePos}</td>
                      <td>Y</td>
                    </tr>
                    <tr>
                      <td>{question.Errors[1].description}</td>
                      <td>{question.Errors[1].lineNum}</td>
                      <td>{question.Errors[1].linePos}</td>
                      <td>Y</td>
                    </tr>
                    <tr>
                      <td>{question.Errors[2].description}</td>
                      <td>{question.Errors[2].lineNum}</td>
                      <td>{question.Errors[2].linePos}</td>
                      <td>Y</td>
                    </tr>
                    <tr >
                      <td>{question.Errors[3].description}</td>
                      <td>{question.Errors[3].lineNum}</td>
                      <td>{question.Errors[3].linePos}</td>
                      <td>Y</td>
                    </tr>
                    <tr>
                      <td>{question.Errors[4].description}</td>
                      <td>{question.Errors[4].lineNum}</td>
                      <td>{question.Errors[4].linePos}</td>
                      <td>Y</td>
                    </tr>
                  </table>
                  <button className = {styles.button} onClick = {()  => setAnswered(false)} > Next Question </button>
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
                  <a href = "grammar" className={styles.active + ' '+ styles.a}>Grammar</a>
                  <a href = "programming" className={styles.a}>Programming</a>
                  <a href = "trace" className={styles.a}>Trace</a>
              </nav>
              </header>
              <article className = {styles.article}>
                <h2 className = {styles.h2} >Fix the grammatical errors that are present in the following code. </h2>
                <textarea rows="30" className={styles.textarea} value={answer} onChange={(text) => setAnswer(text)}/>
                <button className = {styles.button} onClick = {()  => markAnswer()} > Submit </button>
              </article>
          </div>
        </div>
    );
}



// export default class Grammar extends Component
// {

//   constructor(props)
//   {
//     super(props);
//     this.state = {
//       question: [],
//       answered: false,
//       answer: '',
//     };
//   }


//   componentDidMount()
//   {
//     this.getQuestion();
//   }


//   async getQuestion()
//   {
//     const route = "/grammar";
//     const headers = { 'Content-Type': 'application/json', 'Origin' : 'http://localhost:3333/grammar'};
//     const response = await get(route,headers);
//     this.setState({question: response, answer: response.questionCode,});
//   }

//   markAnswer()
//   {

//   }

//   render()
//   {
//     if (this.state.answered === true)
//     {
//       const title = "You corrected " +  + " out of " + + " errors.";
//       return (
//         <div>
//           <Head>
//             <title>Grammar</title>
//             <link rel="icon" href="/favicon.ico" />
//           </Head>
//             <div className = {styles.container}>
//                 <header>
//                 <h1 className = {styles.h1}>Grammar Question</h1>
//                 <nav className = {styles.navBar}> 
//                     <a href = "grammar" className={styles.active + ' '+ styles.a}>Grammar</a>
//                     <a href = "programming" className={styles.a}>Programming</a>
//                     <a href = "trace" className={styles.a}>Trace</a>
//                 </nav>
//                 </header>
//                 <article className = {styles.article}>
//                   <h2 className = {styles.h2} >Fix the grammatical errors that are present in the following code. </h2>
//                   <textarea rows= "30" className={styles.textarea} onChange={(text) => this.setState({answer: text})}/>
//                   <button className = {styles.button} onClick = {()  => this.setState({answered: false})} > Next Question </button>
//                 </article>
//             </div>
//           </div> );
//     }
//     return (
//       <div>
//         <Head>
//           <title>Grammar</title>
//           <link rel="icon" href="/favicon.ico" />
//         </Head>
//           <div className = {styles.container}>
//               <header>
//               <h1 className = {styles.h1}>Grammar Question</h1>
//               <nav className = {styles.navBar}> 
//                   <a href = "grammar" className={styles.active + ' '+ styles.a}>Grammar</a>
//                   <a href = "programming" className={styles.a}>Programming</a>
//                   <a href = "trace" className={styles.a}>Trace</a>
//               </nav>
//               </header>
//               <article className = {styles.article}>
//                 <h2 className = {styles.h2} >Fix the grammatical errors that are present in the following code. </h2>
//                 <LinedTextArea></LinedTextArea>
//                 <button className = {styles.button} onClick = {()  => this.setState({answered: true})} > Submit </button>
//               </article>
//           </div>
//         </div>
//     );
//   }
// }
