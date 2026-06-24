import {useState} from "react";

function Login(){
    const [role, setRole] = useState("Supervisor");
    return(
        <div className= "min-h-screen bg-slate-100 flex items-center justify-center px-4">
            <div className= "w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-indigo-600">Operator Skill Prediction</h1>
                    <p className= "text-slate-500 mt-2">Apparel Manufacturing Analytics System </p>
                </div>
                <form className= "space-y-5">
                    <div>
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <input type="email" placeholder="Enter your email" className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-indigo-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Password</label>
                        <input type="password" placeholder="Enter your password" className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Role</label>
                        <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                            <option>Admin</option>
                            <option>IE Team</option>
                            <option>Supervisor</option>
                        </select>
                    </div>
                    <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition">Sign In</button>
                </form>
            </div>
        </div>
    )
}

export default Login;