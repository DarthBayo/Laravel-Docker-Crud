import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

import { DevInterface } from './src/interfaces'
import { Buttons } from './src/Buttons'
import { Form } from './src/Form'

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
        <main className={'d-flex flex-column pt-5 w-100 h-100'}>
            <section className={'w-100 pb-2 d-flex flex-column'}>
                <Buttons requestAllDevs={requestAllDevs} />

                <article className={'pt-2 collapse'} id={'formCollapsable'}>
                    <Form />
                </article>
            </section>

            <section className={'w-100 h-75 p-3 border border-1 rounded overflow-auto'}>
                <table className={'table'}>
                    <thead>
                        <tr>
                            <th scope={'col'}>#</th>
                            <th scope={'col'}>Nome</th>
                            <th scope={'col'}>Sexo</th>
                            <th scope={'col'}>Idade</th>
                            <th scope={'col'}>Hobby</th>
                            <th scope={'col'}>Data</th>
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
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </section>
        </main>
    )
}
export default App

ReactDOM.render(<App />, document.getElementById('app'))
