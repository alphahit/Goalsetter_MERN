import React from 'react'
import { useDispatch } from 'react-redux'
import {deleteGoal} from '../features/goals/goalSlice'

export const GoalItem = ({ goal }) => {
  const dispatch = useDispatch()
    return (
        <div className="goal">
            <div>{new Date(goal.createdAt).toLocaleString('en-US')}</div>
            {console.log("Goal Item Prop==========>", goal)}
            <h2>{goal.text}</h2>
            <button  
            className='close'
            onClick={()=> dispatch(deleteGoal(goal._id))}
            >X</button>
        </div>
    )
}
