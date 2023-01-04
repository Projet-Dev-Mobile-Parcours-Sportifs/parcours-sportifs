import { CircularProgress, List } from "@mui/material"

export const DataList = ({ title, isLoading, data, actions, noDataTitle, typeList }) => {
  const hasDatas = !isLoading && data.length > 0;

  return (
    <>
      <h1 style={{ textAlign: "center" }}>{title}</h1>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10vw",
          }}
        >
          <CircularProgress color="inherit" />
        </div>
      ) : hasDatas ? (
        <div className="list">
          {data.map(function (object, key) {
            return (
              <List
                displayList={object}
                typeList={typeList}
                key={key}
                action={actions}
              />
            )
          })}
        </div>
      ) : (
        <h2 style={{ textAlign: "center" }}>
          {noDataTitle}
        </h2>
      )}
    </>
  )
}
