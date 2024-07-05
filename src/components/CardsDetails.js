import { Table } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { ADD, DLT, REMOVE } from '../redux/actions/action'

const CardsDetails = () => {

  const [data, setData] = useState([])

  const {id} = useParams()

  const history = useNavigate()

  const dispatch = useDispatch()

  const getdata = useSelector((state) => state.cartreducer.carts)

  const compare = () => {
    let comparedata = getdata.filter((e)=>{
      return e.id == id
    })
    console.log('comparedata', comparedata);
    setData(comparedata)
  }

  const send = (e) => {
    dispatch(ADD(e))
  }

  const deleted = (id) => {
    dispatch(DLT(id))
    history('/')
  }

  const remove = (item) => {
    dispatch(REMOVE(item))
  }

  useEffect(()=>{
    compare()
  }, [id])

  return (
    <>
      <div className='container mt-2'>
        <h2 className='text-center'> Iteams Details Page </h2>
        <section className='container mt-3'>
          <div className='iteamsdetails'>
            {
              data.map((e) => {
                return (
                  <>
                  <div className='items_img'>
                    <img src={e.imgdata} />
                  </div>

                  <div className='details'>
                    <Table>
                      <tr>
                        <td>
                          <p> <strong>Restaurant</strong> : {e.rname} </p>
                          <p> <strong>Price</strong> : {e.price}$</p>
                          <p> <strong>Dishes</strong> : {e.address}</p>
                          <p> <strong>Total</strong> : {e.price * e.qnty}$</p>
                          <div className='mt-5 d-flex justify-content-between align-items-center' 
                            style={{width: 100, cursor:'pointer', background:'#ddd', color:'#111'}}
                          >
                            <span style={{fontSize:24}} onClick={e.qnty <= 1 ? () => deleted(e.id) : ()=> remove(e)}>-</span>
                            <span style={{fontSize:22}}> {e.qnty} </span>
                            <span style={{fontSize:24}} onClick={()=> send(e)}>+</span>
                          </div>
                        </td>
                        <td>
                          <p> <strong>Rating</strong> : <span style={{background: 'green', color:'white', padding:'2px 5px', borderRadius:'5px'}}>
                            {e.rating} <i class="fa-solid fa-star"></i>
                            </span>
                          </p>
                          <p> <strong>Order Review</strong> : <span> {e.somedata} </span></p>
                          <p> <strong>Remove</strong> : <span> <i class="fa-solid fa-trash" onClick={() => deleted(e.id)} style={{color: 'red'}}></i> </span></p>
                        </td>
                      </tr>
                    </Table>
                  </div>
                  </>
                )
              })
            }
            
          </div>
        </section>
      </div>
    </>
  )
}

export default CardsDetails