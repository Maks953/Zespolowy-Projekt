import React, { Fragment, useState, useEffect } from 'react'

import { message } from 'antd'
import { BoardDelete, BoardListAPI } from '../../services/api'
import { Card, List } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import CreateModal from '../../components/CreateModal'

function Project () {

  const navigate = useNavigate()
  const [data, setData] = useState([])

  useEffect(() => {
    BoardListAPI({}).then(
      res => {
        const { code, msg, data } = res
        if (code === 200) {
          setData(data)
        } else {
          message.error(msg)
        }
      }
    )
  }, [])

  const deleteBoard = (_id) => {
    BoardDelete({
      _id: _id
    }).then(
      res => {
        const { code, msg } = res
        if (code === 200) {
          message.success('ok')
          window.location.reload()
        } else {
          message.error(msg)
        }
      }
    )
  }

  return (
    <Fragment>
      <CreateModal/>
      <List
        column={10}
        grid={{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 4 }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Card
              hoverable
              title={item.title}
              style={{ width: 300 }}
              headStyle={{ textAlign: 'center' }}
              bodyStyle={{ textAlign: 'center' }}
              cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" onClick={()=>navigate('/board/'+ item._id)}/>}
              extra={<DeleteOutlined onClick={()=>deleteBoard(item._id)}/>}
            >
              <p>start: {item.start_date}</p>
              <p>end: {item.end_date}</p>
            </Card>
          </List.Item>
        )}
      />
    </Fragment>
  )
}

export default Project