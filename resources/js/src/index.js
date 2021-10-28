import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

import { Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import FormModal from './components/FormModal'
import TableList from './components/TableList'

const App = () =>  {
    const [ devs, setDevs ] = useState([])
    const [ isVisible, setIsVisible ] = useState(false)
    const [ devToUpdate, setDevToUpdate ] = useState([])

    /** Altera o status do modal */
    const toggleVisibility = () => setIsVisible(!isVisible)

    /** Ajusta para permitir a edição do dev */
    const handleUpdateData = (dev) => {
        setDevToUpdate(dev)
        toggleVisibility()
    }

    /** Limpar dados para atualizar */
    const handleClearUpdate = () => setDevToUpdate([])

    /** Faz a request dos devs */
    const requestAllDevs = async () => {
        await fetch('/api/developers', {
            method: 'get'
        })
            .then(res => res.json())
            .then(json => setDevs(json))
            .catch(err => console.error(err))
    }
    useEffect(() => {
        requestAllDevs()
    }, [''])

    return (
        <>
            <main className={'d-flex flex-column pt-5 w-100 h-100'}>
                <section className={'w-100 pb-2 d-flex flex-column'}>
                    <article className={'d-grid gap-2 d-flex justify-content-end'}>
                        <Button
                            title={'Recarregar'}
                            variant={'light'}
                            onClick={requestAllDevs}
                        >
                            <i className='bi bi-arrow-clockwise'></i>
                        </Button>

                        <Button
                            variant={'primary'}
                            onClick={toggleVisibility}
                        >
                            Novo
                        </Button>
                    </article>

                    <article>
                        <FormModal
                            isVisible={isVisible}
                            toggleVisibility={toggleVisibility}
                            requestAllDevs={requestAllDevs}
                            devToUpdate={devToUpdate}
                            handleClearUpdate={handleClearUpdate}
                        />
                    </article>
                </section>

                <section className={'w-100 border border-1 rounded overflow-auto'}>
                    <TableList
                        devs={devs}
                        handleUpdateData={handleUpdateData}
                    />
                </section>
            </main>
            <ToastContainer />
        </>
    )
}

ReactDOM.render(<App />, document.getElementById('app'))
