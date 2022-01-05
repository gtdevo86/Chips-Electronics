import React from 'react'

const DescriptionTab = (props) => {
  //let parsedText = String(props.description).replaceAll('-', ' ')
  //parsedText = String(parsedText).replaceAll(':', ' : ')

  //const tagArray = String(parsedText).split(',')
  return (
    <div>
      <h1>Description:</h1>
      {props.description}
      <h1>Specifications:</h1>
      <ul>
        {props.tagArray.map((x) => (
          <>
            {x && x.name && (
              <li>
                {x.name}: {x.value}
              </li>
            )}
          </>
        ))}
      </ul>
    </div>
  )
}

export default DescriptionTab
