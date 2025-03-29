import CustomTable from '@/components/CustomTable';
import { Modal } from 'antd'
import React from 'react'

interface Props  {
    open: boolean,
    handleOpen: React.Dispatch<React.SetStateAction<boolean>>,
}


const columns = [
    {
      title: 'Account Number',
      dataIndex: 'accountNumber',
      key: 'accountNumber',
    },
    {
      title: 'Account Name',
      dataIndex: 'accountName',
      key: 'accountName',
    },
    {
      title: 'Bank',
      dataIndex: 'bank',
      key: 'bank',
    },
    {
      title: 'Bank Code',
      dataIndex: 'bankCode',
      key: 'bankCode',
    },
    {
      title: 'Payment Mode',
      dataIndex: 'paymentMode',
      key: 'paymentMode',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'NRICNO.',
      dataIndex: 'nricNo',
      key: 'nricNo',
    },
  ];
  
  const data = [
    {
      key: '1',
      accountNumber: '4381643522',
      accountName: 'TAN MENG FAR',
      bank: 'PBB',
      bankCode: 'PBBEMYKL',
      paymentMode: 'IG',
      name: 'TAN MENG FAR',
      nricNo: '740820085390',
    },
    {
      key: '2',
      accountNumber: '8008449537',
      accountName: 'Wong Siew Ying',
      bank: 'CIMB',
      bankCode: 'CIBBMYKL',
      paymentMode: 'IG',
      name: 'Wong Siew Ying',
      nricNo: '540425015150',
    },
    {
      key: '3',
      accountNumber: '8000186802',
      accountName: 'KOPERASI DIDIK BERHAD',
      bank: 'CIMB',
      bankCode: 'CIBBMYKL',
      paymentMode: 'IG',
      name: 'KOPERASI DIDIK BERHAD',
      nricNo: 'W60294',
    },
    {
      key: '4',
      accountNumber: '7058862124',
      accountName: 'LOW YOKE SHIM @ LAN YOKE SHIM',
      bank: 'CIMB',
      bankCode: 'CIBBMYKL',
      paymentMode: 'IG',
      name: 'LOW YOKE SHIM @ LAN YOKE SHIM',
      nricNo: 'S2635310F',
    },
  ];

const BankingModal:React.FC<Props> = ({open, handleOpen}) => {
  return (
    <Modal
    title="Banking Account Details"
    centered
    open={open}
    onOk={() => handleOpen(false)}
    onCancel={() => handleOpen(false)}
    width={{
      xs: '100%',
      sm: '100%',
      md: '100%',
      lg: '90%',
      xl: '80%',
      xxl: '70%',
    }}
  >
    <CustomTable data={data} columns={columns} />
  </Modal>
  )
}

export default BankingModal
