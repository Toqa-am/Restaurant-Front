
export function FilterCard(props){
    return(
        <>
        <div className="filter-card" >
        <button className={" filter-button d-block "} onClick={props.filterr} id={props.id}>
            <img src={props.img} height={50} width={75} className="rounded" ></img>
                <strong>
                     <p className="filter-card-text">{props.title}</p>
                     </strong>
             
            
        </button>
        </div>
        </>
    )
}