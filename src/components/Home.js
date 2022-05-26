import React, { useEffect, useState } from 'react';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import '../styles/home.css';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredient } from '../redux/actions/ProductsAction';
import LongMenu from './LongMenu'
import AddIcon from '@mui/icons-material/Add';
import ModalConfirmBuy from './ModalConfirmBuy';
import ModalAdd from './ModalAdd';

export default function Home() {

  const ingredients = useSelector( (state) => state.products );
  const dispatch = useDispatch();
  
  // const [ allChecked, setAllChecked ] = useState(false)
  const [ selectProducts, setSelectProducts ] = useState([]);
  const [ modalBuy, setModalBuy ] = useState(false);
  const [ modalAddProduct, setModalAddProduct ] = useState(false);
  const [ subTotal, setSubTotal ] = useState(0);
  const [ totalPrice, setTotalPrice ] = useState(0);

  useEffect(() => {
    getProduct();
  },[])
  
  const getProduct = async() => {
    const collectionIngredients = await getDocs(collection(db, 'Ingredients'));
    const newArray = []
    collectionIngredients.docs.forEach(ingredient => {
      newArray.push(ingredient.data())
    })
    dispatch(getIngredient(newArray))
  }
  const loadFirebase = async() => {
    const data = await fetch('https://recipe-rissoto.vercel.app/recipe');
    const result = await data.json();
    result.ingredients.forEach(async(ingredient) => {
      await addDoc(collection(db, "Ingredients"), ingredient);
    })
  }

  const chancgeCheckbox = (e, ingredient) => {
    const repeat = selectProducts.find(element => element.product === ingredient.product);
    if(e.target.checked && repeat === undefined){
      setSelectProducts([ ...selectProducts, ingredient ])
    } else  {
      setSelectProducts(selectProducts.filter(i=> i.product !== ingredient.product))
    }
  }
  useEffect(()=>{
    const price = subTotalFn();
    setSubTotal(price)
    setTotalPrice(price + 5)
  },[selectProducts])

  const subTotalFn = () => {
    let sum = 0;
    selectProducts.forEach(element => {
      sum += element.price
    });
    return sum
  }

  return (
    <div className='container-home'>
      <button style={{background: 'red', border: 'none', padding: '5px 20px'}} onClick={() => loadFirebase()}>
        Subir Api a Firebase
      </button>

      <form action="" onSubmit={(e)=>{
        e.preventDefault();
        setModalBuy(true)
      }}>
        <section>
          <div className='container-title'>
            <p className='title-ingredients'>INGREDIENTES</p>
            <h1 className='title'>Nombre del plato</h1>
            <span 
            className='select' 
            // onClick={()=>setAllChecked(true)}
            >
              Selecionar todo
            </span>
            <span> | </span>
            <span 
            className='select' 
            // onClick={()=>setAllChecked(false)}
            >
              Deseleccionar todo
            </span>
          </div>
          <div>
            {
              ingredients?.map((ingredient, index) => (
                <label htmlFor={`ingredient-${index}`} key={index} className='product'>
                  <input 
                  type="checkbox" 
                  // checked={allChecked && 'checked'}
                  value={ingredient.product} 
                  onChange={(e)=>chancgeCheckbox(e, ingredient)} 
                  id={`ingredient-${index}`}
                />
                  <div className='amount'>{ingredient.items}</div>
                  <div>
                    <h5 className='name-product'>{ ingredient.product }</h5>
                    <p className='brand'>{ ingredient.brand }</p>
                    <span>{ ingredient.quantity }</span>
                  </div>
                  <span className='price'>{`${ingredient.price}€.`}</span>
                  <LongMenu element={ingredient}/>
                </label>
              ))
            }
            <button type='button' className='add-product' onClick={()=>setModalAddProduct(true)}>Crear Producto <AddIcon/></button>
          </div>
        </section>
        <section className='cotizacion'>
          <p className='cont'>Items {selectProducts.length}</p>
          <div className='cont'>
            <p>Subtotal</p>
            <span>{ subTotal }€ </span>
          </div>
          <div className='cont'>
            <p>Gastos de envio</p>
            <span>5€</span>
          </div>
          <div className='cont'>
            <h4>Total</h4>
            <span className='color-green'>{totalPrice} €</span>
          </div>
          <button type='submit' className='btn-buy'>Comprar ingredientes: {}€</button>
        </section>
      </form>
      <ModalConfirmBuy modalBuy={modalBuy} setModalBuy={setModalBuy}/>
      <ModalAdd  modalAddProduct={modalAddProduct} setModalAddProduct={setModalAddProduct} />
    </div>
  )
}