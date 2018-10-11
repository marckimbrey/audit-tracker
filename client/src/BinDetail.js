import React from 'react';

export default (props) => {
  console.log(props)
  return (
    <div>
      <h2>{props.bin[0]._id}</h2>
    </div>
  )
}
