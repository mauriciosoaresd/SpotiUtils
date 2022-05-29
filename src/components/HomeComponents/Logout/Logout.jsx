import React, { useEffect } from 'react'

import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux"
import { actionCreators } from '../../../redux/actions/index'

const Logout = () => {
    const dispatch = useDispatch();
    const { requestLogout }= bindActionCreators(actionCreators, dispatch)

    useEffect(() => {
        requestLogout()
        window.location = '/'
        return () => {}
    },[])

    return (
        <>
        </>
    )
}

export default Logout;