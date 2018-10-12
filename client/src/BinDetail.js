import React from 'react';
import Table from './binTable/Table';
import {formatDate, findDaysOld} from './binTable/TableRow';
import {Link} from 'react-router-dom';


export default (props) => {

  if(props.bin) {
  const bin = props.bin.filter(x => x._id === props.match.params.id)[0]
    return (
      <div>
        <Link to='/'><button>Home</button></Link>
        <h4>{bin.bin}</h4>
        <div><b>Last Audit: </b>{formatDate(bin.lastAudit)}</div>
        <div><b>Days Old: </b>{findDaysOld(bin.lastAudit)}</div>
        <Table type='history'  binHistory={bin} deleteAudit={props.deleteAudit}/>
      </div>
    )
  }
  return(<div>Loading...</div>)
}
