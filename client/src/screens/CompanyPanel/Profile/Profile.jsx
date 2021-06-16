import React from 'react'
import CardCover from '../../../components/CompanyPanel/SharedComponent/CardCover'
import ComanyContext from '../../../context/CompanyContext'

export default function Profile() {
  const company = React.useContext(ComanyContext)

  return (
    <CardCover>
      <div>
        <h1>Profile Page</h1>
      </div>
    </CardCover>
  )
}
