'use client'
import React,{useState} from 'react'
import { useRouter } from 'next/navigation'

const TicketForm = () => {

    const router = useRouter()
    const handlechange = (e) => {
        const value = e.target.value;
        const name = e.target.name;

        setFormData((prevState) => ({
            ...prevState,
            [name]:value
        }))
    }

    const startingTicketData = {
        title:"",
        description:"",
        priority:1,
        progress:0,
        status:'Not Started',
        category:'Hardware Problem'
    }

    const [formData, setFormData] = useState(startingTicketData)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await fetch('/api/Tickets',{
            method:'POST',body:JSON.stringify({formData}),
            'content-type':'application/json'
        })
        if (!res.ok){
            throw new Error('Failed to create Ticket')
        }
        router.refresh()
        router.push('/')
    }

  return (
    <div className='flex justify-center'>
        <form className='flex flex-col gap-3 w-1/2' method='post' onSubmit={handleSubmit}>
            <h3>Create Your Ticket</h3>
            <label>Title</label>
            <input id='title' name='title' type='text' onChange={handlechange} required={true} value={formData.title}/>
            <label>Description</label>
            <textarea id='description' name='description' onChange={handlechange} required={true} value={formData.description} rows='5'/>

            <label>Category</label>
            <select name='category' value={formData.category} onChange={handlechange}>
                <option value='Hardware Problem'>Hardware Problem</option>
                <option value='Software Problem'>Software Problem</option>
                <option value='Project'>Project</option>
            </select>

            <label>Priority</label>
            <div>
                <input id='priority-1' name='priority' type='radio' onChange={handlechange} value={1} checked={formData.priority == 1}/>
                <label>1</label>
                <input id='priority-2' name='priority' type='radio' onChange={handlechange} value={2} checked={formData.priority == 2}/>
                <label>2</label>
                <input id='priority-3' name='priority' type='radio' onChange={handlechange} value={3} checked={formData.priority == 3}/>
                <label>3</label>
                <input id='priority-4' name='priority' type='radio' onChange={handlechange} value={4} checked={formData.priority == 4}/>
                <label>4</label>
                <input id='priority-5' name='priority' type='radio' onChange={handlechange} value={5} checked={formData.priority == 5}/>
                <label>5</label>
            </div>
            <label>Progress</label>
            <input type='range' id='progress' name='progress' value={formData.progress} min='0' max='100' onChange={handlechange}/>
            <label>Status</label>
            <select name='status' value={formData.status} onChange={handlechange}>
            <option value='Not Started'>Not Started</option>
            <option value='Started'>Started</option>
            <option value='Done'>Done</option>
            </select>
            <input type='submit' className='btn' value='Create Ticket'/>
        </form>
    </div>
  )
}

export default TicketForm