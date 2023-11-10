export const Player = ({ id, playerName, playerPic, playerExternalAPIId }) => {
    return <>
    <section className="player-section" id={playerExternalAPIId}>
        {playerPic}
        {playerName}
        <button>Select</button>
    </section>
    </>
}