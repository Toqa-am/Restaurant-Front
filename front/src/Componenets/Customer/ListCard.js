import { SizeCard } from '../Customer/SizeCard';
import { AddonsExtra } from '../Customer/AddonsExtra';
import { CartCard } from '../Customer/CartCard';
import { addToCart, decreaseItemBCart, increaseItemBCart, increaseItemQuant, zeroQuant } from '../../Store/action';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';



export function ListCard(pokemon) {
    const dispatch = useDispatch();
    const itemQuant = useSelector(state => state.itemQuant);
    const [CartFormData, setCartFormData] = useState({

        items: {},
        addons: []

    });
    const [cartItemWSize, setCartItemWSize] = useState({})
    const [chosen, setChosen] = useState(false)
    const [addon, setAddon] = useState(true)



    const handleCancel = () => {
        dispatch(zeroQuant())

    }

    function increaseItems(item) {

        dispatch(increaseItemBCart(item))
        console.log(item);


    }
    function decreaseItems(item) {


        dispatch(decreaseItemBCart(item.id))



    }

    function changeSize(size, item, e) {
        console.log(size);
        console.log(item);
        // let i = item
        console.log(e.target.checked);

        if (e.target.checked === true) {
            if (size.size === 1) {
                item.size = "Small"

            }
            else if (size.size === 2) {
                item.size = "Medium"

            }
            else if (size.size === 3) {
                item.size = "Big"

            }
            else if (size.size === 4) {
                item.size = "Family"


            }
            item.cost = size.cost
            item.nop = size.number_of_pieces
            console.log(item);
            console.log("kjhgf")
            setCartItemWSize(item);
            console.log(cartItemWSize)
            

            setCartFormData({ ...CartFormData, items: item })
            console.log(CartFormData.items)
        }


    }

    function increaseAddon(item) {
        if (typeof item.quant === "undefined") {
            item.quant = 1
            setAddon(!addon)
        }
        else {
            item.quant++
            console.log(item)
            setAddon(!addon)
        }


    }

    function decreaseAddon(item) {
        if (typeof item.quant === "undefined") {
            item.quant = 1
            setAddon(!addon)
        }
        else {
            console.log(item.quant)
            if (item.quant > 1) {
                item.quant--

            }
            console.log(item)
            setAddon(!addon)
        }


    }

    const handleCheckboxChange = (item, e) => {
        console.log(e);
        console.log(item);
        setChosen(true)
        if(!item.quant){
            item.quant=1;
        }
       
        if (e.target.checked) {
            setCartFormData({ ...CartFormData, addons: [...CartFormData.addons, item] })

        }
        else {
            setCartFormData({
                ...CartFormData, addons: [...CartFormData.addons.filter(function (addon) {
                    return addon.name !== item.name
                })]
            })

        }
        

        console.log(CartFormData);
    };

    const handleAddToCart = (pokemon, itemQuant) => {
        console.log(pokemon)
        if (JSON.stringify(CartFormData.items) === '{}') {
            dispatch(addToCart([pokemon, itemQuant]));


        }
        else {
            dispatch(addToCart([CartFormData.items, itemQuant]));
            console.log(CartFormData.items)
            CartFormData.addons.map((item) => (
                dispatch(addToCart([item, item.quant]))
            ))
        }

        setCartFormData({
            items: {},
            addons: []
        })

        dispatch(zeroQuant())
        console.log(CartFormData);

    };


    return (
        <>
            <div key={pokemon.id} className="pokemon-card">
                <img
                    key={pokemon.image}
                    src={`http://127.0.0.1:8000/storage/${pokemon.image}`}
                />

                {/* <img src={pokemon.image_url} alt={pokemon.pokemon} /> */}
                <div className="pokemon-details">
                    <h6>{` ${pokemon.name}`} </h6>
                    <p className="text-black-50 para">{pokemon.description}</p>
                    <div className="d-flex justify-content-between align-items-center item-card">
                        {pokemon.cost ? <p className="price"> OMR {pokemon.cost}</p> :
                            <p className="price "> OMR {pokemon.meal_size_costs[0].cost}</p>
                        }

                        <button
                            className="button rounded-pill p-1"
                            data-bs-toggle="modal"
                            data-bs-target={`#staticBackdrop-${pokemon.id}`}
                            onClick={() => {
                                console.log(pokemon.item);
                                console.log(pokemon);
                            }}
                        >
                            <i class="bi bi-handbag-fill"></i>
                            <span >Add</span>
                        </button>
                        {/* <!-- Modal --> */}
                        <div
                            className="modal fade"
                            id={`staticBackdrop-${pokemon.id}`}
                            data-bs-backdrop="static"
                            data-bs-keyboard="false"
                            tabIndex="-1"
                            aria-labelledby={`staticBackdropLabel-${pokemon.id}`}
                            aria-hidden="true"
                        >
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => handleCancel()}></button>
                                    </div>
                                    <div className="modal-body">
                                        <CartCard src={pokemon.image} title={`${typeof pokemon.item.size === "undefined" ? "" : pokemon.item.size} ${pokemon.name} `} price={pokemon.item.cost} description={pokemon.item.description} quant={itemQuant} increase={() => increaseItems(pokemon.item)} decrease={() => decreaseItems(pokemon.item)} />
                                        {/* <h1>{pokemon.image} jkhu</h1> */}
                                        {pokemon.meal_size_costs && (
                                            <>


                                                <div className='d-flex justify-content-around scrollmenu ' >

                                                    {pokemon.meal_size_costs.map((size) => (


                                                        <SizeCard size={size.size} price={size.cost} nop={size.number_of_pieces} changeSize={(e) => changeSize(size, pokemon.item, e)} />


                                                    ))}


                                                </div>
                                            </>)}

                                        {pokemon.extras && (
                                            <>
                                                <div className='d-flex justify-content-around scrollmenu ' >
                                                    {pokemon.extras.map((item) => (


                                                        <AddonsExtra name={item.name} inputName="extras" price={item.cost} change={(e) => handleCheckboxChange(item, e)} increase={() => increaseAddon(item)} decrease={() => decreaseAddon(item)} q={item.quant} choose={chosen} />

                                                    ))}


                                                </div>
                                            </>)}
                                        {pokemon.addons && (
                                            <>
                                                <div className='d-flex justify-content-around scrollmenu  ' >
                                                    {pokemon.addons.map((item) => (

                                                        <AddonsExtra name={item.name} inputName="addons" price={item.cost} img={item.image} change={(e) => handleCheckboxChange(item, e)} q={item.quant} increase={() => increaseAddon(item)} decrease={() => decreaseAddon(item)} />

                                                    ))}


                                                </div>
                                            </>)}

                                    </div>
                                    <div className="modal-footer">
                                        
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => handleCancel()}>
                                            Close
                                        </button>
                                        
                                        <button
                                            type="button"
                                            disabled={((pokemon.item.table_name === "meals" && !pokemon.item.size) ? true : false)}
                                            className="btn primary"
                                            onClick={() => handleAddToCart(pokemon.item, itemQuant)}
                                            data-bs-dismiss="modal"
                                        >
                                            Add to cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Modal */}
                    </div>
                </div>
            </div>
        </>
    )
}