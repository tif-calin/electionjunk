import { VoteData } from './types';

const corsProxy = 'https://api.allorigins.win/get?url='
const URL = corsProxy + 'https://results.elections.virginia.gov/vaelections/2021%20November%20General/Json/Statewide.json'

const mungeVoteData = (data: any): VoteData => {
  let total = 0;
  const parties = data.Candidates.reduce((acc: any, cur: any) => {
    total += Number(cur.Votes)
    return {
      ...acc,
      [cur.PoliticalParty.toLowerCase().replace('-', '')]: Number(cur.Votes)
    }
  }, {})

  return {
    parties,
    total,
    precinctsTotal: Number(data.PrecinctsParticipating),
    precinctsReported: Number(data.PrecinctsReporting),
    timestamp: Date.now()
  }
}

const fetchData = async () => {
  const { contents } = await fetch(URL).then(res => res.json())

  const data =mungeVoteData(JSON.parse(contents)['Races'][0])

  console.log(data)
  return data
}

export default fetchData
