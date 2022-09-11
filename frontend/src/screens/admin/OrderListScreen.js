import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/HelperComonents/Message'
import { listOrders } from '../../actions/orderActions'
import Loader from '../../components/Loader'

const OrderListScreen = () => {
  document.title = 'Order List'
  const dispatch = useDispatch()

  const orderList = useSelector((state) => state.orderList)
  const { loading, error, orders } = orderList

  useEffect(() => {
    dispatch(listOrders())
  }, [dispatch])

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  return (
    <>
      <h1>Orders</h1>
      {loading ? (
        <Loader></Loader>
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>DELIVERY STATUS</th>
              <th style={{ textAlign: 'right' }}>TOTAL</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>

                <td>{order.user ? order.user._id : 'No user'}</td>

                <td>{order.createdAt.substring(0, 10)}</td>

                <td>{order.deliveryStatus}</td>

                <td style={{ textAlign: 'right' }}>${addDecimals(order.total)}</td>

                <td style={{ textAlign: 'center' }}>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button className='btn-sm'>Details</Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default OrderListScreen
