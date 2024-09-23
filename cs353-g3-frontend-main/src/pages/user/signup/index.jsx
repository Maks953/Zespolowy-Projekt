import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../login/index.css'
import { Button, Form, Input, message } from 'antd'
import { signupAPI } from '../../../services/api'
import EmailCode from '../../../components/EmailCode'

function Signup () {
  const [email, setEmail] = useState('')

  const navigate = useNavigate()

  const onFinish = (values) => {
    signupAPI({
      email: values.email,
      code: values.code,
      password: values.password,
      confirm_password: values.confirm_password,
    }).then(res => {
      const { code, msg } = res
      if (code === 200) {
        message.success(msg)
        // 跳到登录页
        setTimeout(() => navigate('/login'), 1500)
      } else {
        message.error("注册失败")
      }
    })
  }

  return (
    // 居中容器框
    <div className="Auth-form-container">
      {/*表单*/}
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
        {/*上面文本区域*/}
        <div className="Auth-form-content">
          {/*标题*/}
          <h3 className="Auth-form-title">Sign up</h3>
          {/*登录跳转*/}
          <div className="text-center">
            Has registered?{' '}
            <a href="/login" className="link-primary">Login</a>
            <p></p>
          </div>

          {/*邮箱输入*/}
          <Form.Item
            name="email"
            label="Email address"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              type="email"
              placeholder="Please enter email"
              onChange={value => {setEmail(value.target.value)}}
            />
          </Form.Item>

          {/*发送验证码*/}
          {<EmailCode email={email}/>}

          <p></p>

          {/*验证码*/}
          <Form.Item
            name="code"
            label="Code"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              type="text"
              placeholder="Please enter code"
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

          <Form.Item
            name="confirm_password"
            label="Confirm Password"
            dependencies={['password']}
            rules={[
              {
                required: true,
              },
              ({ getFieldValue }) => ({
                validator (_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('The two passwords that you entered do not match!'))
                },
              }),
            ]}
          >
            <Input
              placeholder="Please confirm password"
              type="password"
            />
          </Form.Item>

          <div>
            <Button htmlType="submit" type="primary" block>
              Signup
            </Button>
          </div>

        </div>
      </Form>
    </div>
  )
}

export default Signup