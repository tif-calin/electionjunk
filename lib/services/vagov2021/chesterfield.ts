import { VoteData } from './types'

const corsProxy = 'https://api.allorigins.win/get?url='
const STATE_API_URL = 'https://results.elections.virginia.gov/vaelections/2021%20November%20General/Json/Locality/CHESTERFIELD_COUNTY/Index.json'
const API_URL = 'https://api.chesterfield.gov/api/Registrar/V1.0/ElectionResult/Results/dLuP'

const fetchStateData = async (): Promise<VoteData> => {
  const { contents } = (await fetch(corsProxy + STATE_API_URL).then(res => res.json()))

  const data = JSON.parse(contents)['Races'][0]['Candidates']

  let total, democratic, republican
  total = democratic = republican = 0

  for (let candidate of data) {
    total += candidate['Votes']
    if (candidate['PoliticalParty'] === 'Republican') republican += candidate['Votes']
    else if (candidate['PoliticalParty'] === 'Democratic') democratic += candidate['Votes']
  }

  return {
    parties: {
      democratic,
      republican
    },
    total,
    timestamp: Date.now()
  }
}

const fetchLocalityData = async (): Promise<VoteData> => {
  let data = await fetch(
    API_URL,
    {
      headers: {
        'x-apikey': '70377331-02a4-47f6-9c84-569e137b4f4c',
        'origin': 'https://www.chesterfield.gov',
        'referer': 'https://www.chesterfield.gov/'
      }
    }
  ).then(res => res.json())

  const { 
    precinctsComplete: precinctsReported, 
    precinctsTotal,
    results
  } = data.ballotItems.find((item: any) => item.title = 'Governor')

  let total, democratic, republican
  total = democratic = republican = 0

  for (let candidate of results) {
    const { stateName: name, votesWon } = candidate

    total += ['Over Vote', 'Under Vote'].includes(name) ? 0: votesWon
    if (name.includes('McAuliffe')) democratic += votesWon
    else if (name.includes('Youngkin')) republican += votesWon
  }

  return {
    parties: {
      democratic,
      republican
    },
    total,
    precinctsReported,
    precinctsTotal,
    timestamp: Date.now()
  }
}

const fetchDataDifference = async (): Promise<VoteData> => {
  const stateData = await fetchStateData()
  const localData = await fetchLocalityData()

  return {
    parties: {
      democratic: localData.parties.democratic - stateData.parties.democratic,
      republican: localData.parties.republican - stateData.parties.republican
    },
    total: localData.total - stateData.total,
    timestamp: Date.now()
  }
}

export default fetchDataDifference
export { 
  fetchStateData,
  fetchLocalityData,
  API_URL as URL 
} 
