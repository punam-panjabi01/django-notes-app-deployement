import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'

const NotePage = () => {
    let { id } = useParams()
    let navigate = useNavigate()
    let [note, setNote] = useState({ body: '' })

    useEffect(() => {
        let getNote = async () => {
            if (id === 'new') return
            let response = await fetch('/api/notes/' + id)
            let data = await response.json()
            setNote(data)
        }
        getNote()
    }, [id])

    let createNote = async () => {
        await fetch('/api/notes/create/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ body: note.body, updated: new Date() })
        })
    }

    let updateNote = async () => {
        await fetch('/api/notes/' + id + '/update/', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ body: note.body, updated: new Date() })
        })
    }

    let deleteNote = async () => {
        await fetch('/api/notes/' + id + '/delete/', {
            method: 'DELETE'
        })
        navigate('/')
    }

    let handleSubmit = async () => {
        if (id !== 'new' && !note.body) {
            await deleteNote()
        } else if (id !== 'new') {
            await updateNote()
        } else if (id === 'new' && note.body) {
            await createNote()
        }
        navigate('/')
    }

    return (
        <div className='note'>
            <div className="note-header">
                <h3>
                    <Link to="/">
                        <ArrowLeft onClick={handleSubmit}/>
                    </Link>
                </h3>
                {id !== 'new' ? (
                    <button onClick={deleteNote}>Delete</button>
                ) : (
                    <button onClick={handleSubmit}>Save</button>
                )}
            </div>
            <div className="note-body">
                <textarea
                    style={{
                        color: '#ffffff',
                        backgroundColor: 'transparent',
                        width: '100%',
                        height: '300px',
                        border: 'none',
                        outline: 'none',
                        fontSize: '18px'
                    }}
                    onChange={(e) => { setNote({ body: e.target.value }) }}
                    value={note?.body || ''}
                    placeholder="Type note here..."
                ></textarea>
            </div>
        </div>
    )
}

export default NotePage
