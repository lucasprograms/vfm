export const buildBuildingPopupContent = (feature) => {
  const { MUNICIPALI, ZIPCODE, ADDRESS, LATITUDE, LONGITUDE } = feature.properties
  
  return (
    `
      <p>${ADDRESS}, ${MUNICIPALI}, ${ZIPCODE}</p>
      <p>${LATITUDE}, ${LONGITUDE}</p>
    `
  )
}

export const buildFiberPopupContent = (feature) => {
  const { OWNER, LENGTH_MET } = feature.properties

  return (
    `
      <p>Owner: ${OWNER}</p>
      <p>Length: ${Math.round(LENGTH_MET)} meters</p>
    `
  )
}