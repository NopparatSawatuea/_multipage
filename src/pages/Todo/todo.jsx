import { useState, useEffect, useRef } from 'react'

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import { fetchTodos } from '../../deta/todos'

import './Todo.css'

const initItemPerPage = 10
const initOnlyWaiting = false

function Todo () {
    // todosRaw -> filter -> todos -> display
    // read todoRaw
    const [todosRaw, setTodosRaw] = useState([])

    const [todos, setTodos] = useState([])

    const [onlyWaiting, setOnlyWaiting] = useState(false)

    const [itemPerPage, setItemPerPage] = useState(10)

    const [numPages, setNumPages] = useState(0)

    const [curPage, setCurPage] = useState(0)

    useEffect( () => {
        console.log(`itemPerPage: ${itemPerPage}`)
        setNumPages( Math.ceil( todos.length / itemPerPage ) )
        setCurPage(1)
    }, [itemPerPage, todos.length] )

    useEffect( () => {
        console.log(`onlyWaiting: ${onlyWaiting}`)
    }, [onlyWaiting] )

    useEffect( () => {
        setTodosRaw( fetchTodos() )
    }, [] ) //load

    useEffect(() => {
        if (onlyWaiting) {
            // display only "waiting" (completed = false)
            setTodos( todosRaw.filter( todo => !todo.completed ) )
        } else {
            // display all0
            setTodos(todosRaw)
        }
    })

    // useEffect( () => {
    //     setTodos( todosRaw )
    // }, [todosRaw, onlyWaiting] )

    //event handler
    function deleteClick(id) {
        const todosRemain = todosRaw.filter( (todo) => {
            return todo.id !== id
        })

        setTodosRaw( todosRemain )
    }

    function waitingClick(id) {
        const todoSelected = todosRaw.find( (todo) => {
            return todo.id === id
        })

        todoSelected.completed = true

        setTodosRaw( todosRaw )//don't work, state is not changed
        setTodosRaw([...todosRaw])//ok
    }

    function addClick(id, title) {
        const newItem = {
            id,
            title,
            completed: false,
            userId: 1
        }
        setTodosRaw( [...todosRaw, newItem] )
    }

    //modal handler
    const [show, setShow] = useState(false);

    const newIdRef = useRef()
    const newTitleRef = useRef()

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className='todo-container'>
            {/* modal */}
            <Modal show={show} onHide={handleClose}>

        <Modal.Header closeButton>
          <Modal.Title><span className='bi bi-plus-lg'>&nbsp;Add Todo</span></Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>ID:</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                disbled
                value={
                    Number(todosRaw.reduce( (prev, todo) => {
                        return todo.id > prev ? todo.id : prev
                    }, 0)) + 1
                }
                ref={newIdRef}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Title:</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                ref={newTitleRef}
              />
            </Form.Group>
            </Form>
        </Modal.Body>
        
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            <span className='bi bi-x-lg'>
            &nbsp;Cancel</span>
          </Button>
          <Button variant="primary" onClick={ () => {
            //????
            const id = newIdRef.current.value
            const title = newTitleRef.current.value.trim()
            if (title === '') {
                alert('Title cannot be empty')
                newIdRef.current.value = ''
                newTitleRef.current.focus()
            } else {
                addClick(id, title)
                handleClose()
            } 
            }}>
            <span className='bi bi-plus-lg'>
            &nbsp;Add</span>
          </Button>
        </Modal.Footer>
      </Modal>
      

            {/* filters */}
            <div className='todo-filter-container'>
            <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" onClick={ (e) => {setOnlyWaiting(e.target.checked) } } />
  <label className="form-check-label" htmlFor="flexSwitchCheckChecked">show only&nbsp;  <button className='btn btn-warning'>waiting&nbsp;<span className='bi bi-clock'></span></button></label>
</div>
<select className="form-select" aria-label="Default select example" style={{width: '200px'}} onChange={ (e) => {setItemPerPage(e.target.value) } }>
  <option value={5}>5 items per pages</option>
  <option value={10}>10 items per pages</option>
  <option value={50}>50 items per pages</option>
  <option value={100}>100 items per pages</option>
</select>
</div>
            {/* table */}
            <table className='table table-striped table-table'>
                <thead className='table-dark'>
                    <tr>
                        <th style={{textAlign: 'right', width: '10%'}} valigen='middle'>ID</th>
                        <th valigen='middle'>Title</th>
                        <th style={{textAlign: 'right', width: '20%'}} valigen='middle'>
                            Completed&nbsp;
                            <button className='btn btn-primary' onClick={handleShow}>
                                <span className='bi bi-plus-lg'></span>
                            </button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                 

                { todos.filter( (todo, index) => {
                    const min = (curPage - 1) * itemPerPage
                    const max = curPage * itemPerPage - 1
                    return index >= min && index <= max
                    } ).map((todo) => {
                        return (
                            <tr key={todo.id}>
                        <td valign='middle'><span className='badge bg-secondary' style={{width: '3rem'}}>{todo.id}</span></td>
                        <td style={{textAlign: 'left'}} valign='middle'>{todo.title}</td>
                        <td style={{textAlign: 'right'}} valign='middle'>
                            {todo.completed ? (
                                <span className='badge bg-success'>
                                    done&nbsp;
                                    <span className='bi bi-check'></span>
                                </span>
                            ) : (
                                <button
                                    className='btn btn-warning'
                                    onClick={() => {
                                        waitingClick(todo.id)
                                    }}
                                >
                                    waiting&nbsp;
                                    <span className='bi bi-clock'></span>
                                </button>
                            )}
                            &nbsp;
                            <button className='btn btn-danger' onClick={() => {deleteClick(todo.id)}}>
                            <span className='bi bi-trash'></span>
                            </button>
                            </td>
                    </tr>
                        )
                    })}

                </tbody>
            </table>

            {/* page control */}
            <div>
                <button className='btn btn-outline-primary todo-spacing'onClick={() => setCurPage(1)} disabled={curPage <= 1}>First</button>
                <button className='btn btn-outline-primary todo-spacing' onClick={() => { curPage > 1 && setCurPage(curPage - 1)} } disabled={curPage <= 1}>Previous</button>
                <span className='todo-spacing'>{curPage}&nbsp;/&nbsp;{numPages}</span>
                <button className='btn btn-outline-primary todo-spacing' onClick={() => { curPage < numPages && setCurPage(curPage + 1)} } disabled={curPage >= numPages}>Next</button>
                <button className='btn btn-outline-primary todo-spacing' onClick={() => setCurPage(numPages)} disabled={curPage >= numPages}>Last</button>
            </div>
        </div>
    )
}

export default Todo