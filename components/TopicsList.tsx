import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";

interface Topic {
    _id: string;
    title: string;
    description: string;
}

interface TopicsResponse {
    topics: Topic[];
}

const getTopics = async (): Promise<TopicsResponse | undefined> => {
    try {
        const response = await fetch("http://localhost:5000/api/topics", {
            cache: 'no-store',
        });
        if (!response.ok) {
            throw new Error("Failed to fetch topics");
        }
        return response.json();
    } catch (error) {
        console.log("Error loading topics:", error);
    }
};

const TopicsList = async () => {
    // agr fail hua to empty array default mein
    const { topics } = (await getTopics()) || { topics: [] };

    return (
        <>
            {topics.map((topic) => (
                <div key={topic._id} className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start">
                    <div>
                        <h2 className="font-bold text-2xl">{topic.title}</h2>
                        <div>{topic.description}</div>
                    </div>
                    <div className="flex gap-2">
                        <RemoveBtn id={topic._id}/>
                        <Link href={`/edit-topic/${topic._id}`}>
                            <HiPencilAlt size={24} />
                        </Link>
                    </div>
                </div>
            ))}
        </>
    );
};

export default TopicsList;
