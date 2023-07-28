import {useState,Fragment, useRef, useEffect}  from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Map from './map';
import dayjs from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useDispatch, useSelector } from 'react-redux'
import { setContact, createOrder, setClearCart, setCloseCart } from '../features/customer/cart/cartSlice';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { UpadateOrderPending, changeData } from '../features/auth/customerAuthSlice';
import { CircularProgress } from '@mui/material';
import { readCustomerProducts } from '../features/customer/product/productCustomerSlice';



const steps = ['Selecione um ponto de encontro', 'Sugerir a data de entrega', 'Escolher meio de comunicação'];

export default function Steps({handleCloseModal}) {

  const dispatch = useDispatch()
  const {cartTotalAmount,cartItems, frete,selectedPlace,contact}= useSelector(store => store.cart);
  const { customer, loading } = useSelector(
    (store) => store.customer
  );

  const [sizeScreen, setSizeScreen] = useState(window.innerWidth);

  const handleSizeScreen = () => {
    setSizeScreen(window.innerWidth);
  };

  const dataforOrder={
    products:
      cartItems.map((product)=>{
        return {
          productId: product,
          quantity: product.quantity}
      })
      ,
    frete: frete,
    prices:{
      priceTotal: cartTotalAmount
    },
    coordinates: [selectedPlace?.placeName,selectedPlace?.coordinates],
    contact

  }
  const [newNumber, setNewNumber]= useState(customer.numberPhone)
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [readOnly,setReadOnly]=useState(true)
  const [isValidNumber,setIsValidNumber]=useState(true)
  const [dateOrder,setDateOrder]=useState(null)
  const handleChange = (event) => {
    dispatch(setContact({contact:event.target.value}));
    setReadOnly(true)
  };
  const isAnotherNumber=useRef(false)
  const saveNewNumber=()=>{
  if(newNumber){
    if(newNumber.toString().length==9 ){
      isAnotherNumber.current=true
      setReadOnly(true)
      
      //dispatch(changeData({numberPhone:Number(newNumber)}))
  
    }
    else {
      setIsValidNumber(false)
    }
  }
    
  }
  const changeNumber=(event)=>{
    const numberPhone=event.target.value
    const isValidNumberVar = /^\d+$/.test(numberPhone);
    let phoneOnly=numberPhone.replace('+244','')
    if(isValidNumberVar){
      setNewNumber(phoneOnly)
    }
    

  }


  const changeOrder=(date)=>{

    setDateOrder(date)
  }

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const removeReadOnly=()=>{
    setReadOnly(false)
  }
  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
    
  };
  const handleFinish=(dataObj)=>{
    if(isAnotherNumber.current){
      dispatch(changeData({numberPhone:Number(newNumber)}))
    }
    dispatch(createOrder(dataObj))
    handleCloseModal()

  
  }

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  useEffect(() => {
    // Adiciona o event listener quando o componente é montado
    window.addEventListener('resize', handleSizeScreen);

    // Remove o event listener quando o componente é desmontado
    return () => {
      window.removeEventListener('resize', handleSizeScreen);
    };
  }, []); // O segundo parâmetro vazio faz com que o useEffect execute apenas uma vez, após o componente ser montado.




  const today  =dayjs()
  const dateStart=today.format('HH') < 17 ? today : today.add(1,'day')

  return (
    <Box sx={{ width: '100%' ,maxHeight: '80vh', overflowY: 'auto',overflowX:'hidden'}}>
      <Stepper nonLinear orientation = { sizeScreen >= 768 ? 'horizontal':"vertical"} activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
             <p className='text-center '>Todos os passos completo</p>
            {contact ==='facebook' && (<p className='text-orange-500 text-lg font-semibold text-center'>Não esqueça de nos contactar pelo Facebook, Para que tua encomenda possa ser confirmada</p>)}
            {(contact==='whatsapp' || contact==='chamada') && (<p className='text-green-700 text-lg font-semibold text-center'>Entraremos  em  contacto em breve</p>)}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Cancelar</Button>
              <Button onClick={()=>handleFinish(dataforOrder)}>Encomendar</Button>
              
            </Box>
          </Fragment>
        ) : (
          <Fragment>
            <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
              {activeStep==0 && (
                <>
                <Map />  
            
                  
                 {frete && (
                <div className='grid justify-center text-center m-3'>
                  <p>
                  Ponto de encontro : {selectedPlace.placeName}
                 </p>
                 <p>
                   Frete: {frete} Kz
                 </p>         
                 <p>Preço Com frete: {frete + cartTotalAmount } Kz</p>
                </div>
                )}
                </>
                )}
                {activeStep==1 && (
                      <div className='flex w-full justify-center'>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          
                          <DatePicker
                           minDate={dateStart} 
                           label={'Selecione o dia de entrega'} 
                           views={['day']} 
                           value={dateOrder}
                           onChange={(newValue) =>changeOrder(newValue)}
                           /> 
                      </LocalizationProvider>

                      </div>
                      
                )
                
                }
                {activeStep==2 && (
                  <div className='w-full'>
                     <FormControl>
                       <FormLabel id="demo-controlled-radio-buttons-group">Como deseja ser contactado?</FormLabel>
                     <RadioGroup
                       aria-labelledby="demo-controlled-radio-buttons-group"
                       name="controlled-radio-buttons-group"
                       value={contact}
                       onChange={handleChange}
                     >
                       <FormControlLabel value="whatsapp" control={<Radio />} label="Whatsapp (recomendado)" />
                       <FormControlLabel value="chamada" control={<Radio />} label="Telefone (Chamada)" />
                       <FormControlLabel value="facebook" control={<Radio />} label="Facebook" />
                     </RadioGroup>
                   </FormControl>
                    
                  </div>
                    )
                }
                <div className='text-center'>
                {activeStep==2 && ((contact==='whatsapp')||(contact==='chamada')) && (
                  <>
                  {!readOnly?(
                  <>
                  <input 
                  value={newNumber} 
                  type='tel' 
                  pattern="(\+244)?9\d{8}"
                  required
                  onChange={changeNumber}
                  className='bg-slate-300 text-center p-4 rounded-sm'
                  />
                
                  {!isValidNumber && (
                    <small className='text-red-400 block'>Número de telefone inválido</small>

                  )}
                  
                  </>
                  
                ):(
                  <p>Número de Telefone: <strong>{isAnotherNumber.current ? newNumber :customer.numberPhone}</strong> </p>
                )}
                  {readOnly?(<Button onClick={removeReadOnly}>Alterar Número</Button>):
                  (<button className='btn-primary' onClick={saveNewNumber}>{loading ? <CircularProgress />:'Confirmar Número'}</button>)
                  }
                  </>
                  )}      
                
                </div>
                  {activeStep==2 && (contact==='facebook') && (
                  <div className='text-center text-gray-600 font-bold'>

                    <p>Contacte por Chat integrado ou pela nossa pagina do <a className='text-blue-500' href="http://m.me/104650231911396" target="_blank" rel="noopener noreferrer">Menssenger (Facebook)</a></p>
                    <p>Para que a encomenda possa ser confirmada e manter a comunição, envie nos uma mensagem contendo o seu E-mail de cadastro</p>
                    
                  </div>
                  )}                      

            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row',flexWrap:'wrap', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Voltar
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleNext} sx={{ mr: 1 }}>
                Próximo
              </Button>
              {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography variant="caption" sx={{ display: 'inline-block' }}>
                    Passo {activeStep + 1} completo
                  </Typography>
                ) : (
                  <button
                   className='btn-primary bg-blue-500 text-white hover:bg-blue-700 disabled:bg-gray-600 w-full md:w-fit'
                   disabled={(activeStep===0 && !selectedPlace)||(activeStep===1 && !dateOrder)}
                   onClick={handleComplete}>
                    Complete o passo
                  </button>
                ))}
            </Box>
          </Fragment>
        )}
      </div>
    </Box>
 );
}