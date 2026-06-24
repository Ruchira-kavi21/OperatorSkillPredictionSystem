import {Link} from "react-router-dom";

function Sidebar(){
    return (
        <div className="w-64 min-h-screen bg-slate-900 text-white">
            <div className="p-6 border-b border-slate-700">
                <h1>Skill System</h1>
            </div>

            <nav className="p-4">
                <ul className="space-y-2">
                    <li>
                        <Link to="/dashboard" className="block p-3 rounded hover:bg-slate-700">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/predict" className="block p-3 rounded hover:bg-slate-700">Prediction</Link>
                    </li>
                    <li>
                        <Link to="/history" className="block p-3 rounded hover:bg-slate-700">History</Link>
                    </li>
                    <li>
                        <Link to="/analytics" className="block p-3 rounded hover:bg-slate-700">Analytics</Link>
                    </li>
                    <li>
                        <Link to="/explainability" className="block p-3 rounded hover:bg-slate-700">Explainability</Link>
                    </li>
                    <li>
                        <Link to="/operators" className="block p-3 rounded hover:bg-slate-700">Operators</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Sidebar;