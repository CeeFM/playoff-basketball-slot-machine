export const CPUPlayer = ({ id, playerName, playerPic, playerExternalAPIId, playerObject, findPlayer }) => {
    
    return <>
    <section id={id} className="player-section card-body" key={playerExternalAPIId}>
    <div className="matchup-img-div">
<img className="cpu-player-img" src={playerPic} />
</div>
<strong className="name">{playerName}</strong>
{findPlayer(playerObject)}
<br />
    </section>
    </>
}