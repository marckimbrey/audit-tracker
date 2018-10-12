import React from 'react';
import TableRow from './TableRow'
import {formatDate} from './TableRow'

export default (props) => {
  if(props.bins) {
    const orderedBins = props.bins.sort((a,b) => {
      return new Date(a.lastAudit) - new Date(b.lastAudit)
    })
    this.tableRows = orderedBins.map((bin,i) => {
      return <TableRow bin={bin} key={i}/>
    })
  }
  if(props.binHistory) {
    this.historyRows = props.binHistory.auditHistory.map((auditDate, i) => {
      return (
        <tr key={i}>
          <td><button  onClick={()=>props.deleteAudit(props.binHistory, auditDate)}>X</button></td>
          <td>{formatDate(auditDate)}</td>
        </tr>
      )
    })
  }
  switch(props.type) {
    case 'history':
      return (
        <table>
          <thead>
            <tr>
              <th>Delete</th>
              <th>Audit Date</th>
            </tr>
          </thead>
          <tbody>
            {this.historyRows}
          </tbody>
        </table>
      )

    default:
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
}
