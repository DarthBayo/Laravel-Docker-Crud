import React from 'react'

interface Props {
    requestAllDevs: Function | any
}

export const Buttons = ({ requestAllDevs }: Props) => {
    return (
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
                data-bs-toggle={'collapse'}
                data-bs-target={'#formCollapsable'}
                aria-expanded={'false'}
                aria-controls={'formCollapsable'}
            >
                <i className={'bi bi-plus-circle'}></i>
                &nbsp;
                Novo
            </button>
        </article>
    )
}
