import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import Tree from '../../components/Tree';

import { tree } from '../../redux/Slice/TreeSlice'

import './Main.css'

const Main = () => {

    const dispatch = useDispatch();
    const [data, setData] = useState([])
    useEffect(() => { getTrees() }, [])

    async function getTrees() {
        let data = await dispatch(tree())
        console.log(data, 'this is data');
        setData(data.payload.data)
    }

    return (
        <>
        Welcome to Nested Tree Creation
        {data.length > 0 ?  <Tree data={data}/> : "loading"}
        </>
    )
}

export default Main