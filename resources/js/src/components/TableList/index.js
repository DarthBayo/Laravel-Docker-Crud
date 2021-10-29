import React from 'react'
import { Button, Table } from 'react-bootstrap'
import { toast } from 'react-toastify'

import { settings } from './../../utils/settings'

export default ({ devs, requestAllDevs, handleUpdateData }) => {

    /** Deleta o dev e remove da lista */
    const deleteDev = async (id) => {
        toast(({ closeToast }) => (
            <div>
                <h6>Deseja realmente excluir esse registro?</h6>
                <div className={'d-flex justify-content-around'}>
                    <Button
                        variant={'success sm'}
                        onClick={closeToast}
                    >
                        Cancelar
                    </Button>

                    <Button
                        variant={'danger sm'}
                        onClick={async () => {
                            await fetch(`${settings.api}/${id}`, {
                                method: 'delete',
                                mode: 'cors',
                            })
                                .then(() => {
                                    requestAllDevs()
                                    toast.success('Registro deletado com sucesso!')
                                })
                                .catch(err => {
                                    console.error(err)
                                    toast.error('Não foi possível realizar o cadastro. Entre em contato com o administrador.')
                                })

                            closeToast()
                        }}
                    >
                        Excluir
                    </Button>
                </div>
            </div>
        ), { autoClose: false })
    }

    return (
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
                            <td>{ new Date(dev.datanascimento).toLocaleDateString('pt-br', { timeZone: 'UTC' }) }</td>
                            <td
                                className={'d-flex justify-content-around'}
                            >
                                <Button
                                    title={'Editar'}
                                    variant={'warning'}
                                    className={'ml-1'}
                                    onClick={() => handleUpdateData(dev)}
                                >
                                    <i className={'bi bi-pencil'}></i>
                                </Button>
                                <Button
                                    title={'Deletar'}
                                    variant={'danger'}
                                    onClick={() => deleteDev(dev.id)}
                                >
                                    <i className={'bi bi-trash'}></i>
                                </Button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </Table>
    )
}
