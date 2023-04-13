import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import GoalForm from '../components/GoalForm'

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
            <section
            className='heading'
            >
                <h1>Welcome {user && user.name}</h1>
            </section>
            <GoalForm/>
            
        </div>
    )
}

export default Dashboard
