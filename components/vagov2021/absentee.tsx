import React from 'react'
import BubbleDisplay from '../bubbleDisplay'
import fetchAbsenteeData from '../../lib/services/vagov2021/absentee'
import { absenteeData, VoteData } from '../../lib/services/vagov2021/types'
import { countBy } from '../../lib/services/vagov2021/utils'
import styles from '../../styles/pages/VAGov2021Page.module.scss'

interface absenteeDataStats {
  total: number,
  byLocality?: { [key: string]: number },
  byReason?: { [key: string]: number },
  byAgeRange?: { [key: string]: number },
  byReceiptType?: { [key: string]: number },
}

const AbsenteeData = () => {
  const [dataAbsentee, setDataAbsentee] = React.useState<absenteeData[]>([])
  const [stats, setStats] = React.useState<absenteeDataStats>({ total: 0 })

  React.useEffect(() => {
    if (dataAbsentee) setStats({
      total: dataAbsentee.reduce((acc, cur) => acc + ~~cur.count, 0),
      byLocality: countBy(dataAbsentee, 'locality'),
      byReason: countBy(dataAbsentee, 'reason'),
      byAgeRange: countBy(dataAbsentee, 'ageRange'),
      byReceiptType: countBy(dataAbsentee, 'receiptType'),
    })
  }, [dataAbsentee])

  const totalAbsentee = ~~stats?.total
  const numberOfLocalities = Object.keys(stats?.byLocality ?? {}).length
  const averageAbsenteePerLocality = Math.round(totalAbsentee / numberOfLocalities)
  const remainingAbsentee = stats?.byReceiptType?.['Outstanding'] || 0

  const handleClick = async () => {
    setDataAbsentee(await fetchAbsenteeData())
  }

  return (<>
    <button
      onClick={handleClick}
    >update absentee</button>

    {Boolean(dataAbsentee?.length) && <>

      <div className={styles.stats}>
        <label>total absentee ballots</label>
        <span>{totalAbsentee.toLocaleString()}</span>
        <label>average per locality</label>
        <span>{averageAbsenteePerLocality.toLocaleString()}</span>
        <label>remaining absentee ballots</label>
        <span>{remainingAbsentee?.toLocaleString()} ({(100 * remainingAbsentee / totalAbsentee).toLocaleString()}%)</span>
      </div>

      {stats?.byLocality && <details>
        <summary>by locality ({numberOfLocalities})</summary>
        <BubbleDisplay 
          data={stats?.byLocality}
          breakpoint={40000}
          composeBubbleSize={n => 2 + n/30000}
        />
      </details>}

      {stats?.byReason && <details>
        <summary>by reason ({Object.keys(stats.byReason).length})</summary>
        <BubbleDisplay 
          data={stats?.byReason}
          breakpoint={30}
          composeBubbleSize={n => 2 + (Math.log2(n) / 2)}
        />
      </details>}

      {stats?.byAgeRange && <details>
        <summary>by age range ({Object.keys(stats.byAgeRange).length})</summary>
        <BubbleDisplay 
          data={stats?.byAgeRange}
          breakpoint={30}
          composeBubbleSize={n => 2 + n/40000}
        />
      </details>}

      {stats?.byReceiptType && <details>
        <summary>by receipt type ({Object.keys(stats.byReceiptType).length})</summary>
        <BubbleDisplay 
          data={stats?.byReceiptType}
          breakpoint={300}
          composeBubbleSize={n => 2 + n/50000}
        />
      </details>}

    </>}
  </>)
}

export default React.memo(AbsenteeData)
