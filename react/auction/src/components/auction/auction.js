import React from 'react';

import './auction.css';
import Countdown from 'react-countdown-now';

const auction = (props) => {
    let auctionTime = new Date(props.ending_time);
    let today = new Date();

    auctionTime.setTime(auctionTime.getTime());
    today.setTime(today.getTime());

    console.log(auctionTime);
    console.log(today);

    if(today>auctionTime){
        return (<article className="Auction">
            <h1>{props.item}</h1>
            <div className="Info">
                <div className="Name">{props.id}</div>
            </div>
            <img className="auctionImage" src={props.image} alt="slika"/>
            <h3>Auction finished</h3>
            <p>Highest bid <b> {props.highest_bid} KM</b></p>
            <p>Auction won user with id: {props.owner_id}</p>
        </article>);
    }
    if(today<auctionTime){
        return (<article className="Auction">
            <h1>{props.item}</h1>
            <img className="auctionImage" src={props.image} alt="slika"/>
            <p>Time left <b><Countdown date={props.ending_time}/></b></p>
            <p>Highest bid <b> {props.highest_bid} KM</b></p>
            <input type="number"/>
            <button className="btn btn-success">Bid</button>
        </article>);
    }



    }


export default auction;