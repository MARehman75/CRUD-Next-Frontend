'use client'

import { useRouter } from "next/navigation";
import { HiOutlineTrash } from "react-icons/hi"

interface RemoveBtnProps {
  id: string;
}

const RemoveBtn: React.FC<RemoveBtnProps> = ({ id }) => {

  const router = useRouter()

  const removeTopic = async () => {
    const confirmed = confirm("Are you sure?");
    if (confirmed) {
      try {
        const res = await fetch(`http://localhost:5000/api/topics/${id}`, {
          method: "DELETE",
          headers: {
            "content-type": "application/json"
          }
        });
        if (res.ok) {
          router.refresh();
        } else {
          throw new Error("Failed to delete topic");
        }
      } catch (error) {
        console.error("Error deleting topic:", error);
      }
    }
  };
  return (
    <button onClick={removeTopic} className="text-red-400">
      <HiOutlineTrash size={24} />
    </button>
  )
}

export default RemoveBtn
