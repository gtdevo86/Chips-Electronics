import React from 'react'

const DescriptionTab = (props) => {
  return (
    <div>
      <h1>Description:</h1>
      {props.description}
      <h1>Specifications:</h1>
      <ul>
        {props.tagArray.map((x, i) => (
          <React.Fragment key={i}>
            {x && x.name && (
              <li>
                {x.name}: {x.value}
              </li>
            )}
          </React.Fragment>
        ))}
      </ul>
    </div>
  )
}

export default DescriptionTab
