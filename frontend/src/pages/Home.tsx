import { useState, useEffect } from "react"
import ChatMessage from "../components/ChatMessage"
import { FiSend } from 'react-icons/fi'
import { motion } from 'framer-motion';
import axios from 'axios'
const backendUrl = import.meta.env.VITE_BACKEND_URL;


interface Message {
    text: string;
    align: 'left' | 'right';
    isSelf: boolean;
}



const Home = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [messageText, setMessageText] = useState("")


    const handleSendButtonClick = () => {
        axios.post(
            backendUrl + '/query', 
            { word: messageText }
        )
        .then(response => {
            const meanings = response.data.split(', ').map((meaning: string) => { return { text: meaning, align: 'left', isSelf: false }})

            setMessages(prevMessages => [
                ...prevMessages,
                { text: messageText, align: 'right', isSelf: true },
                ...meanings,
            ])
            setMessageText('')
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <div className='relative w-4/5 m-auto h-[100svh] flex flex-col justify-between'>
            {/* prompts and replies */}
            <section className="overflow-hidden flex flex-col justify-between min-w-80  ">
                <div className="border-b border-gray-700 pb-2 my-7">
                    <h3 className="text-xl font-semibold text-gray-100">✨ Ask AI</h3>
                </div>
                <div className="flex-1 w-full overflow-y-scroll m-auto hide-scrollbar">
                    {messages.map((msg, index) => (
                        <ChatMessage
                            key={index}
                            text={msg.text}
                            align={msg.align}
                            isSelf={msg.isSelf}
                        />
                    ))}
                </div>
            </section>

            {/* input box section */}
            <section className=' w-full left-0 bottom-0  py-4 '>
                <div className="flex w-fit justify-center items-center gap-2 m-auto bg-gray-700  px-4 py-3 rounded-xl">
                    <input
                        type="text"
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        onKeyDown={(e) => {
                            if ((e.key === 'Enter' || e.key == 'Return') && messageText.trim() !== '') {
                                handleSendButtonClick()
                            }
                        }}
                        placeholder='Ask AI'
                        className='text-gray-200 focus:outline-none min-w-96'
                    />
                    <motion.button
                        onClick={handleSendButtonClick}
                        whileTap={{ scale: 1.6 }}
                        transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 2 }}
                    >
                        <FiSend color="#8c929d" />
                    </motion.button>
                </div>
            </section>
        </div>
    )
}

export default Home
