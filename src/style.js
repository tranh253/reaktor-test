import React from 'react'
import styled from 'styled-components'

export const Wrapper = styled.div`
  padding: 40px;
`
export const HeadWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;

`

export const CategoryName = styled.p`
  font-size: 30px;
  font-weight: medium;
`

export const ImageProduct = styled.img`
  width: 160px;
  height: 160px;
  cursor: pointer;
`
export const CategoryButton = styled.button`
  display: inline-block;
  border-radius: 3px;
  margin: 8px 8px 8px 5px ;
  width: 240px;
  height: 80px;
  background: #be9063;
  color: #132226;
  border: none;
  cursor: pointer;
  
  `
export const Product = styled.div`
  display: flex;
  flex-direction: column;
  height: 200px;
  width: 240px;
  border: 1px solid black;
  padding: 20px 30px 40px 30px;
  margin: 5px;
  word-break: keep-all;
`
export const ProductWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`
export const ShowButton = styled.div`
  display: flex;
  justify-content: center;
  cursor: pointer;
  align-items: center;
  font-size: 25px;
  padding: 10px;
`
export const Loading = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  position:absolute;
  top: 30%;
`
export const StockNotification = styled.img`
  position: absolute;
  margin-left: 190px;
  width: 55px;
`