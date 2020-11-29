import React, { useEffect, useState, useCallback } from 'react';
import {
  ShowButton, Product, ProductWrapper, Wrapper,
  ImageProduct, CategoryButton, HeadWrapper, CategoryName, Loading, StockNotification
} from './style.js'
import Loader from 'react-loader-spinner';
import logo from './img/logo.png'
import logo1 from './img/logo1.png'
import logo2 from './img/logo2.png'
import sold_out from './img/sold_out.png'



function App() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [items, setItems] = useState([])
  const [categoryName, setCategoryName] = useState('')
  const [listUnavailable, setListUnavailable] = useState([])
  const [limit, setLimit] = useState(20)
  const [jacketBoolean, setJacketBoolean] = useState(true)
  const [shirtBoolean, setShirtBoolean] = useState(false)
  const [accessoriesBoolean, setAccessoriesBoolean] = useState(false)
  const API = 'https://bad-api-assignment.reaktor.com/'
  const accessories_query = 'products/accessories'
  const shirts_query = 'products/shirts'
  const jackets_query = 'products/jackets'
  const names = ['availability/derp', 'availability/reps', 'availability/abiplos', 'availability/xoon', 'availability/nouke']
  const requests = names.map(name => fetch(`https://bad-api-assignment.reaktor.com/${name}`))
  let expiredArr = []

  const fetchAPI = useCallback(async (query_string) => {
    let response = await fetch(API + query_string)
    response = await response.json()
    setItems(response)
    setIsLoaded(true)
    //Set boolean to change category in storage image
    if (query_string === accessories_query) {
      setAccessoriesBoolean(true)
      setShirtBoolean(false)
      setJacketBoolean(false)
    } else if (query_string === shirts_query) {
      setAccessoriesBoolean(false)
      setShirtBoolean(true)
      setJacketBoolean(false)
    } else {
      setAccessoriesBoolean(false)
      setShirtBoolean(false)
      setJacketBoolean(true)
    }
    //Set boolean to change category name
    if (query_string === accessories_query) {
      setCategoryName('ACCESSORIES')
    } else if (query_string === shirts_query) {
      setCategoryName('SHIRTS')
    } else {
      setCategoryName('JACKETS')
    }
  }, [])




  useEffect(() => {
    fetchAPI(jackets_query)
    Promise.all(requests)
      .then(function (responses) {
        return Promise.all(responses.map(function (response) {
          return response.json();
        }));
      }).then(async function (data) {
        let result1 = await data[0].response
        let result2 = await data[1].response
        let result3 = await data[2].response
        let result4 = await data[3].response
        let result5 = await data[4].response
        result1.forEach(item => {
          if (item.DATAPAYLOAD.includes('OUTOFSTOCK')) {
            expiredArr.push(item.id)
          }
        });
        result2.forEach(item => {
          if (item.DATAPAYLOAD.includes('OUTOFSTOCK')) {
            expiredArr.push(item.id)
          }
        });
        result3.forEach(item => {
          if (item.DATAPAYLOAD.includes('OUTOFSTOCK')) {
            expiredArr.push(item.id)
          }
        });
        result4.forEach(item => {
          if (item.DATAPAYLOAD.includes('OUTOFSTOCK')) {
            expiredArr.push(item.id)
          }
        });
        result5.forEach(item => {
          if (item.DATAPAYLOAD.includes('OUTOFSTOCK')) {
            expiredArr.push(item.id)
          }
        });
        setListUnavailable(expiredArr)
      })
  }, [])


  if (!isLoaded) {
    return (
      <Loading>
        <Loader type="TailSpin" color="#be9063" height="300" width="300" />
      </Loading>
    )
  } else {
    return (
      <Wrapper>
        <HeadWrapper>
          <CategoryName>{categoryName} CATEGORY</CategoryName>
          <CategoryButton onClick={() => fetchAPI(shirts_query)}>Shirts</CategoryButton>
          <CategoryButton onClick={() => fetchAPI(accessories_query)}>Accessories</CategoryButton>
          <CategoryButton onClick={() => fetchAPI(jackets_query)}>Jackets</CategoryButton>
        </HeadWrapper>
        {!accessoriesBoolean && !shirtBoolean && jacketBoolean &&
          <ProductWrapper>
            {items.slice(0, limit ? limit : items.length).map(item => {
              if (listUnavailable.includes(item.id.toUpperCase())) {
                item.available = false
              }
              if (item.available === false) {
                return (
                  <Product key={item.id}>
                    <ImageProduct className="product-image" src={logo} />
                    <StockNotification src={sold_out} />
                    {item.name}<br />
                    <b>${item.price}</b>
                  </Product>
                )
              } else {
                return (
                  <Product key={item.id}>
                    <ImageProduct className="product-image" src={logo} />
                    {item.name}<br />
                    <b>${item.price}</b>
                  </Product>
                )
              }
            })}
          </ProductWrapper>
        }
        {!accessoriesBoolean && shirtBoolean && !jacketBoolean &&
          <ProductWrapper>
            {items.slice(0, limit ? limit : items.length).map(item => {
              if (listUnavailable.includes(item.id.toUpperCase())) {
                item.available = false
              }
              if (item.available === false) {
                return (
                  <Product key={item.id}>
                    <ImageProduct className="product-image" src={logo1} />
                    <StockNotification src={sold_out} />
                    {item.name}<br />
                    <b>${item.price}</b>
                  </Product>
                )
              } else {
                return (
                  <Product key={item.id}>
                    <ImageProduct className="product-image" src={logo1} />
                    {item.name}<br />
                    <b>${item.price}</b>
                  </Product>
                )
              }
            })}
          </ProductWrapper>
        }
        {accessoriesBoolean && !shirtBoolean && !jacketBoolean &&
          <ProductWrapper>
            {items.slice(0, limit ? limit : items.length).map(item => {
              if (listUnavailable.includes(item.id.toUpperCase())) {
                item.available = false
              }
              if (item.available === false) {
                return (
                  <Product key={item.id}>
                    <ImageProduct className="product-image" src={logo2} />
                    <StockNotification src={sold_out} />
                    {item.name}<br />
                    <b>${item.price}</b>
                  </Product>
                )
              } else {
                return (
                  <Product key={item.id}>
                    <ImageProduct className="product-image" src={logo2} />
                    {item.name}<br />
                    <b>${item.price}</b>
                  </Product>
                )
              }
            })}
          </ProductWrapper>
        }

        <ShowButton onClick={() => setLimit(limit + 5)}>View more</ShowButton>
      </Wrapper>
    );
  }
}

export default App;
