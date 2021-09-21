const initialState ={
    data:{
   buidingName:"",
   city:"",
   landlineNumber:"",
   address1:"",
   address2:"",
   poBoxNumber:"",
 
    }
 }
 export default function(state = initialState,action){
     console.log("reducer")
     switch(action.type){
         case 'ADD_OFFICE':{
             return {...state,
                 data:{...action.payload}
 
             }
            break;
         }
            
 }
 return state
 }