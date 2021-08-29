import React from 'react';

/**
 * 虚拟列表
 * 1. 分页加载: 数据
 * @param {*} props 
 * @returns 
 */
function VList(props) {
  const totalHeight = React.useMemo(() => (
    props.estimateRowHeight * props.total
  ), [props.estimateRowHeight, props.total])

  const userVisibleCount = React.useMemo(() => (
    Math.ceil(props.userVisibleHeight / props.estimateRowHeight)
  ), [props.userVisibleHeight, props.estimateRowHeight])

  const [range, setRange] = React.useState({
    start: 0,
    end: userVisibleCount
  })
  const containerRef = React.useRef(null)

  const currentViewList = React.useMemo(() => (
    props.list.slice(range.start, range.end)
  ), [range, props.list])

  const calculateRange = () => {
    const { current: containerElement } = containerRef
    if (!containerElement) {
      return
    }

    const offset = Math.floor(containerElement.scrollTop / props.estimateRowHeight)

    setRange({
      start: offset,
      end: userVisibleCount + offset
    })
  }

  const onScroll = (e) => {
    e.preventDefault();
    calculateRange()
  }

  const scrollViewOffset = React.useMemo(() => (
    range.start * props.estimateRowHeight
  ), [range.start, props.estimateRowHeight])

  return (
    <div
      ref={containerRef}
      style={{
        overflowX: 'hidden',
        overflowY: 'auto',
        height: props.userVisibleHeight + 'px',
        position: "relative"
      }}
      onScroll={onScroll}
    >
      <div style={{
        width: '100%',
        height: totalHeight + 'px',
        transform: `translate3d(0,${scrollViewOffset}px,0)`
      }}>
        {currentViewList.map(item => (
          <div style={{ border: '1px solid #ddd', height: props.estimateRowHeight, display: 'flex', alignItems: 'center', justifyContent: 'center' }} key={item.id}>{item.value}</div>
        ))}
      </div>
    </div>
  );
}

export default VList;
