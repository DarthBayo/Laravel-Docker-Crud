import React, { useEffect, useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { toast } from 'react-toastify'

export default ({ isVisible, toggleVisibility, requestAllDevs, devToUpdate }) => {
    const [ dev, setDev ] = useState({ nome: '', sexo: '', hobby: '', datanascimento: '' })

    /** Alterar o state com base na chave informada */
    const handleData = (key, value) => {
        setDev({ ...dev, [key]:value })
    }

    /** Realiza o cadastro ou atualiza o dev */
    const sendData = async () => {
        const keys = ['nome', 'sexo', 'hobby', 'datanascimento']
        let showWarn = false

        keys.map((key) => {
            if (!dev[key]?.toString())
                showWarn = true
        })

        if (showWarn)
            toast.warn('Por favor, preencha todos os campos')
        else {
            /** Altera caso já tenha cadastro */
            const data = {
                url: dev?.id ? `/api/developers/${dev?.id}` : '/api/developers',
                method: dev?.id ? 'put' : 'post',
                message: dev?.id ? 'Cadastro realizado com sucesso!' : 'Alteração realizada com sucesso!'
            }

            await fetch(data.url, {
                method: data.method,
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(dev)
            })
                .then(() => {
                    requestAllDevs()
                    setDev({ nome: '', sexo: '', hobby: '', datanascimento: '' })
                    toast.success(data.message)
                    toggleVisibility()
                })
                .catch(err => {
                    console.error(err)
                    toast.error('Não foi possível realizar o cadastro. Entre em contato com o administrador.')
                })
        }
    }

    /** Ajusta os dados do state caso venha para edição */
    useEffect(() => {
        setDev(devToUpdate)
    }, [devToUpdate])

    return (
        <Modal
            size={'lg'}
            show={isVisible}
            onHide={toggleVisibility}
        >
            <Modal.Header closeButton>
            </Modal.Header>

            <Modal.Body>
                <Form.Group
                    className={'pb-3'}
                >
                    <Form.Label>Nome: </Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="ex: Giovani Eduardo"
                        value={dev.nome}
                        onChange={({ target }) => handleData('nome', target.value)}
                    />
                </Form.Group>

                <Form.Group
                    className={'pb-3'}
                >
                    <Form.Label>Sexo: </Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="ex: Masculino"
                        value={dev.sexo}
                        onChange={({ target }) => handleData('sexo', target.value)}
                    />
                    <Form.Text className="text-muted">
                        Será selecionado apenas a primeira letra.
                    </Form.Text>
                </Form.Group>

                <Form.Group
                    className={'pb-3'}
                >
                    <Form.Label>Hobby: </Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="ex: Um violãozin vez e outra"
                        value={dev.hobby}
                        onChange={({ target }) => handleData('hobby', target.value)}
                    />
                </Form.Group>

                <Form.Group
                    className={'pb-3'}
                >
                    <Form.Label>Data de nascimento: </Form.Label>
                    <Form.Control
                        type="date"
                        value={dev.datanascimento}
                        onChange={({ target }) => handleData('datanascimento', target.value)}
                    />
                    <Form.Text className="text-muted">
                        Sua idade será calculada com base nessa data.
                    </Form.Text>
                </Form.Group>
            </Modal.Body>

            <Modal.Footer>
                <Button
                    variant={'success'}
                    onClick={sendData}
                >
                    Salvar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
