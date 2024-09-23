import React from 'react'
import { Layout, Menu, Avatar, message } from 'antd'
import {
  UserOutlined,
  UploadOutlined,
  VideoCameraOutlined,
  ProjectOutlined,
} from '@ant-design/icons'
import top_left_image from './assents/top_left.png'
import weather from './assents/weather.png'
import Project from './pages/list'
import { useNavigate } from 'react-router-dom'
import background from "./assents/background.png"

const { Header, Footer, Sider, Content } = Layout

const App = () => {

  const navigate = useNavigate()

  const handleClick = e => {
    if (e.key === '') {
      navigate('/'+e.key)
    }
    else{
      message.success('not yet developed')
    }
  };

  return (

    <Layout>
      <Sider
        style={{
          background: 'skyblue',
          height: '100vh'
        }}>
        <div className="logo"/>
        <img src={top_left_image} alt=""/>
        <Menu
          onClick={handleClick}
          items={[
            {
              key: '',
              icon: <ProjectOutlined/>,
              label: 'Board',
            },
            {
              key: 'group',
              icon: <UserOutlined/>,
              label: 'Group',
            },
            {
              key: 'video',
              icon: <VideoCameraOutlined/>,
              label: 'Video',
            },
            {
              key: 'upload',
              icon: <UploadOutlined/>,
              label: 'Upload',
            },
          ]}
        />
      </Sider>

      <Layout>
        <Header
          style={{
            background: 'skyblue',
            padding: '0 20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '79px'
          }}>
          <h3>
            5°C - 12°C
            <img src={weather} alt=""/>
            Maynooth, County Kildare
          </h3>
          <h2>Have a good day!</h2>
          <Avatar size={64} icon={<UserOutlined/>} onClick={()=>{navigate('/login')}}/>
        </Header>

        <Content
        style={{
          backgroundImage: `url(${background})`,
          width:'100%',
          height:'40%',
          backgroundSize: '100% 100%',
        }}>
          {<Project/>}
        </Content>

        <Footer
          style={{
            textAlign: 'center',
            background: 'rgba(66,73,74,1)',
            color:"white",
            textShadow: "0px 0px 9px rgba(0,0,0,1)",
            width: '100%',
            display: 'fixed',
            bottom: '0',
          }}>
          &copy;By AndyW, Jessica, Kellegherkian, Maks, Scammy, Yi
        </Footer>
      </Layout>

    </Layout>
  )
}

export default App