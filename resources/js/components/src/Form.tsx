import React, { useState } from 'react'
import { toast } from 'react-toastify'

interface Props {
    requestAllDevs: Function
}

export const Form = ({ requestAllDevs }: Props) => {
    const [ dev, setDev ] = useState({ nome: '', sexo: '', hobby: '', datanascimento: '' })

    const handleData = (key: string, value: string) => {
        setDev({ ...dev, [key]:value })
    }

    const sendData = async () => {
        const keys = ['nome', 'sexo', 'hobby', 'datanascimento']
        let showWarn = false

        keys.map((key: string) => {
            //@ts-ignore
            if (!dev[key]?.toString())
                showWarn = true
        })

        if (showWarn)
            toast.warn('Por favor, preencha todos os campos')
        else {
            await fetch('/api/developers', {
                method: 'post',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(dev)
            })
                .then(res => res.json())
                .then(json => {
                    requestAllDevs()
                    setDev({ nome: '', sexo: '', hobby: '', datanascimento: '' })
                    toast.success('Cadastro realizado com sucesso!')
                })
                .catch(err => {
                    console.error(err)
                    toast.error('Não foi possível realizar o cadastro. Entre em contato com o administrador.')
                })
        }
    }

    return (
        <>
            <div
                className={'modal-dialog modal-dialog-centered modal-lg'}
                role={'document'}
            >
                <div className={'p-4 modal-content'}>
                    <div className={'d-grid gap-2 d-flex justify-content-end'}>
                        <button
                            type={'button'}
                            title={'Fechar'}
                            className={'btn btn-light ms-2'}
                            data-bs-target={'#formModal'}
                            data-bs-dismiss={'modal'}
                            aria-expanded={'false'}
                            aria-controls={'formModal'}
                        >
                            <i className='bi-x-circle'></i>
                        </button>
                    </div>

                    <div className={'form-group pb-3 col-12'}>
                        <label htmlFor={'nome-input'}>Nome:</label>
                        <input
                            type={'text'}
                            className={'form-control'}
                            id={'nome-input'}
                            value={dev.nome}
                            onChange={({ target}) => handleData('nome', target.value)}
                        />
                    </div>

                    <div className={'form-group pb-3 col-12'}>
                        <label htmlFor={'sexo-input'}>Sexo:</label>
                        <input
                            type={'text'}
                            className={'form-control'}
                            id={'sexo-input'}
                            value={dev.sexo}
                            onChange={({ target}) => handleData('sexo', target.value)}
                        />
                    </div>

                    <div className={'form-group pb-3 col-12'}>
                        <label htmlFor={'hobby-input'}>Hobby:</label>
                        <input
                            type={'text'}
                            className={'form-control'}
                            id={'hobby-input'}
                            value={dev.hobby}
                            onChange={({ target}) => handleData('hobby', target.value)}
                        />
                    </div>

                    <div className={'form-group pb-3 col-12'}>
                        <label htmlFor={'data-input'}>Data de nascimento:</label>
                        <input
                            type='date'
                            className={'form-control'}
                            id={'data-input'}
                            value={dev.datanascimento}
                            onChange={({ target}) => handleData('datanascimento', target.value)}
                        />
                    </div>

                    <div className={'p-2'}>
                        <button
                            className={'btn btn-success py-1 px-4'}
                            onClick={sendData}
                        >
                            Salvar
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
