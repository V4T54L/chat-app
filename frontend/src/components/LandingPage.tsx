import { useState } from "react"
import { useNavigate } from "react-router-dom"

const LandingPage = ({ setUsername }: { setUsername: (username: string) => void }) => {
    const [input, setInput] = useState("")
    const navigate = useNavigate()
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const inp = input.trim()
        if (!inp) {
            return
        }
        setInput("")
        setUsername(inp)
        navigate("/chat")
    }

    console.log("Landing Page Loaded")

    return (
        <div className="bg-gray-900 text-white">
            {/* <!-- Hero Section --> */}
            <section className="hero-animation h-screen flex flex-col justify-center items-center text-center">
                <h1 className="text-5xl font-bold">Chatify</h1>
                <h2 className="text-4xl mt-2">Join the Ultimate Chat Experience!</h2>
                <p className="mt-4 text-lg">Connect with gamers worldwide, chat globally, and level up your conversations!</p>
                <form onSubmit={handleSubmit} className="mt-6">
                    <input type="text" placeholder="Enter your username" value={input} onChange={(e) => setInput(e.target.value)} className="p-2 rounded bg-gray-800 mr-4" />
                    <button type="submit" className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Start Chatting Now</button>
                </form>
            </section>

            {/* <!-- Features Section --> */}
            <section className="py-20 px-4">
                <h2 className="text-4xl font-semibold">Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
                    <div className="bg-gray-800 p-6 rounded-lg transition-transform transform hover:-translate-y-1">
                        <i className="fas fa-globe text-3xl mb-4"></i>
                        <h3 className="text-xl font-semibold">Global Chat</h3>
                        <p>Engage in conversations with users from all over the world.</p>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-lg transition-transform transform hover:-translate-y-1">
                        <i className="fas fa-users text-3xl mb-4"></i>
                        <h3 className="text-xl font-semibold">Group Chat</h3>
                        <p>Join group conversations on your favorite games.</p>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-lg transition-transform transform hover:-translate-y-1">
                        <i className="fas fa-comment-dots text-3xl mb-4"></i>
                        <h3 className="text-xl font-semibold">Private Chat</h3>
                        <p>Chat privately with your friends and meet new ones.</p>
                    </div>
                </div>
            </section>

            {/* <!-- Testimonials Section --> */}
            <section className="testimonial-bg py-20 px-4">
                <h2 className="text-4xl font-semibold text-center">What Our Users Say</h2>
                <div className="mt-6 flex flex-col items-center">
                    <div className="bg-gray-700 p-6 rounded-lg shadow-lg my-4 max-w-md">
                        <p>"Chatify has transformed the way I connect with my friends. The global chat is so much fun!"</p>
                        <p className="mt-3 font-semibold">- Alex G.</p>
                    </div>
                    <div className="bg-gray-700 p-6 rounded-lg shadow-lg my-4 max-w-md">
                        <p>"Best chat app for gamers! I can easily reach out to people who share my interests."</p>
                        <p className="mt-3 font-semibold">- Jordan L.</p>
                    </div>
                    <div className="bg-gray-700 p-6 rounded-lg shadow-lg my-4 max-w-md">
                        <p>"I love the upcoming features like group chats! Can't wait to use them!"</p>
                        <p className="mt-3 font-semibold">- Christina M.</p>
                    </div>
                </div>
            </section>

            {/* <!-- Call to Action Section --> */}
            <section className="py-20 text-center">
                <h2 className="text-3xl font-semibold">Join the Game Now!</h2>
                <div className="mt-6">
                    <button className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Join Chatify</button>
                </div>
            </section>

            {/* <!-- Footer --> */}
            <footer className="bg-gray-800 py-4 text-center">
                <p>&copy; 2023 Chatify</p>
            </footer>
        </div>
    )
}

export default LandingPage