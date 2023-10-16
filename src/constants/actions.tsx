import {
  AirtimeIcon,
  CardIcon,
  InvoiceIcon,
  LoanIcon,
  QRIcon,
  TransferIcon,
} from '../../assets';
import {RootStackParamList} from '../navigation/stack_types';

export interface DashboardAction {
  name: string;
  icon: JSX.Element;
  id: string;
  route: keyof RootStackParamList;
}

export const dashboardActions: DashboardAction[] = [
  {
    name: 'Transfer',
    icon: <TransferIcon />,
    id: '1',
    route: 'Transfers',
  },
  {
    name: 'Pay Bills',
    icon: <InvoiceIcon />,
    id: '2',
    route: 'PayBills',
  },
  {
    name: 'Buy Airtime',
    icon: <AirtimeIcon />,
    id: '3',
    route: 'BuyAirtime',
  },
  {
    name: 'QR Payment',
    icon: <QRIcon />,
    id: '4',
    route: 'QRPayment',
  },
  {
    name: 'Loans',
    icon: <LoanIcon />,
    id: '5',
    route: 'Loans',
  },
  {
    name: 'Virtual Cards',
    icon: <CardIcon />,
    id: '6',
    route: 'VirtualCards',
  },
];
