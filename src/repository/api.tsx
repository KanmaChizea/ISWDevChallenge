import { Account } from "../redux/accounts";

interface RequestResult{
    isSuccess: boolean,
    data?: any,
    errorMessage?:string
}

interface SignupProps{
    fullname:string, 
    username:string, 
    password:string
}

interface LoginProps{
    username:string,
    password?:string,
    isBiometrics:boolean,
}

interface AddAccountProps{
    id:string;
    accountno:string;
    balance:number;
    newUser:boolean;
}

const USER_ENDPOINT = 'https://65006ff718c34dee0cd4e709.mockapi.io/api/user';

const signup : (props:SignupProps)=>Promise<RequestResult> = async (props:SignupProps)=>{
    try{
    const user = {
        "fullname":props.fullname,
        "username":props.username,
       "password":props.password,
    }
   const result = await fetch(USER_ENDPOINT, {
        method:'POST',
        body: JSON.stringify(user),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
    },);
    const data = await result.json();
    return {
        isSuccess: true,
        data: data,
    }
    }catch(e){
        return {
            isSuccess: false,
            errorMessage: 'Could not create new user'
        }
    }
}
const login : (props:LoginProps)=>Promise<RequestResult> = async (props:LoginProps)=>{
    try{
   const result = await fetch(USER_ENDPOINT + '?username=' + props.username, {
        method:'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
    },);
    const usersList = await result.json();
    var data 
    if(props.isBiometrics){
        data = usersList.find((user:any)=> user.username == props.username)
    }   else{
    data = usersList.find((user:any)=> user.username == props.username && user.password == props.password)
    }
    if(data === undefined){
        return {
            isSuccess:false,
            errorMessage: 'Invalid username or password'
        }
    }
    return {
        isSuccess: true,
        data: data,
    }
    }catch(e){
        return {
            isSuccess: false,
            errorMessage: 'Could not login'
        }
    }
}

const addAccount :(props:AddAccountProps) => Promise<RequestResult> =async (props:AddAccountProps)=>{
    try{
       const result = await fetch(USER_ENDPOINT +'/' + props.id + '/account', {
            method:'POST',
            body: JSON.stringify({
                'accountNo':props.accountno,
                'balance':props.balance
            }),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
        },);
        if(result.status == 201){   
        const data = await result.json();
        return {
            isSuccess: true,
            data: data,
        }
        } else{
            throw new Error()
        }     
        }catch(e){  
            return {
                isSuccess: false,
                errorMessage:props.newUser ? 'Could not create new user' :'Could not add account'
            }
        }
}
const getAccount :(id:string) => Promise<RequestResult> =async (id:string)=>{
    try{
       const result = await fetch(USER_ENDPOINT +'/' + id + '/account', {
            method:'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
        },);
        const data = await result.json();
        
        const accountList = (data as []).map((e: any)=>{ return {
            accountNo: e.accountNo,
            balance:e.balance
        }});
        return {
            isSuccess: true,
            data: accountList,
        }
        }catch(e){
            return {
                isSuccess: false,
                errorMessage: 'Error initializing data'
            }
        }
}

export const API = {
    signup: signup,
    login:login,
    addAccount:addAccount,
    getAccounts:getAccount,
}