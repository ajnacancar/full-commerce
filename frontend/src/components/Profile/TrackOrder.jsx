import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function TrackOrder() {
    const { orders, isLoading } = useSelector((state) => state.order);
    const { user } = useSelector((state) => state.user);
    const { id } = useParams();
  
    const dispatch = useDispatch();
  return (
    <div>TrackOrder</div>
  )
}

export default TrackOrder