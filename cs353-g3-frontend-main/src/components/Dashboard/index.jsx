import React, { useState, useEffect } from 'react'
import './index.css'
import Board from 'react-trello'
import {
  BoardRetrieveAPI,
  LaneAddAPI,
  LaneUpdateAPI,
  LaneDeleteAPI,
  CardAddAPI,
  CardUpdateAPI,
  CardDeleteAPI
} from '../../services/api'
import { message } from 'antd'
import { useParams } from 'react-router-dom'

export default function Dashboard () {

  const params = useParams()
  const _id = params.id

  const [data, setData] = useState({ 'lanes': [] })

  const get_board = () => {
    BoardRetrieveAPI({
      _id: _id
    }).then(
      res => {
        const { code, msg, data } = res
        if (code === 200) {
          setData(data)
        } else {
          message.error(msg)
        }
      }
    )
  }

  useEffect(() => {
    get_board()
    setInterval(() => {get_board()}, 1000)
  }, [])

  const handleLaneAdd = (params) => {
    LaneAddAPI({
      '_id': _id,
      'title': params.title
    }).then(
      res => {
        const { code, msg } = res
        if (code === 200) {
          get_board()
        } else {
          message.error(msg)
        }
      }
    )
  }

  const handleLaneDelete = (laneId) => {
    LaneDeleteAPI({
      '_id': _id,
      'lane_id': laneId
    }).then(
      res => {
        const { code, msg } = res
        if (code === 200) {
          get_board()
        } else {
          message.error(msg)
        }
      }
    )
  }

  const handleLaneUpdate = (laneId, data) => {
    LaneUpdateAPI({
      '_id': _id,
      'lane_id': laneId,
      'data': data,
      'change_type': 'update'
    }).then(
      res => {
        const { code, msg } = res
        if (code === 200) {
          get_board()
        } else {
          message.error(msg)
        }
      }
    )
  }

  const handleLaneDragEnd = (removedIndex, addedIndex) => {
    LaneUpdateAPI({
      '_id': _id,
      'lane_id': removedIndex,
      'target': addedIndex,
      'change_type': 'move'
    }).then(
      res => {
        const { code, msg } = res
        if (code === 200) {
          get_board()
        } else {
          message.error(msg)
        }
      }
    )
  }

  const handleCardAdd = (card, laneId) => {
    CardAddAPI({
      '_id': _id,
      'lane_id': laneId,
      'card': card
    }).then(
      res => {
        const { code, msg } = res
        if (code === 200) {
          get_board()
        } else {
          message.error(msg)
        }
      }
    )
  }

  const handleCardDelete = (cardId, laneId) => {
    CardDeleteAPI({
      '_id': _id,
      'lane_id': laneId,
      'card_id': cardId
    }).then(
      res => {
        const { code, msg } = res
        if (code === 200) {
          get_board()
        } else {
          message.error(msg)
        }
      }
    )
  }

  const handleCardUpdate = (laneId, data) => {
    CardUpdateAPI({
      '_id': _id,
      'lane_id': laneId,
      'data': data,
      'change_type': 'update'
    }).then(
      res => {
        const { code, msg } = res
        if (code === 200) {
          get_board()
        } else {
          message.error(msg)
        }
      }
    )

  }

  const handleDragEnd = (cardId, sourceLaneId, targetLaneId, position) => {
    CardUpdateAPI({
      '_id': _id,
      'card_id': cardId,
      'lane_id': sourceLaneId,
      'target_lane_id': targetLaneId,
      'target_card_id': position,
      'change_type': 'move'
    }).then(
      res => {
        const { code, msg } = res
        if (code === 200) {
          get_board()
        } else {
          message.error(msg)
        }
      }
    )
  }

  return (
    <div>
      <h3 style={{
        textAlign: 'center',
        padding:"5px",
        color:"rgb(58,58,58)",
        background:"white", }}>Group Project</h3>
      <Board
        data={data}
        editable
        draggable
        canAddLanes
        editLaneTitle

        onLaneAdd={handleLaneAdd}
        onLaneDelete={handleLaneDelete}
        onLaneUpdate={handleLaneUpdate}
        handleLaneDragEnd={handleLaneDragEnd}

        onCardAdd={handleCardAdd}
        onCardDelete={handleCardDelete}
        onCardUpdate={handleCardUpdate}
        handleDragEnd={handleDragEnd}

        style={{ height: '786px', background: "rgba(231, 13, 13, 0); !important" }}
      />
    </div>
  )
}