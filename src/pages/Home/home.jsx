import './home.css'

function Home () {
    return (
        <div className='home-container'>
            <h1 className='title-container'>Introdunct My Self</h1>
            <img src="handsomeboy.png" className='handsomeboy' />
            <p className='text-container'>
                 Hello everyone My name is Nopparat Sawatuea or you can call me Beer<br/>
                 My Birth Day is 18 October 2003 in Bangkok<br/>
                 My favorite food is KFC and My favorite drink is tea<br/>
                 I'm student in Sripatum University<br/>
                 I'm learning Front End Software Development
            </p>
        </div>
    );
}

export default Home