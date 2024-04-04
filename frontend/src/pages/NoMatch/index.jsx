import errorImg from '../../../images/error.jpg';

function NoMatch(){

    return (
        <div>
            <section className='nomatch-container'>
                <img className="nomatch-error-img" src={errorImg} alt="robo sinalizando erro" />
                <div className='nomatch-text-container'>
                    <h1 className='nomatch-title'><span className='text-detail'>Ops!</span> Não encontramos essa  página<span className='text-detail'>.</span></h1>
                    <h2 className='nomatch-subtitle'>Acho que você escolheu o caminho errado...</h2>
                    <a href="http://localhost:5173" target='_self'><button className='nomatch-btn'>Voltar para página inicial</button></a>
                </div>
            </section>
        </div>
    );
}

export default NoMatch;