'use client'

import { useRouter } from "next/navigation"
import { useState } from "react"

interface EditTopicFormProps {
    id: string;
    title: string;
    description: string;
}

const EditTopicForm: React.FC<EditTopicFormProps> = ({ id, title, description }) => {
    const [newTitle, setNewTitle] = useState(title)
    const [newDescription, setNewDescription] = useState(description)

    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(!newTitle || !newDescription){
            alert("Title and Description are required")
            return
        }
        try {
            const res = await fetch(`http://localhost:5000/api/topics/${id}`, {
                method: 'PUT',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ title: newTitle, description: newDescription })
            })
            if (res.ok) {
                router.push('/')
                router.refresh()
            } else {
                throw new Error("Failed to update Topic")
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
                onChange={e => setNewTitle(e.target.value)}
                value={newTitle}
                className="border border-slate-500 px-3 py-2"
                type="text"
                placeholder="Topic Title"
            />
            <input
                onChange={e => setNewDescription(e.target.value)}
                value={newDescription}
                className="border border-slate-500 px-3 py-2"
                type="text"
                placeholder="Topic Description"
            />
            <button type="submit" className="bg-yellow-600 text-white font-bold px-6 py-3 w-fit">
                Update Topic
            </button>
        </form>
    )
}

export default EditTopicForm
