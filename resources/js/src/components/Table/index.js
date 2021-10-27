import React from 'react'
import { Button, Table } from 'react-bootstrap'

export default ({ devs, handleUpdateData }) => (
    <Table
        hover
        size={'sm'}
        responsive
    >
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
                devs?.map((dev, key) => (
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
                            <Button
                                title={'Editar'}
                                variant={'warning'}
                                onClick={() => handleUpdateData(dev)}
                            >
                                <i className={'bi bi-pencil'}></i>
                            </Button>
                        </td>
                    </tr>
                ))
            }
        </tbody>
    </Table>
)