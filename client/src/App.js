import React from 'react';
import Header from "./components/common/common-user/Header";
import Home from "./pages/common-pages/Home";
import './App.css';

function App() {
    return (
        <div className="min-h-screen">
            <Header />
            <main className="mx-auto">
                <Home />
            </main>
        </div>
    );
}

export default App;