export default function Table(errors) 
{
    return (
        <div>
            <table>
                
                <TableRow err={} correct={}/>
            </table>
        </div>
    );
}



function TableRow(err,correct) 
{
    var correctedText;
    if (correct)
    {
        correctedText = "Y";
    }   
    else
    {
        correctedText = "N";
    }
    return(
    <tr>
        <td>{err.description}</td>
        <td>{err.lineNum}</td>
        <td>{err.linePos}</td>
        <td>{correctedText}</td>
    </tr>);
}

