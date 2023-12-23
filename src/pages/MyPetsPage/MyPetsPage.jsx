import React from 'react'
import './MyPetsPage.css'
import SearchButton from '../../components/SearchButton/SearchButton'

export default function MyPetsPage() {
  return (
    <div className='my-pets-page-container'>
        <div className='msg-if-no-pets'>
        You don't have any pets
        </div>
        <SearchButton/>
      </div>
  )
}