
import 'bootstrap-icons/font/bootstrap-icons.css';
export function AddonsExtra(props){
   
      return(
          <>
          <div  className="cart-card addon d-flex mx-2"  >
            {props.img && (
                <img src={`http://127.0.0.1:8000/storage/${props.img}`} className="addon-img" alt="Addon" ></img>

            )}
          
          <div className="form-check">
          <input className="form-check-input" type="checkbox" name={props.inputName} id={`radio-${props.name}`} onChange={props.change} />
          <label className="form-check-label" for={`radio-${props.name}`} >
            {props.name}
          </label>
<br></br>
          <strong>{props.price} OMR</strong> 
          <br></br>
          <div className="quantity-span">
                    <a  className=" inc"  onClick={(props.increase)}>
                    <i class="bi bi-plus-circle"></i>
                    </a>
                    {props.q}
                    <a className=" dec" onClick={(props.decrease)}>
                    <i class="bi bi-dash-circle"></i>
                                        </a>
                </div>

          
        </div>
          
          
        </div>
          </>
      )
  }