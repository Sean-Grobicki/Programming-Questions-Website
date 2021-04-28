import styles from '../../styles/global.module.css'
import { useState } from 'react';

export default function InputTraceTable(props) 
{
    const [var1Values,setVar1Values] = useState([null,null,null,null,null,null]);
    const [var2Values,setVar2Values] = useState([null,null,null,null,null,null]);
    const [var3Values,setVar3Values] = useState([null,null,null,null,null,null]);
    
    const addInput = (index,varNumber,value) =>
    {
        if(varNumber === 1)
        {
            var tempArray = var1Values;
            tempArray[index] = value;
            setVar1Values(tempArray);
        }
        else if(varNumber === 2)
        {
            var tempArray = var2Values;
            tempArray[index] = value;
            setVar2Values(tempArray);
        }
        else if(varNumber === 3)
        {
            var tempArray = var3Values;
            tempArray[index] = value;
            setVar3Values(tempArray);
        }
        props.handleInput(var1Values,var2Values,var3Values);
    }
    return (
        <div className={props.tableStyle}>
            <table className={styles.table} >
                <thead>
                    <tr className={styles.tableHeaderRow}>
                        <td className = {styles.tableHeaderText}>Counter</td>
                        <td className = {styles.tableHeaderText}>{props.table[0].variableName}</td>
                        <td className = {styles.tableHeaderText}>{props.table[1].variableName}</td>
                        <td className = {styles.tableHeaderText}>{props.table[2].variableName}</td>
                    </tr>
                </thead>
                <tbody>
                {props.table[0].variableStages.map((variable,index) => 
                    <InputTraceTableRow table={props.table} index ={index} addInput={addInput}/>
                )}
                </tbody>
            </table>
        </div>
    );
}



export function InputTraceTableRow(props) 
{
    const stageNumber = props.index;
    return(
    <tr className ={styles.tableRow}>
        <td className={styles.tableCell}> {stageNumber}</td>
        <td className ={styles.tableCell}><input onChange={(eve) => props.addInput(stageNumber,1,eve.target.value) }/></td>
        <td className ={styles.tableCell}><input onChange={(eve) => props.addInput(stageNumber,2,eve.target.value)}/></td>
        <td className ={styles.tableCell}><input onChange={(eve) => props.addInput(stageNumber,3,eve.target.value)}/></td>
    </tr>);
}
