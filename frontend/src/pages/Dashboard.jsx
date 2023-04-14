// eslint-disable-next-line
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import GoalForm from '../components/GoalForm'
import Spinner from '../components/Spinner' 
import { getGoals, reset } from '../features/goals/goalSlice'
import { GoalItem } from '../components/GoalItem'

const Dashboard = () => {
    //const [v , setv] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    const { goals, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.goals
    )


    useEffect(() => {
        if(isError){
            console.log("Goal Error Message ======>",message)
        }

        if (!user) {
            navigate('/login')
        }

        dispatch(getGoals())

        // return ()=>{
        //     dispatch(reset())
        // }
        //console.log("Goals=========>",goals)

    }, [user, navigate, isError, message, dispatch ])


    if(isLoading){
        return <Spinner/>
    }

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

            <section className='content'>
              { goals.length > 0 ? (
                <div className="goals">
                        {console.log("DashBoard Goals========>",goals)}
                        {goals.map((goal)=>(
                            <GoalItem key={goals._id} goal={goal}/>
                        )
                               
                        )
                        }
                    </div>
              ):(
                <h3>You have Not Set Any Goals</h3>
              )}
                   
               
            </section>
            
        </div>
    )
}

export default Dashboard
