import styles from '../../styles/stylesheet.module.css'

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
                    {props.errors.map(error => <TableRow err={error} correct={true}/>)}
                </tbody>
            </table>
        </div>
    );
}



function TableRow(props) 
{
    var correctedText;
    if (props.correct)
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
        <td className ={styles.tableCell}>{props.err.lineNum}</td>
        <td className ={styles.tableCell}>{props.err.linePos}</td>
        <td className ={styles.tableCell}>{correctedText}</td>
    </tr>);
}

