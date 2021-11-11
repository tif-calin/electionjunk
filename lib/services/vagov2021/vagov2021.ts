import fetchAbsenteeData, {
  URL as absenteeDataURL
} from './absentee'
import fetchVoteCountData, {
  URL as voteCountDataURL
} from './voteCount'

export default fetchVoteCountData
export {
  fetchVoteCountData,
  voteCountDataURL,
  fetchAbsenteeData,
  absenteeDataURL
}
