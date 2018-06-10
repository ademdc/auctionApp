import React, {Component} from 'react';

import './auction.css';
import Countdown from 'react-countdown-now';

class auction extends Component {
    state ={
        bid:null
    }
    onSubmit = e => {
        e.preventDefault();
        this.props.bid(this.props.id, this.state.bid);
    };

    render() {

        let auctionTime = new Date(this.props.ending_time);
        let today = new Date();

        auctionTime.setTime(auctionTime.getTime());
        today.setTime(today.getTime());




        if (today > auctionTime) {
            return (<article className="Auction">
                <h1>{this.props.item}</h1>
                <div className="Info">
                    <div className="Name">{this.props.id}</div>
                </div>
                <img className="auctionImage" src={this.props.image} alt="slika"/>
                <h3>Auction finished</h3>
                <p>Highest bid <b> {this.props.highest_bid} KM</b></p>
                <p>Auction won user with id: {this.props.owner_id}</p>
            </article>);
        }
        if (today < auctionTime) {
            return (
                    <article className="Auction">
                        <h1>{this.props.item}</h1>
                        <img className="auctionImage" src={this.props.image} alt="slika"/>
                        <p>Time left <b><Countdown date={this.props.ending_time}/></b></p>
                        <p>Highest bid <b> {this.props.highest_bid} KM</b></p>
                        <form onSubmit={this.onSubmit}>
                        <input type="number" onChange={e => this.setState({bid: e.target.value})}/>
                        <button className="btn btn-success">Bid</button>                </form>

                    </article>
            );
        }


    }
}


export default auction;