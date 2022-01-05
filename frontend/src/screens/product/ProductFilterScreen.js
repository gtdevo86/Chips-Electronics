import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Accordion, Form, Button } from 'react-bootstrap'
import Product from '../../components/ProductComponents/Product'
import Message from '../../components/HelperComonents/Message'
import { filterProducts } from '../../actions/productActions'
import { useLocation } from 'react-router-dom'
import Paginate from '../../components/HelperComonents/Paginate'
import queryString from 'query-string'
import filters from '../../helpers/filterModel'

const HomeScreen = () => {
  document.title = 'Welcome to Chips Electronics'
  const dispatch = useDispatch()
  const location = useLocation()
  const parsed = queryString.parse(location.search)
  const component = parsed.c
  const pageNumber = parsed.page || 1
  const tempArray = Array(50).fill(false)

  const productListFiltered = useSelector((state) => state.productListFiltered)
  const { loading, error, products, page, pages } = productListFiltered

  const [brand, setBrand] = useState('') //0
  const [showOnlyInStock, setShowOnlyInStock] = useState(false)
  const [filter1, setFilter1] = useState('') //1
  const [filter2, setFilter2] = useState('') //2
  const [filter3, setFilter3] = useState('') //3
  const [filter4, setFilter4] = useState('') //4
  const [filter5, setFilter5] = useState('') //5
  const [accordianKeys, setAccordianKeys] = useState('')
  var checkIndex = 0

  const [arrayCheck, setArrayCheck] = useState(tempArray)

  useEffect(() => {
    let items = arrayCheck
    for (let x = 0; x < arrayCheck.length; x++) {
      items[x] = false
    }
    setArrayCheck(items)
    setBrand('')
    setFilter1('')
    setFilter2('')
    setFilter3('')
    setFilter4('')
    setFilter5('')
    setShowOnlyInStock(false)

    dispatch(
      filterProducts(
        {
          category: component,
          brand: '',
          filter1: '',
          filter2: '',
          filter3: '',
          filter4: '',
          filter5: '',
          minStock: 0,
        },
        pageNumber
      )
    )
  }, [dispatch, component, pageNumber, arrayCheck])

  const getFilterArray = () => {
    if (component === 'Processors') return filters[0]
    else if (component === 'Memory') return filters[1]
    else if (component === 'Motherboards') return filters[2]
    else if (component === 'Video Cards') return filters[3]
    else if (component === 'Storage') return filters[4]
  }
  const pageFilterArray = getFilterArray()

  const filterHandler = async (e) => {
    dispatch(
      filterProducts(
        {
          category: component,
          brand: brand,
          filter1: filter1,
          filter2: filter2,
          filter3: filter3,
          filter4: filter4,
          filter5: filter5,
          minStock: showOnlyInStock ? 1 : 0,
        },
        pageNumber
      )
    )
  }

  const handleChange = (i, v, x) => (e) => {
    let tempstring = ''
    const tempModifer = v + ','
    switch (i) {
      case 0:
        tempstring = brand
        break
      case 1:
        tempstring = filter1
        break
      case 2:
        tempstring = filter2
        break
      case 3:
        tempstring = filter3
        break
      case 4:
        tempstring = filter4
        break
      case 5:
        tempstring = filter5
        break
      default:
        break
    }

    let items = arrayCheck
    items[x] = e.target.checked

    setArrayCheck(items)

    if (e.target.checked) tempstring = tempstring + tempModifer
    else tempstring = tempstring.replace(tempModifer, '')

    switch (i) {
      case 0:
        setBrand(tempstring)
        break
      case 1:
        setFilter1(tempstring)
        break
      case 2:
        setFilter2(tempstring)
        break
      case 3:
        setFilter3(tempstring)
        break
      case 4:
        setFilter4(tempstring)
        break
      case 5:
        setFilter5(tempstring)
        break
      default:
        break
    }
  }
  return (
    <>
      <h1>Latest Products</h1>

      {loading ? (
        <></>
      ) : error ? (
        <Message variant='danger '>{error}</Message>
      ) : (
        <>
          <Row>
            <Col xs={3}>
              <div className='d-grid gap-2'>
                <Button className='btn-sm' onClick={() => filterHandler()}>
                  Filter
                </Button>
              </div>
              <Form.Check
                type='switch'
                id='instock'
                defaultChecked={showOnlyInStock}
                onChange={(e) => setShowOnlyInStock(e.target.checked)}
                label='Show only in stock'
                className='py-3'
              />

              {pageFilterArray[1].map((arrayA, indexA) => (
                <Accordion defaultActiveKey='0'>
                  <Accordion.Item eventKey='0'>
                    <Accordion.Header>{arrayA[0]}</Accordion.Header>
                    <Accordion.Body>
                      {arrayA[1].map((arrayB, indexB) => (
                        <>
                          <Form.Check
                            type='checkbox'
                            label={arrayB.split('-c')[0]}
                            defaultChecked={arrayCheck[++checkIndex]}
                            onChange={handleChange(indexA, arrayB, checkIndex)}
                          />
                        </>
                      ))}
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              ))}
            </Col>

            <Col>
              <Row>
                {products.length === 0 && (
                  <Message variant='info '>No Products found</Message>
                )}
                {products.map((product) => (
                  <Col key={product._id} sm={12} md={12} lg={5} xl={4}>
                    <Product product={product} />
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
          <Paginate pages={pages} page={page} keyword={'ADD FILTER'} />
        </>
      )}
    </>
  )
}

export default HomeScreen
