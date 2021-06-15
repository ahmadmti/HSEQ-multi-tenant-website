import React from 'react'
import CardCover from '../../../components/RestaurantPanel/SharedComponent/CardCover'
import Typography from '@material-ui/core/Typography'
import ComanyContext from '../../../context/CompanyContext'
import { useTranslation } from 'react-i18next'

export default function Profile() {
  const company = React.useContext(ComanyContext)
  const { t } = useTranslation()

  return (
    <CardCover>
      <div>
        {/* <Typography color="primary" variant="h4" component="h2">
          Welcome here {company.name ? 'To ' + company.name : null}
        </Typography> */}
        <div className="container">
          <div className="main-body">
            <div className="row gutters-sm">
              <div className="col-md-4 mb-3">
                <div className="card" style={{ height: '100%' }}>
                  <div className="card-body">
                    <div className="d-flex flex-column align-items-center text-center">
                      <img
                        src={`/public/images/company/${company.logo}`}
                        alt="Logo"
                        className="rounded-circle"
                        width="150"
                      />
                      <div className="mt-3">
                        <h4>{company.name ? company.name : null}</h4>
                        <p className="text-secondary mb-1">
                          {/* {company.name ?  company.name : null} */}
                        </p>
                        <p className="text-muted font-size-sm">
                          {/* {company.name ? company.name : null} */}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-8">
                <div className="card mb-3">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">{t('restaurant_name')}</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        {company.name ? company.name : null}
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Email</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        {company.email ? company.email : null}
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">{t('phone.label')}</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        {company.phone_number ? company.phone_number : null}
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">{t('zipCode.label')}</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        {company.zip_code ? company.zip_code : null}
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">{t('address')}</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        {company.address ? company.address : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div
                className="card mt-3"
                style={{ width: '-webkit-fill-available', margin: '1%' }}
              >
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-globe mr-2 icon-inline"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="2" y1="12" x2="22" y2="12"></line>
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                      </svg>
                      {t('Website')}
                    </h6>
                    <span className="text-secondary">
                      {window.location.origin.toString()}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CardCover>
  )
}
