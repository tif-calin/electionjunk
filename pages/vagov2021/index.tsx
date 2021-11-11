import { NextPage } from 'next'
import React from 'react'
import fetchVoteData from '../../lib/services/vagov2021/voteCount'
import { VoteData } from '../../lib/services/vagov2021/types'
import styles from '../../styles/pages/VAGov2021Page.module.scss'
import AbsenteeData from '../../components/vagov2021/absentee'

const VAGov2021Page: NextPage = () => {
  const [dataVote, setDataVote] = React.useState<VoteData>({} as any)

  const non2PartyVote = dataVote?.parties?.['liberation'] + dataVote?.parties?.['writein']

  const handleVoteCountClick = async () => {
    setDataVote(await fetchVoteData())
  }

  return (
    <div className={styles.page}>
      <button
        onClick={handleVoteCountClick}
      >update count</button>
      {Boolean(dataVote.total) && <>
        <div className={styles.stats}>
          <label>total vote</label>
          <span>{dataVote.total.toLocaleString()}</span>
          <label>democratic vote</label>
          <span>{dataVote.parties.democratic.toLocaleString()} ({(100*dataVote.parties.democratic/dataVote.total).toFixed(2)}%)</span>
          <label>republican vote</label>
          <span>{dataVote.parties.republican.toLocaleString()} ({(100*dataVote.parties.republican/dataVote.total).toFixed(2)}%)</span>
          <label>other vote</label>
          <span>{non2PartyVote.toLocaleString()} ({(100 * non2PartyVote / dataVote.total).toFixed(2)}%)</span>
        </div>
      </>}

      {<AbsenteeData/>}
    </div>
  )
};

export default VAGov2021Page;
