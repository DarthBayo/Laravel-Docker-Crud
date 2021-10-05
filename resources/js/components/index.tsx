import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { Form } from './src/Form'

export interface DevInterface {
    id: Number,
    nome: String,
    sexo: String,
    idade: Number,
    hobby: String,
    datanascimento: String
}

const App = () =>  {
    const [ devs, setDevs ] = useState([])

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
                        <button
                            title={'Recarregar'}
                            className={'btn btn-light ms-2'}
                            onClick={requestAllDevs}
                        >
                            <i className='bi bi-arrow-clockwise'></i>
                        </button>

                        <button
                            title={'Novo'}
                            className={'btn btn-primary'}
                            data-bs-toggle={'modal'}
                            data-bs-target={'#formModal'}
                            aria-expanded={'false'}
                            aria-controls={'formModal'}
                        >
                            <i className={'bi bi-plus-circle'}></i>
                            &nbsp;
                            Novo
                        </button>
                    </article>

                    <article
                        className={'pt-2 modal fade'}
                        id={'formModal'}
                        tabIndex={-1}
                        aria-hidden={'true'}
                    >
                        <Form requestAllDevs={requestAllDevs} />
                    </article>
                </section>

                <section className={'w-100 border border-1 rounded overflow-auto'}>
                    <table className={'table table-sm'}>
                        <thead
                            className={'sticky-top'}
                        >
                            <tr
                                className={'table-dark'}
                            >
                                <th scope={'col'}>#</th>
                                <th scope={'col'}>Nome</th>
                                <th scope={'col'}>Sexo</th>
                                <th scope={'col'}>Idade</th>
                                <th scope={'col'}>Hobby</th>
                                <th scope={'col'}>Data</th>
                                <th scope={'col'}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                devs?.map((dev: DevInterface, key) => (
                                    <tr
                                        key={key}
                                    >
                                        <th scope={'row'}>{ dev.id }</th>
                                        <td>{ dev.nome }</td>
                                        <td>{ dev.sexo }</td>
                                        <td>{ dev.idade }</td>
                                        <td>{ dev.hobby }</td>
                                        <td>{ dev.datanascimento }</td>
                                        <td>
                                            <button
                                                title={'Editar'}
                                                className={'btn btn-warning btn-sm'}
                                            >
                                                <i className={'bi bi-pencil'}></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </section>
            </main>
            <ToastContainer />
        </>
    )
}
export default App

ReactDOM.render(<App />, document.getElementById('app'))
