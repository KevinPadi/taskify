const KanbanDropIndicator = ({ edge, gap }) => {
  const edgeClassMap = {
    top: "edge-top",
    bottom: "edge-bottom",
  }

  const edgeClass = edgeClassMap[edge]

  const style = {
    "--gap": gap,
  }

  return <div className={`drop-indicator z-10 absolute bg-black dark:bg-white pointer-events-none box-border h-1 left-0 right-0 rounded-sm ${edgeClass}`} style={style}></div>
}

export default KanbanDropIndicator