import React from 'react'
import './index.css'
import { Button, Checkbox, Form, Input, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { loginAPI } from '../../../services/api'

export default function Login () {

  const navigate = useNavigate()

  const onFinish = (values) => {
    loginAPI({
      username: values.username,
      password: values.password
    }).then(
      res => {
        const { code, msg, token } = res
        if (code === 200) {
          // 存储数据
          message.success('ok')
          localStorage.setItem('token', token)
          // 跳转到根路径
          setTimeout(() => {
            navigate('/')
          }, 1500)
        } else {
          message.error(msg)
        }
      })
  }

  return (
    <div className="Auth-form-container">
      <h1>Welcome to Project Manager</h1>
      <Form
        className="Auth-form"
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <p></p>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Login</h3>
          <div className="text-center">
            Not registered yet?{' '}
            <a href="/signup" className="link-primary">Sign Up</a>
            <p></p>
          </div>

          <Form.Item
            name="username"
            label="Username"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              type="email"
              placeholder="Please enter username(email)"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              placeholder="Please enter password"
              type="password"
            />
          </Form.Item>

          <p></p>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <div>
            <Button htmlType="submit" type="primary" block>
              Login
            </Button>
          </div>

          <div className="text-center">
            <p></p>
            <a href="https://www.google.com">Forgot password?</a>
          </div>

        </div>
      </Form>
    </div>
  )
}