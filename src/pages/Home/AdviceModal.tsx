import { Modal } from 'antd'
import React from 'react'

interface Props  {
    open: boolean,
    handleOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

const AdviceModal:React.FC<Props> = ({open, handleOpen}) => {
  return (
    <Modal
    title="Modal responsive width"
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
    advice
  </Modal>
  )
}

export default AdviceModal
