import React from 'react'
import {Button, message} from 'antd'
import { sendEmailCodeAPI } from '../../services/api'

export default function EmailCode (props) {
  // add email format verification later
  // add countdown

  const sendCode = () => {
    console.log(props.email)
    sendEmailCodeAPI({
      email: props.email
    }).then(res => {
      const { code, msg, result } = res
      console.log(res)
      console.log(code)
      console.log(msg)
      if (code === 200) {
        message.success(msg)
      } else {
        message.error(result)
      }
    })
  }

  return (
    <div>
      <Button type="primary" onClick={sendCode}>Send verification code</Button>
    </div>
  )
}