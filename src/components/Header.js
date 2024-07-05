/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Badge from '@mui/material/Badge';
import Menu from '@mui/material/Menu';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from '@mui/material';
import { DLT } from '../redux/actions/action';

const Header = () => {

  const [price, setPrice] = useState(0)

  const getdata = useSelector((state) => state.cartreducer.carts)
  console.log(getdata);

  const dispatch = useDispatch()

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleted = (id) => {
    dispatch(DLT(id))
  }

  const total = () => {
    let price = 0
    getdata.map((e,i) => {
      price += e.price * e.qnty
    })
    setPrice(price)
  }

  useEffect(()=>{
    total()
  },[total])

  return (
    <>
       <Navbar bg="dark" data-bs-theme="dark" style={{height: '60px'}}>
        <Container>
          <NavLink to="/" className='text-decoration-none text-light mx-3' >Add To Cart</NavLink>
          <Nav className="me-auto">
            <NavLink to="/" className='text-decoration-none text-light'>Home</NavLink>
          </Nav>

          <Badge badgeContent={getdata.length} color="primary"
            id="demo-positioned-button"
            aria-controls={open ? 'demo-positioned-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <i class="fa-solid fa-cart-shopping text-light" style={{fontSize: 25, cursor: 'pointer'}}></i>
          </Badge>
          
        </Container>

        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          {
            getdata.length ? 
            <div className='card_details' style={{width: '24rem', padding:10}}>
              <Table>
                <thead>
                  <tr>
                    <th>Photo</th>
                    <th>Restaurant Name</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    getdata.map((e)=>{
                      return (
                        <>
                          <tr>
                            <td>
                               <NavLink to={`/cart/${e.id}`} onClick={handleClose}>
                                  <img src={e.imgdata} style={{width: '5rem', height:'5rem'}} />
                               </NavLink>
                            </td>
                            <td>
                              <p> {e.rname} </p>
                              <p> Price: {e.price}$ </p>
                              <p> Quantity: {e.qnty} </p>
                              <p style={{color: 'red', fontSize:20, cursor: 'pointer'}}
                                onClick={() => deleted(e.id)}  
                              >
                                <i className='fas fa-trash smalltrash' ></i>
                              </p>
                            </td>
                            <td className='mt-5' style={{color: 'red', fontSize:20, cursor: 'pointer'}}  onClick={() => deleted(e.id)} >
                              <i className='fas fa-trash largetrash' ></i>
                            </td>
                          </tr>
                        </>
                      )
                    })
                  }
                  <p className='text-center'>Total: {price}$</p>
                </tbody>
              </Table>
            </div> 
            :
             <div className='card_details d-flex justify-content-center align-items-center' style={{width: '18rem', padding: 10, position:'relative'}}>
             <i className='fas fa-close smallclose'
              onClick={handleClose}
              style={{position: 'absolute', top:1, fontSize: 23, right: 20, cursor:'pointer'}}></i>
             <p style={{fontSize:22}}>Your Cart Is Empty</p>
             <i class="fa-solid fa-cart-shopping emptycart_img" style={{fontSize:'2rem', padding:10}}></i>
            </div>
          }
        </Menu>
      </Navbar>
    </>
  )
}

export default Header