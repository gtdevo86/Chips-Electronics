import React from 'react'
import { Offcanvas } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const MenuOffcanvas = (props) => {
  return (
    <Offcanvas show={props.show} onHide={props.onHide} className='bg-primary'>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Components</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div className='menu-links'>
          <p>
            <Link
              to='/component?c=Processors&brand=&filter1=&filter2=&filter3=&filter4=&filter5=&minStock=0'
              onClick={props.onHide}
            >
              Processors
            </Link>
          </p>
          <p>
            <Link
              to='/component?c=Memory&brand=&filter1=&filter2=&filter3=&filter4=&filter5=&minStock=0'
              onClick={props.onHide}
            >
              Memory
            </Link>
          </p>
          <p>
            <Link
              to='/component?c=Motherboards&brand=&filter1=&filter2=&filter3=&filter4=&filter5=&minStock=0'
              onClick={props.onHide}
            >
              Motherboards
            </Link>
          </p>
          <p>
            <Link
              to='/component?c=Video Cards&brand=&filter1=&filter2=&filter3=&filter4=&filter5=&minStock=0'
              onClick={props.onHide}
            >
              Video Cards
            </Link>
          </p>
          <p>
            <Link
              to='/component?c=Storage&brand=&filter1=&filter2=&filter3=&filter4=&filter5=&minStock=0'
              onClick={props.onHide}
            >
              Storage
            </Link>
          </p>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  )
}

export default MenuOffcanvas
