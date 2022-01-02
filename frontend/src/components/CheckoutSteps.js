import React from 'react'
import Stepper from 'react-stepper-horizontal'

const CheckoutSteps = (props) => {
  return (
    <Stepper
      steps={[
        { title: 'Shopping Cart' },
        { title: 'Shipping' },
        { title: 'Payment Info' },
        { title: 'Review your Order' },
      ]}
      activeStep={props.step}
    />
  )
}

export default CheckoutSteps
