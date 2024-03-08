import React, { useState, useEffect} from 'react';
import './style.css';
import HeaderPagesAluno from '../../components/headers/alunoPagesIndex'
import { Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

function ExitAluno() {

    const [request, setRequest] = useState('');
    const [showPop, setShowPop] = useState(false);
    const navigate = useNavigate();
    const [addButtonStyle, changeAddButtonStyle] = useState('button-6-disable');
    const [addButtonState, changeAddButtonState] = useState(true);
    const [tableData, setTableData] = useState([]);
    const [errorMessage, setErrorMessage] = useState(' ');
    const [organizedPedidos, setOrganizedPedidos] = useState([])
    var pedidos = [
        {  id: 1, matricula_aluno: 'aluno', nome_aluno: 'Vinícius', periodo_aluno: '10', box_aluno: '181', modalidade: 'Saída', status: 'Pendente', nome_colab: 'Lucas Rodrigues', assinatura: false, hora: '06:19', data: '14/02/2023', nome_familia: 'Cirúrgica', qnt_itens: '20' },
        {  id: 2, matricula_aluno: 'aluno', nome_aluno: 'Vinícius', periodo_aluno: '10', box_aluno: '181', modalidade: 'Saída', status: 'Pendente', nome_colab: 'Lucas Rodrigues', assinatura: false, hora: '06:19', data: '11/02/2023', nome_familia: 'Cirúrgica', qnt_itens: '20' },
        {  id: 3, matricula_aluno: 'aluno', nome_aluno: 'Vinícius', periodo_aluno: '10', box_aluno: '181', modalidade: 'Saída', status: 'Pendente', nome_colab: 'Lucas Rodrigues', assinatura: true, hora: '06:19', data: '12/02/2023', nome_familia: 'Cirúrgica', qnt_itens: '20' },
        {  id: 4, matricula_aluno: 'aluno', nome_aluno: 'Vinícius', periodo_aluno: '10', box_aluno: '181', modalidade: 'Saída', status: 'Pendente', nome_colab: 'Lucas Rodrigues', assinatura: false, hora: '06:19', data: '14/02/2023', nome_familia: 'Cirúrgica', qnt_itens: '20' },
        {  id: 5, matricula_aluno: 'aluno', nome_aluno: 'Vinícius', periodo_aluno: '10', box_aluno: '181', modalidade: 'Saída', status: 'Pendente', nome_colab: 'Lucas Rodrigues', assinatura: false, hora: '06:19', data: '11/02/2023', nome_familia: 'Cirúrgica', qnt_itens: '20' },
        {  id: 6, matricula_aluno: 'aluno', nome_aluno: 'Vinícius', periodo_aluno: '10', box_aluno: '181', modalidade: 'Saída', status: 'Pendente', nome_colab: 'Lucas Rodrigues', assinatura: false, hora: '06:19', data: '14/02/2023', nome_familia: 'Cirúrgica', qnt_itens: '20' },
        {  id: 7, matricula_aluno: 'aluno', nome_aluno: 'Vinícius', periodo_aluno: '10', box_aluno: '181', modalidade: 'Saída', status: 'Pendente', nome_colab: 'Lucas Rodrigues', assinatura: false, hora: '06:19', data: '11/02/2023', nome_familia: 'Cirúrgica', qnt_itens: '20' },
        {  id: 8, matricula_aluno: 'aluno', nome_aluno: 'Vinícius', periodo_aluno: '10', box_aluno: '181', modalidade: 'Saída', status: 'Pendente', nome_colab: 'Lucas Rodrigues', assinatura: false, hora: '06:19', data: '14/02/2023', nome_familia: 'Cirúrgica', qnt_itens: '20' },
        {  id: 9, matricula_aluno: 'aluno', nome_aluno: 'Vinícius', periodo_aluno: '10', box_aluno: '181', modalidade: 'Saída', status: 'Pendente', nome_colab: 'Lucas Rodrigues', assinatura: false, hora: '06:19', data: '11/02/2023', nome_familia: 'Cirúrgica', qnt_itens: '20' }
      ]

    function navigateToHomeAluno() {
        if (showPop) {
            setShowPop(false);
            navigate('/home-aluno')
        } else {
            navigate('/home-aluno')
        }
    }

    function navigateToConfirmExit() {
        if ((tableData.length === 0)) {
            setErrorMessage('Todos os campos devem ser preenchidos.');
        } else {
            setErrorMessage(' ');
            setShowPop(false);
            requestConfirmed()
        }
    }

    function detectEntryRequest(e) {
        var selectedRequest = e.target.value
        setRequest(selectedRequest)
        changeAddButtonStyle('button-6')
        changeAddButtonState(false)
    }

    function stagesReturn() {
        changeAddButtonStyle('button-6-disable');
        changeAddButtonState(true);
    }

    function requestConfirmed() {
        navigate('/home-aluno')
        console.log(tableData);
        stagesReturn();
        setTableData([]);
    }

    useEffect(() => {
        var pedidosCronologicos = pedidos.sort((a, b) => {
            var [dia, mes, ano] = a.data.split("/");
            var dateTimeA = new Date(`${ano}-${mes}-${dia}T${a.hora}`);
            [dia, mes, ano] = b.data.split("/");
            var dateTimeB = new Date(`${ano}-${mes}-${dia}T${b.hora}`);
            return dateTimeB - dateTimeA;
        });
        setOrganizedPedidos(pedidosCronologicos);
    }, []);

    function addMovement() {
        const selectedPedido = pedidos.find(pedido => {
            const pedidoInfo = `Pedido de ${pedido.modalidade} : ${pedido.data} às ${pedido.hora}`;
            return pedidoInfo === request;
        });

        if (selectedPedido) {
            const existingIndex = tableData.findIndex(item =>
                item.modalidade === selectedPedido.modalidade &&
                item.data === selectedPedido.data &&
                item.hora === selectedPedido.hora
            );

            if (existingIndex !== -1) {
                setErrorMessage('Pedido já existe na tabela.');
            } else {
                setTableData(prevData => [...prevData, selectedPedido]);
                setRequest('');
                stagesReturn();
                setErrorMessage('')
            }
        } else {
            setErrorMessage('Pedido não encontrado.');
        }

    }

    function tableReportContent() {
        return tableData.map((item, index) => (
            <tbody key={index}>
                <tr>
                    <td>
                        <p className='body-normal'>{item.modalidade}</p><p className='body-normal'>{item.hora}</p><p className='body-normal'>{item.data}</p>
                    </td>
                </tr>
            </tbody>
        ));
    }

    function navigateToHome(){
        if (tableData.length !== 0) {
            setShowPop(true)
        } else {
            navigateToHomeAluno()
        }
    }

    return (
        <>
            <HeaderPagesAluno />
            <Container className='containerMobileSign'>
                <div className="inputForms">
                    <h1 className='title-1 margin-bottom-30'>Assinar pedidos</h1>
                    <select className='form-4' value={request} onChange={detectEntryRequest} >
                        <option value='0'>Selecione o pedido</option>
                        {organizedPedidos.map((option, index) => (
                            <option key={index} value={'Pedido de ' + option.modalidade + ' : ' + option.data + ' às ' + option.hora}>
                                {'Pedido de ' + option.modalidade + ' : ' + option.data + ' às ' + option.hora}
                            </option>
                        ))}
                    </select>
                    <button className={addButtonStyle} onClick={addMovement} disabled={addButtonState}>
                        Adicionar
                    </button>
                    <div className="tableReport">
                        <table>
                            {tableReportContent()}
                        </table>
                    </div>
                </div>
                {errorMessage && <p className="error-message-mobile">{errorMessage}</p>}
                <div className='sendButtonsEntry'>
                    <button className='button-2' disabled={false} onClick={navigateToHome} >
                        Cancelar
                    </button>
                    <button className='button-3' disabled={false} onClick={navigateToConfirmExit} >
                        Confimar
                    </button>
                </div>
            </Container>
            {showPop && (
                <div className="popUpCancelOperation">
                    <div className="popUpCancelCard">
                        <p className='heading-3 text-align-center margin-bottom-10'>Tem certeza que<br />deseja voltar?</p>
                        <p className='body-light text-align-center margin-bottom-20'>Se continuar as alterações serão perdidas.</p>
                        <div className='popUpCancelButtons'>
                            <button className='button-2' disabled={false} onClick={() => setShowPop(false)} >
                                Voltar
                            </button>
                            <button className='button-3' disabled={false} onClick={navigateToHomeAluno} >
                                Continuar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default ExitAluno