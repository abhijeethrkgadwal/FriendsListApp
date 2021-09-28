import "./ListRow.css"

function ListRow(props) {

  const onDelete = () => {
    let isConfirm = window.confirm('Are you sure want to delete');
    if (isConfirm) {
      props.deleteRow(props.id)
    }
  }

  return (
    <div className="item" data-testid="listRowhead">
      <div className="item-name" data-testid="listRowLabel">
        <h4>{props.name}<span>is your freind</span></h4>
      </div>
      <div className="item-actions" data-testid="listRowButton">
        <button onClick={() => props.makeFavourite(props.id)}>
          {
            props.isFavourite
              ? <i className="fas fa-star"></i>
              : <i className="far fa-star"></i>
          }
        </button>
        <button onClick={onDelete}>
          <i className="fas fa-trash-alt"></i>
        </button>
      </div>
    </div>
  )
}

export default ListRow