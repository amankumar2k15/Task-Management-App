import React, { useEffect, useState } from 'react'
import Modal from '../../components/Modal/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTask, deleteTaskOptimistic, getTasks, setEditTaskData } from '../../store/slices/taskSlice'
import { SyncLoader } from 'react-spinners'

const Home = () => {
    const [showModal, setShowModal] = useState(false)
    const [search, setSearch] = useState("")
    const dispatch = useDispatch()
    const { tasks, loading, error, editTaskData } = useSelector((state) => state.root.task)

    const handleAddTask = () => {
        setShowModal(true)
        dispatch(setEditTaskData(null))
    }

    //Getting Task
    useEffect(() => {
        dispatch(getTasks())
    }, [dispatch])

    //Delete Task
    const handleDeleteTask = (e, id) => {
        e.preventDefault()
        dispatch(deleteTask(id))
        dispatch(deleteTaskOptimistic(id))
    }

    //Handle Edit
    const handleEdit = (item) => {
        setShowModal(true)
        dispatch(setEditTaskData(item))
    }

    if (loading) {
        <div className='bg-red-500 text-lg'>
            <SyncLoader size={8} color="#fff" />
        </div>
    }
    if (error) {
        <div className='bg-red-500 mt-10'>Error occuring while fetching the data</div>
    }

    return (
        <div className='mt-20'>
            <>
                <div className="flex flex-col w-full min-h-screen">
                    <main className="flex flex-1 flex-col gap-4 p-2 sm:p-8 md:gap-8 md:p-10">
                        <div className="mx-auto w-full grid gap-4 md:gap-6">
                            <div className="flex flex-col md:flex-row justify-between gap-2">
                                <div>
                                    <h1 className="text-3xl font-bold">My Tasks</h1>
                                    <p className="text-gray-500 dark:text-gray-400">
                                        Here are my current tasks. I'll be productive today!
                                    </p>
                                </div>

                                <div className="relative ">
                                    <input type="search" id="location-search" className="block max-w-[200px] shadow-md shadow-black p-2.5 outline-none z-20 text-sm bg-gray-50 rounded-e-lg rounded-lg  text-black" placeholder="search your task" required=""
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                </div>

                                <button type="button" className="text-white bg-gradient-to-r w-20 h-10 md:w-auto md:h-auto px-2 md:px-5 py-1 from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm text-center me-2 mb-2"
                                    onClick={handleAddTask}
                                >
                                    Add Task
                                </button>
                            </div>
                            <div>
                                {tasks?.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()))
                                    .map((item) => {
                                        return (
                                            <div key={item._id} className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card" >

                                                <div className="space-y-1.5 p-6 flex flex-col md:flex-row md:items-center gap-4">
                                                    <div className='flex flex-row gap-2'>
                                                        <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} xmlns="http://www.w3.org/2000/svg" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8" >
                                                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                                            <polyline points="22 4 12 14.01 9 11.01" />
                                                        </svg>
                                                        <div className="grid gap-1">
                                                            <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
                                                                {item.title}
                                                            </h3>
                                                            <p className="text-sm text-muted-foreground">
                                                                {item.description}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="ml-2 md:ml-auto">
                                                        <button type="button" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                                                            onClick={(e) => handleDeleteTask(e, item._id)}
                                                        >
                                                            Delete
                                                        </button>
                                                        <button type="button" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                                                            onClick={() => handleEdit(item)}
                                                        >
                                                            Edit
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                            </div>
                        </div>
                    </main>
                </div>

                {showModal && <Modal setShowModal={setShowModal} editTaskData={editTaskData} />}
            </>
        </div>


    )
}

export default Home