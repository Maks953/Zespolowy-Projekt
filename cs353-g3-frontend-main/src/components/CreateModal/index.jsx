import React, { useState } from 'react'
import { Button, Form, Input, Modal, DatePicker, message } from 'antd'
import { BoardCreate } from '../../services/api'

const { RangePicker } = DatePicker

const CreateModal = () => {

  const [isModalOpen, setIsModalOpen] = useState(false)
  const showModal = () => {
    setIsModalOpen(true)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }
  const onFinish = (values) => {
    const title = values.title
    const start_date = values.date[0]
    const end_date = values.date[1]
    BoardCreate({
      title: title,
      start_date: start_date,
      end_date: end_date
    }).then(
      res => {
        const { code, msg } = res
        if (code === 200) {
          message.success('ok')
          setIsModalOpen(false)
          window.location.reload();
        } else {
          message.error(msg)
        }
      }
    )
  }

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Create board
      </Button>
      <Modal title="Basic Modal" footer={null} open={isModalOpen} onCancel={handleCancel}>

        <Form
          name="basic"
          onFinish={onFinish}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            label="Date"
            name="date"
          >
            <RangePicker/>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>

      </Modal>
    </>
  )
}
export default CreateModal