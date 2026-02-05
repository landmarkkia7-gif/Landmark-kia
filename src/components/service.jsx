import React from 'react'
import ServiceCenterDetails from './ServiceCenterDetails'

function service() {
  return (
    <div><ServiceCenterDetails
      title="Landmark Kia Medipally"
      image="/images/medipelly.jpeg"
      address="Survey No. 26, MRR Estates, H.no - 17-60/A, opp. CPRI ROAD, Medipally, Peerzadiguda, Hyderabad, Telangana 500098"
      time="Mon – Sun 9AM – 7PM"
      phone="91000 75700"
      email="anjani.n@landmark-kia.in"
      detailsLink="https://www.google.com/maps/place/Kia+Car+Showroom+-+Landmark+Kia+Medipally/@17.4123485,78.4610453,12z/data=!4m10!1m2!2m1!1skia+landmark+uppal!3m6!1s0x3bcb9fb40cc77e99:0x7bd26b8529e6697a!8m2!3d17.4123485!4d78.6134806!15sChJraWEgbGFuZG1hcmsgdXBwYWwiA4gBAVoUIhJraWEgbGFuZG1hcmsgdXBwYWySAQpjYXJfZGVhbGVy4AEA!16s%2Fg%2F11w9nzt4bs?entry=ttu&g_ep=EgoyMDI2MDEyOC4wIKXMDSoASAFQAw%3D%3D"

    />
      <ServiceCenterDetails
        title="Landmark Kia Attapur"
        image="/images/atthapur.jpeg"
        address="Door No 4-3-161 MSurvey No 497, 501 part, Rajendranagar Mandal 498 / 499 & 500/1, Attapur, Telangana 500008 Attapur, Hyderabad, Telangana 500008"
        time="Mon – Sun 9AM – 6PM"
        phone="9100075700"
        email="anjani.n@landmark-kia.in"
        detailsLink="https://www.google.com/maps/place/Kia+Car+Service+-+Landmark+Kia+Attapur/data=!4m2!3m1!1s0x0:0x7b5d2254b3289330?sa=X&ved=1t:2428&ictx=111"

      />
      <ServiceCenterDetails
        title="Kompally"
        image="/images/Landmark_service.webp"
        address="Door No. 7-67/2, Survey No. 19 & 20, Adjacent Lane of HP Petrol Pump,
Kompally, Hyderabad, Telangana – 500100"
        time="Mon – Sun 9AM – 7PM"
        phone="9100075700"
        email="anjani.n@landmark-kia.in"
        detailsLink="/"

      />
    </div>
  )
}

export default service