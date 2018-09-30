import React from 'react';
import TableRow from './TableRow'

export default (props) => {
  if(props.bins) {
    const orderedBins = props.bins.sort((a,b) => {
      return new Date(a.lastAudit) - new Date(b.lastAudit)
    })
    this.tableRows = orderedBins.map((bin,i) => {
      return <TableRow bin={bin} key={i}/>
    })
  }
  return (
    <table>
      <thead>
        <tr>
          <th>Bin</th>
          <th>Last Audit</th>
          <th>Days Old</th>
        </tr>
      </thead>
      <tbody>
        {this.tableRows}
      </tbody>
    </table>
  )
}
