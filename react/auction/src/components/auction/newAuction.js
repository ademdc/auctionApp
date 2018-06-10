import React, {Component} from "react";
import {connect} from "react-redux";

import {Link, Redirect} from "react-router-dom";

import {auctions} from "../../reducers/actions";
import './newAuction.css';
class newAuction extends Component {

    state = {
        'owner_id':this.props.user.id,
        'item':'',
        'image':'',
        'starting_bid':'',
        'ending_time':'',
        'submited':false
    };



    onSubmit = e => {
        e.preventDefault();
        this.setState({owner_id:this.props.user.id});
        this.setState({submited:true})
        this.props.newAuction(this.state.owner_id, this.state.item,this.state.image,this.state.starting_bid,this.state.ending_time);
    };




    render() {
        // if (this.props.isAuthenticated) {
        //     return <Redirect to="/" />
        // }

        if(this.state.submited===true){
           return <Redirect to="/" />
        }

        console.log(this.props.user.id+" id");
        return (

            <div className="NewAuction">


            <form onSubmit={this.onSubmit}>
                <div className="UserName">
                   Welcome {this.props.user.username}
                </div>
                <fieldset>
                    <legend>Bid</legend>
                    {this.props.errors.length > 0 && (
                        <ul>
                            {this.props.errors.map(error => (
                                <li key={error.field}>{error.message}</li>
                            ))}
                        </ul>
                    )}
                    <p>
                        <label htmlFor="username">Item</label>
                        <input
                            type="text" id="item"
                            onChange={e => this.setState({item: e.target.value})} />
                    </p>
                    <p>
                        <label htmlFor="picture">Picture (url) </label>
                        <input
                            type="text" id="picutre"
                            onChange={e => this.setState({image: e.target.value})} />
                    </p>
                    <p>
                        <label htmlFor="bid">Starting bid  </label>
                        <input
                            type="number" id="bid"
                            onChange={e => this.setState({starting_bid: e.target.value})} />
                    </p>
                    <p>
                        <label htmlFor="ending">Ending time </label>
                        <input
                            type="text" id="ending"
                            onChange={e => this.setState({ending_time: e.target.value})} />
                    </p>
                    <p>
                        <button type="submit">Make auction</button>
                    </p>
                    <p>
                        <Link to="/">Go back</Link>
                    </p>

                </fieldset>
            </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    let errors = [];
    if (state.auth.errors) {
        errors = Object.keys(state.auth.errors).map(field => {
            return {field, message: state.auth.errors[field]};
        });
    }
    return {
        errors,
        isAuthenticated: state.auth.isAuthenticated,
        user: state.auth.user,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        newAuction: (owner_id, item, image, starting_bid, ending_time) => {
            return dispatch(auctions.postAuction(owner_id, item, image, starting_bid, ending_time));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(newAuction);