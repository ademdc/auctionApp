import React, { Component } from 'react';
import axios from 'axios';
//import axios from '../axios';
//import User from '../components/users/user.js';
import Auction from '../components/auction/auction';

import './auctions.css';
import {auth,auctions} from "../reducers/actions";
import { connect } from "react-redux";
import {Link} from "react-router-dom";

class Auctions extends Component {
    state = {
        auctions:[],
        error: false,
        bid:0
    }

    componentDidMount () {
        axios.get( 'http://localhost:8000/users/' )
            .then( response => {
                const users = response.data.slice(0, 4);
                const updatedUsers = users.map(post => {
                    return {

                        ...post
                    }
                });
                this.setState({users: updatedUsers});
                 //console.log( response );
            } )
            .catch(error => {
                console.log(error);
                this.setState({error: true});
            });

        axios.get( 'http://localhost:8000/auctions/' )
            .then( response => {
                const auction = response.data.slice(0, 10);
                const updatedAuctions = auction.map(post => {
                    return {
                        ...post
                    }
                });
                this.setState({auctions: updatedAuctions});
                console.log( response );
            } )
            .catch(error => {
                console.log(error);
                this.setState({error: true});
            });
    }

    render () {
        let auctions = <p style={{textAlign: 'center'}}>Something went wrong!</p>;

        if (!this.state.error) {
            auctions = this.state.auctions.map(auction => {
                return <Auction
                    key={auction.id}
                    id={auction.id}
                    item={auction.item}
                    highest_bid={auction.highest_bid}
                    ending_time={auction.ending_time}
                    image={auction.image}
                    owner_id={auction.winner_id}
                    bid={this.props.bid}
                />;
            });
        }
        return (
            <div className="Container">
                <h1 style={{textAlign: 'center'}}>Auctions</h1>
                <div style={{textAlign: "right"}}>
                    {this.props.user.username} <button className="btn btn-danger" onClick={this.props.logout}>Logout</button>
                </div>
                <hr/>
                <section className="Auctions">
                    {auctions}
                </section>
                <p>
                    Want to make a new auction? <Link to="/newAuction">New Auction</Link>
                </p>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        user: state.auth.user,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(auth.logout()),
        bid: (id, newbid) => dispatch(auctions.bid(id, newbid))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Auctions)