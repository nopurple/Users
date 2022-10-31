import React, {useEffect, useState} from 'react';
import './index.scss';
import {Success} from './components/Success';
import {Users} from './components/Users';

// Тут список пользователей: https://reqres.in/api/users

function App() {
    const [users, setUsers] = useState([]);
    const [invites, setInvites] = useState([]);
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(true)
    const [searchValue, setSearchValue] = useState('')


    const onChangeSearch = (event) => {
        setSearchValue(event.target.value)
    }
    const onCLickSuccess = () =>{
        setSuccess(true)
    }

    const onClickInvite = (id) => {
        if (invites.includes(id)) {
            setInvites(prev => prev.filter((_id) => _id !== id))
        } else {
            setInvites((prev) => [...prev, id])
        }
    }

    useEffect(() => {
        fetch(`https://reqres.in/api/users`).then(res => res.json()).then(json => {
            setUsers(json.data)
        }).catch(error => {
            console.log(error)
            alert('error add users')
        }).finally(() => setIsLoading(false))
    }, [])

    return (
        <div className="App">
            {
                success ? (<Success/>) : (
                    <Users items={users}
                           isLoading={isLoading}
                           onChangeSearch={onChangeSearch}
                           setSearchValue={setSearchValue}
                           searchValue={searchValue}
                           invites={invites}
                           onClickInvite={onClickInvite}
                           onCLickSuccess={onCLickSuccess}/>
                )
            }
        </div>
    );
}

export default App;
