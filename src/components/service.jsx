import React from 'react'
import ServiceCenterDetails from './ServiceCenterDetails'

function service() {
  return (
    <div><ServiceCenterDetails
      title="Q City Financial District"
      image="https://www.carkia.in/assets/images/Q-city-financial-district-1.jpeg"
      address=" Survey No. 224, Vattinagalupally Village, Financial District, Next To Bombay Exchange, Hyderabad, Telangana - 500075"
      time="Mon – Sun 9AM – 7PM"
      phone=" 7995088847"
      email="crm1@carkia.in"
      detailsLink="/raidurg-details"

    />
      <ServiceCenterDetails
        title="Raidurg – Gachibowli"
        image="https://www.carkia.in/assets/images/kia-service-raidurg.jpg"
        address="Door No - 7-4, Raidurg Navkhalsa Village, Hyderabad"
        time="Mon – Sun 9AM – 7PM"
        phone="7799906839"
        email="crm.raidurg@carkia.in"
        detailsLink="/raidurg-details"

      />
      <ServiceCenterDetails
        title="Kompally"
        image="/images/Landmark_service.webp"
        address="Door No. 7-67/2, Survey No. 19 & 20, Adjacent Lane of HP Petrol Pump,
Kompally, Hyderabad, Telangana – 500100"
        time="Mon – Sun 9AM – 7PM"
        phone="9100075700"
        email="crm.kompally@carkia.in"
        detailsLink="/raidurg-details"

      />
    </div>
  )
}

export default service