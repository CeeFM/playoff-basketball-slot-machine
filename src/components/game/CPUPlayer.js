export const CPUPlayer = ({ id, playerName, playerPic, playerExternalAPIId, playerObject }) => {
    
    return <>
    <section id={id} className="player-section" key={playerExternalAPIId}>
<strong className="name">{playerName}</strong> 
<br />
<div className="matchup-img-div">
<img className="player-img" src={playerPic} />
</div>
    </section>
    </>
}