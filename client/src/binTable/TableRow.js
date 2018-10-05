import React from 'react';

export default (props) => {
  const formatedDate = formatDate(props.bin.lastAudit)
  const daysOld = findDaysOld(props.bin.lastAudit)



  return (
    <tr className={`days-${daysOld}`}>
      <td>{props.bin.bin}</td>
      <td>{formatedDate}</td>
      <td>{daysOld}</td>
    </tr>
  )
}

function formatDate(dateString) {
  const lastAudit = new Date(dateString)
  const month = lastAudit.getUTCMonth() + 1; //months from 1-12
  const day = lastAudit.getUTCDate();
  const year = lastAudit.getUTCFullYear();
  return `${year}/${month}/${day}`;
}

function findDaysOld(dateString) {
  const dt1 = new Date(dateString)
  const dt2 = new Date();
  return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24))
}
