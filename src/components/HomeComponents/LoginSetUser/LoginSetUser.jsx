import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux"
import { actionCreators } from "../../../redux/actions/index"

const LoginSetUser = () => {
    let { token } = useParams();

    const dispatch = useDispatch();
    const { requestLogin }= bindActionCreators(actionCreators, dispatch)

    useEffect(() => {
        requestLogin(token)
        window.location = '/'
        return () => {}
    },[])

    return (
        <>
        </>
    )
}

export default LoginSetUser;