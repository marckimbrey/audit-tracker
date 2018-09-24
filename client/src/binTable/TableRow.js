import React from 'react';

export default (props) => {

  return (
    <tr>
      <td>{props.bin.bin}</td>
      <td>{props.bin.lastAudit}</td>
      <td>audit history</td>
    </tr>
  )
}
