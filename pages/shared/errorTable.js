import styles from '../../styles/global.module.css'

export default function Table(props) 
{
    return (
        <div className={props.tableStyle}>
            <table className={styles.table} >
                <thead>
                    <tr className={styles.tableHeaderRow}>
                        <th className = {styles.tableHeaderText}>Description</th>
                        <th className = {styles.tableHeaderText}>Line Number</th>
                        <th className = {styles.tableHeaderText}>Line Position</th>
                        <th className = {styles.tableHeaderText}>Corrected</th>
                    </tr>
                </thead>
                <tbody>
                    {props.errors.map(error => <TableRow err={error}/>)}
                </tbody>
            </table>
        </div>
    );
}



function TableRow(props) 
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
    <tr className ={styles.tableRow}>
        <td>{props.err.description}</td>
        <td className ={styles.tableCell}>{props.err.lineNumber}</td>
        <td className ={styles.tableCell}>{props.err.linePosition}</td>
        <td className ={styles.tableCell}>{correctedText}</td>
    </tr>);
}

