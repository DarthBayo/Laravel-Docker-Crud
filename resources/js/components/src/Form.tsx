import React, { useState } from 'react'

export const Form = () => {
    const [ nome, setNome ] = useState('')
    const [ sexo, setSexo ] = useState('')
    const [ idade, setIdade ] = useState('')
    const [ hobby, setHobby ] = useState('')
    const [ data, setData ] = useState('')

    const clearFields = () => {
        setNome('')
        setSexo('')
        setIdade('')
        setHobby('')
        setData('')
    }

    return (
        <form
            className={'card card-body'}
            onSubmit={(event) => {
                event.preventDefault()
            }}
        >
            <div className={'d-grid gap-2 d-flex justify-content-end'}>
                <button
                    type={'button'}
                    title={'Fechar'}
                    className={'btn btn-light ms-2'}
                    data-bs-toggle={'collapse'}
                    data-bs-target={'#formCollapsable'}
                    aria-expanded={'false'}
                    aria-controls={'formCollapsable'}
                    onClick={clearFields}
                >
                    <i className='bi-x-circle'></i>
                </button>
            </div>

            <div className={'form-group'}>
                <label htmlFor={'nome-input'}>Nome:</label>
                <input
                    type={'text'}
                    className={'form-control'}
                    id={'nome-input'}
                    value={nome}
                    onChange={({ target }) => {
                        setNome(target.value)
                    }}
                />
            </div>

            <div className={'form-group'}>
                <label htmlFor={'sexo-input'}>Sexo:</label>
                <input
                    type={'text'}
                    className={'form-control'}
                    id={'sexo-input'}
                    value={sexo}
                    onChange={({ target }) => {
                        setSexo(target.value)
                    }}
                />
            </div>

            <div className={'form-group'}>
                <label htmlFor={'idade-input'}>Idade:</label>
                <input
                    type='number'
                    className={'form-control'}
                    id={'idade-input'}
                    value={idade}
                    onChange={({ target }) => {
                        setIdade(target.value)
                    }}
                />
            </div>

            <div className={'form-group'}>
                <label htmlFor={'hobby-input'}>Hobby:</label>
                <input
                    type={'text'}
                    className={'form-control'}
                    id={'hobby-input'}
                    value={hobby}
                    onChange={({ target }) => {
                        setHobby(target.value)
                    }}
                />
            </div>

            <div className={'form-group'}>
                <label htmlFor={'data-input'}>Data de nascimento:</label>
                <input
                    type='date'
                    className={'form-control'}
                    id={'data-input'}
                    value={data}
                    onChange={({ target }) => {
                        setData(target.value)
                    }}
                />
            </div>

            <div className={'pt-2'}>
                <button type={'submit'} className={'btn btn-primary'}>
                    Add
                </button>
            </div>
        </form>
    )
}
