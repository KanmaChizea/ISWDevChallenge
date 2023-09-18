import { AirtimeIcon, CardIcon, InvoiceIcon, LoanIcon, QRIcon, TransferIcon } from "../../assets";

export interface DashboardAction{
    name:string;
    icon:JSX.Element;
    id:string,
}

export const dashboardActions = [
    {
        name:'Transfer',
        icon:<TransferIcon/>,
        id:'1'
    },
    {
        name:'Pay Bills',
        icon:<InvoiceIcon/>,
        id:'2'
    },
    {
        name:'Buy Airtime',
        icon:<AirtimeIcon/>,
        id:'3'
    },
    {
        name:'QR Payment',
        icon:<QRIcon/>,
        id:'4'
    },
    {
        name:'Loans',
        icon:<LoanIcon/>,
        id:'5'
    },
    {
        name:'Virtual Cards',
        icon:<CardIcon/>,
        id:'6'
    },
]