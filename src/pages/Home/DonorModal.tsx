import CustomTable from '@/components/CustomTable';
import { Modal } from 'antd'
import React from 'react'

interface Props  {
    open: boolean,
    handleOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'NRIC/Passport No.',
    dataIndex: 'nric',
    key: 'nric',
  },
  {
    title: 'Mobile No.',
    dataIndex: 'mobile',
    key: 'mobile',
  },
  {
    title: 'Email Address',
    dataIndex: 'email',
    key: 'email',
  },
];

const data = [
  {
    key: '1',
    name: 'TAN MENG FAR',
    nric: '740820-08-5390',
    mobile: '016-2127652',
    email: 'fannytan.siong@gmail.com',
  },
  {
    key: '2',
    name: 'WONG SIEW YING',
    nric: '540425-01-5150',
    mobile: '198631955',
    email: 'sywongpersonal@gmail.com',
  },
  {
    key: '3',
    name: 'KOPERASI DIDIK BERHAD',
    nric: 'W60294',
    mobile: '-',
    email: 'parames@mied.com.my',
  },
  {
    key: '4',
    name: 'LOW YOKE SHIM @ LAN YOKE SHIM',
    nric: 'E6760781A',
    mobile: '+6597417306',
    email: 'mich_low@hotmail.com',
  },
];


const DonorModal:React.FC<Props> = ({open, handleOpen}) => {
  return (
    <Modal
    title="Donor Details"
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

export default DonorModal
