export const Player = ({ id, playerName, playerPic, playerExternalAPIId, playerObject }) => {

    const returnPlayerDetails = () => {
        console.log(playerObject)
        console.log(id)
    }

    return <>
    <section className="player-section" id={playerExternalAPIId}>
        {playerPic}
        {playerName}
        <button onClick={returnPlayerDetails}>Select</button>
    </section>
    </>
}