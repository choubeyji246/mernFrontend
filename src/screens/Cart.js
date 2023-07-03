import React, { useState } from 'react';
import { useCart, useDispatchCart } from '../components/ContextReducer';

export default function Cart() {
  const data = useCart();
  const dispatch = useDispatchCart();
  const [orderId, setOrderId] = useState('');

  // Handle Razorpay checkout
  const handleCheckOut = async () => {
    try {
      const response = await fetch('https://mernbackend-96yx.onrender.com/api/razorpay/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: data.reduce((total, item) => total + item.price, 0),
          //amount:'1',
          email: localStorage.getItem('userEmail'),
          orderId: new Date().getTime(),
        }),
      });
      const { orderId, razorpayKeyId, amount } = await response.json();
      setOrderId(orderId);

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      document.body.appendChild(script);

      script.onload = () => {
        const options = {
          key: 'rzp_test_JWxfB6ndDJqrtZ',
          amount,
          currency: 'INR',
          name: 'FoodMan',
          description: 'Payment for Food Items',
          order_id: orderId,
          handler: function (response) {
            // Send payment success details to server
            fetch('https://mernbackend-96yx.onrender.com/api/orderData', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                order_data: data,
                email: localStorage.getItem('userEmail'),
                order_date: new Date().toDateString()
              }),
            })
              .then((response) => response.json())
              .then((data) => {
                console.log(data);
                if (data.success) {
                  dispatch({ type: 'DROP' });
                  alert('Payment Successful!');
                } else {
                  alert('Payment Failed!');
                }
              })
              .catch((error) => console.log(error));
          },
          prefill: {
            email: localStorage.getItem('userEmail'),
            name: 'FoodMan',
            contact: '6371334398',
          },
          notes: {
            address: 'Your Delivery Address',
          },
          theme: {
            color: '#3399cc',
          },
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
      };
    } catch (error) {
      console.log(error);
    }
  };
  let totalPrice = data.reduce((total, food) => total + food.price, 0)
  return (
    <div>

      {console.log(data)}
      <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md' >
        <table className='table table-hover '>
          <thead className=' text-success fs-4'>
            <tr>
              <th scope='col' >#</th>
              <th scope='col' >Name</th>
              <th scope='col' >Quantity</th>
              <th scope='col' >Option</th>
              <th scope='col' >Amount</th>
              <th scope='col' ></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr>
                <th scope='row' >{index + 1}</th>
                <td className='text-white' >{food.name}</td>
                <td className='text-white'>{food.qty}</td>
                <td className='text-white'>{food.size}</td>
                <td className='text-white'>{food.price}</td>
                <td ><button  type="button" className="btn p-0 text-white" onClick={() => { dispatch({ type: "REMOVE", index: index }) }}> Delete  </button> </td></tr>
            ))}
          </tbody>
        </table>
        <div><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div>
        <div>
          <button className='btn bg-success mt-5 ' onClick={handleCheckOut} > Check Out </button>
        </div>
      </div>



    </div>
  )
}