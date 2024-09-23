import request from './request'

export const signupAPI = (data) => request.post('user/signup/', data)

export const sendEmailCodeAPI = (data) => request.post('user/code/', data)

export const loginAPI = (data) => request.post('user/login/', data)

export const BoardListAPI = (params) => request.get(`board/`, params)

export const BoardCreate = (data) => request.post(`board/`, data)

export const BoardDelete = (data) => request.delete('board/', {data: data})

export const BoardRetrieveAPI = (params) => request.get(`board/${params._id}`)

export const LaneAddAPI = (data) => request.post('board/lane/', data)

export const LaneUpdateAPI = (data) => request.put('board/lane/', data)

export const LaneDeleteAPI = (data) => request.delete('board/lane/', {data: data})

export const CardAddAPI = (data) => request.post('board/card/', data)

export const CardUpdateAPI = (data) => request.put('board/card/', data)

export const CardDeleteAPI = (data) => request.delete('board/card/', {data: data})


// export const UpdateIndexAPI = (data) => request.post('list/get_all_project/', data)