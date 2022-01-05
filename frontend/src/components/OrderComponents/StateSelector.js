import React from 'react'
import { Form } from 'react-bootstrap'

const StateSelector = (props) => {
  function handleChange(event) {
    props.onChange(event.target.value)
  }

  return (
    <Form.Select
      onChange={handleChange}
      value={props.value}
      disabled={props.disabled}
      required
    >
      <option value=''>State</option>
      <option value='AK'>Alaska</option>
      <option value='AL'>Alabama</option>
      <option value='AR'>Arkansas</option>
      <option value='AZ'>Arizona</option>
      <option value='CA'>California</option>
      <option value='CO'>Colorado</option>
      <option value='CT'>Connecticut</option>
      <option value='DC'>District of Columbia</option>
      <option value='DE'>Delaware</option>
      <option value='FL'>Florida</option>
      <option value='GA'>Georgia</option>
      <option value='HI'>Hawaii</option>
      <option value='IA'>Iowa</option>
      <option value='ID'>Idaho</option>
      <option value='IL'>Illinois</option>
      <option value='IN'>Indiana</option>
      <option value='KS'>Kansas</option>
      <option value='KY'>Kentucky</option>
      <option value='LA'>Louisiana</option>
      <option value='MA'>Massachusetts</option>
      <option value='MD'>Maryland</option>
      <option value='ME'>Maine</option>
      <option value='MI'>Michigan</option>
      <option value='MN'>Minnesota</option>
      <option value='MO'>Missouri</option>
      <option value='MS'>Mississippi</option>
      <option value='MT'>Montana</option>
      <option value='NC'>North Carolina</option>
      <option value='ND'>North Dakota</option>
      <option value='NE'>Nebraska</option>
      <option value='NH'>New Hampshire</option>
      <option value='NJ'>New Jersey</option>
      <option value='NM'>New Mexico</option>
      <option value='NV'>Nevada</option>
      <option value='NY'>New York</option>
      <option value='OH'>Ohio</option>
      <option value='OK'>Oklahoma</option>
      <option value='OR'>Oregon</option>
      <option value='PA'>Pennsylvania</option>
      <option value='PR'>Puerto Rico</option>
      <option value='RI'>Rhode Island</option>
      <option value='SC'>South Carolina</option>
      <option value='SD'>South Dakota</option>
      <option value='TN'>Tennessee</option>
      <option value='TX'>Texas</option>
      <option value='UT'>Utah</option>
      <option value='VA'>Virginia</option>
      <option value='VT'>Vermont</option>
      <option value='WA'>Washington</option>
      <option value='WI'>Wisconsin</option>
      <option value='WV'>West Virginia</option>
      <option value='WY'>Wyoming</option>
    </Form.Select>
  )
}

export default StateSelector