import { readString } from 'react-papaparse'
const corsProxy_URL = 'https://api.allorigins.win/get?url='
const API_URL = 'https://results.elections.virginia.gov/vaelections/2021%20November%20General/Site/Statistics/Absentee.csv'
const URL = corsProxy_URL + API_URL

import { absenteeData } from './types';

/*
{
  AgeRange: "18-24",
  ApplicationType: "Federal Post Cards Application – FPCA"
  CongressionalDistrict: "02"
  Gender: "F"
  LocalityName: "ACCOMACK COUNTY"
  Reason: "6A - Military - Domestic"
  ReceiptType: ""
  TheCount: "2"
}
*/

const districts = {
  1: {
    drawDate: '2017-01-03',
    wikipedia: 'https://en.wikipedia.org/wiki/Virginia%27s_1st_congressional_district',
    representative: 'Rob Wittman',
    representativeParty: 'Republican',
    cookPVI: 'R+6',
    urbanDistribution: 0.6954,
    ruralDistribution: 0.3046,
    population: 824942,
    populationYear: 2019,
    medianHouseholdIncome: 90181,
    ethnicity: {
      white: 0.7201,
      black: 0.1586,
      hispanic: 0.0935,
      asian: 0.0357,
      native: 0.0043
    },
    cities: [ 'Fredericksburg' ]
  }
}

const mungeAbsenteeData = (data: any): absenteeData => ({
  ageRange: data.AgeRange,
  congressionalDistrict: Number(data.CongressionalDistrict),
  gender: data.Gender,
  locality: data.LocalityName?.toLowerCase(),
  reason: data.Reason,
  receiptType: data.ReceiptType || 'Outstanding',
  count: Number(data.TheCount)
})

const fetchData = async () => {
  const { contents } = await fetch(
    URL,
    {
      headers: {
        'Content-Type': 'text/csv',
      },
    },
  ).then(res => res.json())

  const data = (readString(
    contents, 
    { 
      header: true,
      skipEmptyLines: true
    } as any
  ) as any).data.map(mungeAbsenteeData)

  console.log(data)
  
  return data
}

export default fetchData
export { districts, API_URL as URL }
