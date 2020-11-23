const StarRate = ({stars}) => {
    const loadStarRate = () => {
        const starRate = []
        for(let i=1; i<=5; i++)
        {
            if(i<=stars)
                starRate.push(<li key={i} className="on"><i className="fa fa-star-o" /></li>)
            else
                starRate.push(<li key={i}><i className="fa fa-star-o" /></li>)
        }
        return starRate
    }

    return(
        <ul className="rating d-flex">
            {loadStarRate()}
        </ul>
    )
}

export default StarRate