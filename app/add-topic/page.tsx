"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

const AddTopic = () => {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const router = useRouter()

    const handleSubmit = async (e:  React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(!title || !description){
            alert("Title and Description are required")
            return
        }

        try {
            const response = await fetch("http://localhost:5000/api/topics", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({title, description})
            })
            if(response.ok){
                router.push('/')
                router.refresh()
            } else {
                throw new Error("Faild to create Topic")
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <input className="border border-slate-500 px-3 py-2"
                onChange={(e)=>setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder="Topic Title"
            />
            <input className="border border-slate-500 px-3 py-2"
                onChange={(e)=>setDescription(e.target.value)}
                value={description}
                type="text"
                placeholder="Topic Description"
            />
            <button type="submit" className="bg-yellow-600 text-white font-bold px-6 py-3 w-fit">
                Add Topic
            </button>
        </form>
    )
}

export default AddTopic
