import React from 'react';
import TableRow from './TableRow'

export default (props) => {
  if(props.bins) {

    this.tableRows = props.bins.map((bin,i) => {
      return <TableRow bin={bin} key={i}/>
    })
  }
  return (
    <table>
      <thead>
        <tr>
          <th>Bin</th>
          <th>Last Audit</th>
          <th>History</th>
        </tr>
      </thead>
      <tbody>
        {this.tableRows}
      </tbody>
    </table>
  )
}
