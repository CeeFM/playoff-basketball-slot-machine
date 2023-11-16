export const SwapBtn = (func) => {
    return <>
    <button onClick={(clickEvent) => func(clickEvent.target.id)}>SWAP?</button>
    </>
}