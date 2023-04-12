import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
    //const [v , setv] = useState("")
    const navigate = useNavigate()

    const { user } = useSelector((state) => state.auth)

    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
    }, [user, navigate])

    return (
        <div
            style={{
                backgroundImage: 'linear-gradient(white,yellow)',
                color: 'darkred',
            }}
        >
            Dashboard
        </div>
    )
}

export default Dashboard
