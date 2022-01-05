import React, { useState } from 'react'
import { Button, Col, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const SearchBox = () => {
  const navigate = useNavigate()
  const [keyword, setKeyword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      navigate(`/search?q=${keyword}`)
    } else {
      navigate('/')
    }
  }
  return (
    <Form onSubmit={submitHandler} className='row col'>
      <Col className='col-8 col-md-9 col-lg-8 col-xl-9'>
        <Form.Control
          type='text'
          name='q'
          onChange={(e) => setKeyword(e.target.value)}
          placeholder='Seartch Products...'
          className='mr-sm-2 ml-sm-5'
        ></Form.Control>
      </Col>
      <Col className='col-1'>
        <Button type='submit' variant='outline-success' className='p-2'>
          Search
        </Button>
      </Col>
    </Form>
  )
}

export default SearchBox
