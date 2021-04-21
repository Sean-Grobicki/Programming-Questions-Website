import styles from '../../styles/global.module.css'

export default function TraceTable(props) 
{
    return (
        <div className={props.tableStyle}>
            <table className={styles.table} >
                <thead>
                    <tr className={styles.tableHeaderRow}>
                        <td className = {styles.tableHeaderText}>Counter</td>
                        <td className = {styles.tableHeaderText}>{props.varNames[0]}</td>
                        <td className = {styles.tableHeaderText}>{props.varNames[1]}</td>
                        <td className = {styles.tableHeaderText}>{props.varNames[2]}</td>
                    </tr>
                </thead>
                <tbody>
                {props.var1Values.map((variable,index) => 
                    <TraceTableRow var1Values={props.var1Values} var2Values={props.var2Values} var3Values={props.var3Values} index ={index}/>
                )}
                </tbody>
            </table>
        </div>
    );
}



function TraceTableRow(props) 
{
    const stageNumber = props.index;
    const variable1 = props.var1Values[props.index];
    const variable2 = props.var2Values[props.index];
    const variable3 = props.var3Values[props.index];
    return(
    <tr className ={styles.tableRow}>
        <td className={styles.tableCell}> {stageNumber}</td>
        <td className ={styles.tableCell}>{variable1}</td>
        <td className ={styles.tableCell}>{variable2}</td>
        <td className ={styles.tableCell}>{variable3}</td>
    </tr>);
}

module.exports = {TraceTable: TraceTable,}