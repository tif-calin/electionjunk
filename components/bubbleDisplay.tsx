import styles from './bubbleDisplay.module.scss'

interface Props {
  breakpoint: number,
  data: {
    [key: string]: number
  },
  composeBubbleSize: (val: number) => number
}

const BubbleDisplay = (props: Props) => {
  const { 
    breakpoint, 
    data, 
    composeBubbleSize
  } = props

  return (<ul className={styles.container}>
    {Object.entries(data).map(
      ([key, val]: [string, number]) => (
        <span 
          key={key}
          title={key}
          className={styles.bubble}
          style={{
            padding: '1rem',
            width: `${composeBubbleSize(val)}rem`,
            height: `${composeBubbleSize(val)}rem`
          }}
        >
          {val.toLocaleString()}
          {val > breakpoint && <span>{key}</span>}
        </span>
      )
    )}
  </ul>)
}

export default BubbleDisplay
