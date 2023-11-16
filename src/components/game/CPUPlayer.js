export const CPUPlayer = ({ id, playerName, playerPic, playerExternalAPIId, playerObject, findPlayer }) => {
    
    return <>
    <section id={id} className="player-section card-body" key={playerExternalAPIId}>
<strong className="name">{playerName}</strong>
{findPlayer(playerObject)}
<br />
<div className="matchup-img-div">
<img className="player-img" src={playerPic} />
</div>
    </section>
    </>
}