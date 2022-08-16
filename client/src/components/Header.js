import { Link } from 'react-router-dom';
import { useState } from 'react'; 
import Navbar from './Navbar';

export default function Header() {
    // State 
    const [filter, setFilter] = useState('')

    return (
        <header id="header">
            <div id="header-left">
                <Link to="/">
                    <div className="pic-div">
                        <img
                            id="friends-book-logo"
                            src={require('../images/friends-book-logo.png')}
                            alt="Picture of company logo"
                        />
                    </div>
                </Link>
                <div id="header-input">
                    <input
                        id="header-search"
                        onChange={e => setFilter(e.target.value)}
                        value={filter}
                        placeholder="Search Friends Book"

                    />
                </div>
            </div>
            <div id="header-center" />
            <Navbar />
        </header>
    )
}
