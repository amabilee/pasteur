import React from 'react'

function Title({parentToChild}) {

  return (
    <div className="headContainerText">
      <h1 className='heading-4 margin-bottom-5'>{parentToChild[0]}</h1>
      <h2 className='body-light text-color-5'>{parentToChild[1]}</h2>
    </div>
  )
}

export default Title