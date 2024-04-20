import React, { useEffect, useState } from 'react'
import { SyncLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { createTask, getTasks, setEditTaskData, updateTask } from '../../store/slices/taskSlice';

const Modal = ({ setShowModal, editTaskData }) => {
    // console.log("editTaskData", editTaskData)
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()
    const [initialData, setInitialData] = useState({
        title: editTaskData ? editTaskData.title : "",
        description: editTaskData ? editTaskData.description : ""
    })
    // console.log("intialData =>", initialData)


    const handleInput = (event) => {
        const { value, id } = event.target
        setInitialData((preVal) => ({ ...preVal, [id]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!initialData.title.trim() || !initialData.description.trim()) {
            toast.error("Please fill all the required fields");
            return;
        }
        setLoading(true)
        try {
            if (editTaskData) {
                await dispatch(updateTask({ id: editTaskData._id, formData: initialData }))
                dispatch(getTasks())
                dispatch(setEditTaskData(null))
            } else {
                dispatch(createTask(initialData))
                dispatch(setEditTaskData(null))
            }

            setLoading(false)
            setShowModal(false)
        } catch (error) {
            setLoading(false)
            dispatch(setEditTaskData(null))
        }
    }

    return (
        <>
            <div id="crud-modal" tabIndex={-1} aria-hidden="true" className=" overflow-y-auto overflow-x-hidden fixed top-0 right-50 left-50 z-50 justify-center items-center w-full mt-20 flex max-h-full" >
                <div className="relative p-4 w-full max-w-md max-h-full ">
                    {/* Modal content */}
                    <div className="relative bg-[#1f2937] rounded-lg shadow-md shadow-black ">
                        {/* Modal header */}
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                            <h3 className="text-lg font-semibold text-white ">
                                Create New Task
                            </h3>
                            <button
                                type="button"
                                className="text-red-500 bg-transparent hover:bg-white transition-all duration-200 ease-in-out hover:text-red-600 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
                                data-modal-toggle="crud-modal"
                                onClick={() => setShowModal(false)}
                            >
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" >
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        {/* Modal body */}
                        <form className="p-4 md:p-5">
                            <div className="grid gap-4 mb-4 grid-cols-2">
                                <div className="col-span-2">
                                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-white"
                                    >
                                        Title
                                    </label>
                                    <input type="text" name="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5   dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type your title" required=""
                                        id="title"
                                        value={initialData.title}
                                        onChange={handleInput}
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-white" >
                                        Description
                                    </label>
                                    <textarea rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500   dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write title description here"
                                        id="description"
                                        value={initialData.description}
                                        onChange={handleInput}
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                onClick={handleSubmit}
                            >

                                {loading ?
                                    <SyncLoader size={8} color="#fff" />
                                    :
                                    editTaskData ? "Update Task" : "Add Task"
                                }

                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Modal