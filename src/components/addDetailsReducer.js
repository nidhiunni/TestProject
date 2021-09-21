

const initialState ={
   data:{
  name:"",
  email:"",
  mobileNumber:"",
  address1:"",
  address2:"",
  address3:"",

   }
}
export default function(state = initialState,action){
    console.log("reducer")
    switch(action.type){
        case 'ADD_PROFILE':{
            return {...state,
                data:{...action.payload}

            }
           break;
        }
           
}
return state
}