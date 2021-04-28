import styles from '../../styles/global.module.css'

export default function MarkingTable(props) 
{
    return (
        <div className={props.tableStyle}>
            <table className={styles.table} >
                <thead>
                    <tr className={styles.tableHeaderRow}>
                        <td className = {styles.tableHeaderText}>Operation Type</td>
                        <td className = {styles.tableHeaderText}>JavaCode</td>
                        <td className = {styles.tableHeaderText}>Included</td>
                    </tr>
                </thead>
                <tbody>
                    {props.operations.map(op => <MarkingTableRow op={op}/>)}
                </tbody>
            </table>
        </div>
    );
}



export function MarkingTableRow(props) 
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
    <tr className ={styles.tableRow}>
        <td className={styles.tableCell}> {props.op.operationType}</td>
        <td className ={styles.tableCell}>{props.op.javaCode}</td>
        <td className ={styles.tableCell}>{includedText}</td>
    </tr>);
}
